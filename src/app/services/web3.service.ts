import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Web3 from 'web3';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3 = new Web3(window.ethereum);
  isMetamask: boolean = false;
  private activeAccount = new BehaviorSubject<string>('');

  constructor() {}
  ///***********FUNCTION TO CHECK IF METAMASK INSTALLED OR NOT*************////

  isMetamaskInstalled(): boolean {
    if (window.ethereum) {
      this.isMetamask = true;
      return true;
    } else {
      this.isMetamask = false;
      return false;
    }
  }

  ///***********FUNCTION TO CHECK IF WALLET CONNECTED OR NOT*************////
  async isWalletConnected(): Promise<boolean> {
    let walletCheck = false;
    this.web3.eth.getAccounts().then((accounts) => {
      if (accounts.length === 0) {
        walletCheck = false;
      } else {
        walletCheck = true;
      }
    });
    return walletCheck;
  }

  ///***********FUNCTION TO CONNECT WALLET*************////

  async connectWallet(button?: string) {
    if (window.ethereum) {
      try {
        // Request user's permission to connect wallet
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Set the user's account as the active account
        console.log(accounts[0]);
        this.activeAccount.next(accounts[0]);
        return accounts[0];

        // If an account is returned, update the wallet address and check the allowance
      } catch (error) {
        // this.setWalletAddress('stranger');
        // if (error.code == 4001) {
        //   console.log('error');
        //   // Show error message if user denies permission or an error occurs
        //   // return error.code;
        // }
      }
    } else {
      console.log('failed');
    }
  }

  ///***********HANDLE WALLET ADDRESS STATE*************////
  setWalletAddress(address: string) {
    this.activeAccount.next(address);
  }

  getWalletAddress(): Observable<string> {
    return this.activeAccount;
  }
}
