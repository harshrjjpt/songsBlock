import { Component } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';
// import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
})
export class HeroPageComponent {
  isaddPlaylistModal: boolean = false;
  userWalletAddress: string = '';
  constructor(private readonly web3: Web3Service) {}
  ngOnInit(): void {
    this.getWalletAddress();
  }
  getWalletAddress() {
    this.web3.getWalletAddress().subscribe((address: string) => {
      this.userWalletAddress = address;
    });
  }

  handleAddPlaylistModal() {
    this.isaddPlaylistModal = !this.isaddPlaylistModal;
  }
  /**
   * @functionality
   * Function to close the modals when clicking outside it
   */
  closeModals(event: any) {
    if (event.target.className === 'create-playlist-modal-container') {
      this.isaddPlaylistModal = false;
    }
  }
}
