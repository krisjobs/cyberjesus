import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeLockService } from './core/services/wake-lock.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { TrainingService } from './core/services/training.service';
import { TrainingViewComponent } from './core/components/training-view/training-view.component';
import { MainMenuComponent } from './core/components/main-menu/main-menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    NgIf,
    TrainingViewComponent,
    MainMenuComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public $noTraining = this.trainingService.$noTraining;

  constructor(
    private wakeLockService: WakeLockService,
    private trainingService: TrainingService,
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
