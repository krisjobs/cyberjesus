import { Component, Input, signal } from '@angular/core';
import { Exercise } from '../../../$exercise';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {
  @Input()
  public exercise!: Exercise;

  public $loading = signal(false);

  constructor() {
    this.$loading.set(true);
  }

  public onImageLoad() {
    console.warn('onImageLoad');
    this.$loading.set(false);
  }

  public onImageError() {
    console.warn('onImageError');
    this.$loading.set(false);
  }
}
