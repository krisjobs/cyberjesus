import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TrainingService } from '../../services/training.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {

  constructor(
    private trainingService: TrainingService,
  ) { }

  public startTraining() {
    this.trainingService.startTraining();
  }
}
