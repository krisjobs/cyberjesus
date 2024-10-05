import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WakeLockService {
  private wakeLock: any = null;

  constructor(
  ) { }

  // Request Wake Lock
  async requestWakeLock(): Promise<void> {
    if ('wakeLock' in navigator) {
      try {
        document.addEventListener('click', async () => {
          this.wakeLock = await (navigator as any).wakeLock.request('screen');
          this.wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
          });
          console.log('Wake Lock is active');
        });
      } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      console.warn('Wake Lock API is not supported in this browser.');
    }
  }

  // Release Wake Lock
  async releaseWakeLock(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        console.log('Wake Lock has been released');
      } catch (err) {
        console.error(`Error releasing Wake Lock: ${err}`);
      }
    }
  }
}
