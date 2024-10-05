import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeLockService } from './core/services/wake-lock.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyberjesus';

  constructor(
    private wakeLockService: WakeLockService
  ) { }

  ngOnInit(): void {
    // Request wake lock when the component is initialized
    this.wakeLockService.requestWakeLock();
  }

  ngOnDestroy(): void {
    // Release wake lock when the component is destroyed
    this.wakeLockService.releaseWakeLock();
  }
}
