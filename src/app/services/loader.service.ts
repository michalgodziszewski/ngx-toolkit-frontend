import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _counter = 0;
  private _isVisible$ = new BehaviorSubject<boolean>(false);

  isVisible$ = this._isVisible$.asObservable();

  private minShowTime = 300;
  private showTimestamp = 0;
  private hideTimeout?: any;

  show() {
    this._counter++;
    if (this._counter === 1) {
      this.showTimestamp = Date.now();
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
      }
      this._isVisible$.next(true);
    }
  }

  hide() {
    if (this._counter === 0) return;
    this._counter--;

    if (this._counter === 0) {
      const elapsed = Date.now() - this.showTimestamp;
      const wait = Math.max(0, this.minShowTime - elapsed);
      this.hideTimeout = setTimeout(() => {
        this._isVisible$.next(false);
        this.hideTimeout = undefined;
      }, wait);
    }
  }
}
