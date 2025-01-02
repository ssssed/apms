import { atom } from "nanostores";

export class Modal {
  private _opened = atom<boolean>(false);

  get opened() {
    return this._opened;
  }

  open() {
    this._opened.set(true);
  }

  close() {
    this._opened.set(false);
  }

  toogle() {
    this._opened.set(!this._opened.get());
  }
}
