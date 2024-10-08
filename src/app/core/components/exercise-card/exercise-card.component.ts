import { Component, Input, signal, input, computed, effect } from '@angular/core';
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
  public $loading = signal(false);
  public $exercise = input.required<Exercise>({ alias: 'exercise' });

  public $uid = computed(() => this.$exercise().uid);

  public $config = computed(() => this.$exercise().config);

  public $imageUrl = computed(() => this.$exercise().url);

  public $name = computed(() => this.$exercise().name);

  public $description = computed(() => this.$exercise().description);

  constructor() {
    this.$loading.set(true);

    effect(() => {
      console.log(this.$exercise(), 'exercise');
      this.$loading.set(true);
    }, { allowSignalWrites: true });
  }

  public onImageLoad() {
    console.log('onImageLoad');
    this.$loading.set(false);
  }

  public onImageError() {
    console.error('onImageError');
    this.$loading.set(false);
  }
}
