import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(true);

  constructor() { }
}
