import { Component } from '@angular/core';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';


@Component({
  selector: 'app-training-view',
  standalone: true,
  imports: [
    ExerciseCardComponent,
  ],
  templateUrl: './training-view.component.html',
  styleUrl: './training-view.component.scss'
})
export class TrainingViewComponent {

  constructor() { }
}
