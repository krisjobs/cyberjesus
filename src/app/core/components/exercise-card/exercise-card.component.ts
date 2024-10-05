import { Component, Input } from '@angular/core';
import { Exercise } from '../../../$exercise';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {
  @Input()
  public exercise!: Exercise;
}
