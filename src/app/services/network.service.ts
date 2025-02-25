import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(true);

  constructor() {
    this.initNetworkListener();
  }

  private async initNetworkListener() {
    const status = await Network.getStatus();
    this.isOnline.next(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      this.isOnline.next(status.connected);
      console.log(
        '📡 Network status changed: ',
        status.connected ? 'Online' : 'Offline'
      );
    });
  }

  getNetworkStatus() {
    return this.isOnline.asObservable();
  }
}
