import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootIDService {

    currentID = 0;

  constructor() { }

  getRootID() : string{
      this.currentID++;
      return "rootID" + this.currentID;
  }
}
