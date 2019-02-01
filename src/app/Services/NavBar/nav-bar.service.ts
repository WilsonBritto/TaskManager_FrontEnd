import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private visible: boolean;
  constructor() {
    this.visible = false;
  }

  hide() { this.visible = false }
  show() { this.visible = true }
  getVisible(): boolean { return this.visible }
}
