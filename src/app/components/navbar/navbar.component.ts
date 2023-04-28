import { Component } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';
// import { Web3Service } from 'src/app/services/web3.service';s

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userWalletAddress: string = '';
  constructor(private readonly web3: Web3Service) {}
  ngOnInit(): void {
    this.getWalletAddress();
  }
  async connectWallet() {
    this.web3.connectWallet();
  }

  getWalletAddress() {
    this.web3.getWalletAddress().subscribe((address: string) => {
      this.userWalletAddress = address;
    });
  }
}
