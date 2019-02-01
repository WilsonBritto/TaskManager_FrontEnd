import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private _visible: boolean;
  constructor() {
    this._visible = false;
  }

  hide() { this._visible = false }
  show() { this._visible = true }
  get Visible() { return this._visible }
}
