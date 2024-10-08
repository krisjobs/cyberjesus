import { Component, computed } from '@angular/core';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';
import { TrainingService } from '../../services/training.service';


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

  public exercises = this.trainingService.exercises;

  public $activeExercise = computed(() => {
    const activeIdx$ = this.trainingService.$state.activeIdx();
    return this.exercises[activeIdx$];
  });

  constructor(
    private trainingService: TrainingService,
  ) { }
}
