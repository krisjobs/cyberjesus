import { Component, Input, signal, input, computed, effect } from '@angular/core';
import { Exercise } from '../../../$exercise';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { TrainingService } from '../../services/training.service';
import { AppService } from '../../services/app.service';
import { TrainingMenuComponent } from '../training-menu/training-menu.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIcon,
  ],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {
  private $activeIdx = computed(() => {
    return this.trainingService.$state().activeIdx;
  });

  public get totalTime() {
    return this.trainingService.SET_DURATION * this.trainingService.EXERCISE_COUNT;
  }

  public $loading = signal(false);
  public $timeLeft = signal(0);

  public $timePercentage = computed(() => {
    return Math.floor((this.$timeLeft() / this.trainingService.SET_DURATION) * 100);
  });

  public $totalPercentage = computed(() => {
    const activeIdx$ = this.$activeIdx();
    const timePassed = this.trainingService.SET_DURATION * (activeIdx$ + 1) - this.$timeLeft();
    return Math.floor((timePassed / this.totalTime) * 100);
  });

  public $exercise = input.required<Exercise>({ alias: 'exercise' });

  public $uid = computed(() => this.$exercise().uid);

  public $config = computed(() => this.$exercise().config);

  public $imageUrl = computed(() => this.$exercise().url);

  public $name = computed(() => this.$exercise().name);

  public $description = computed(() => this.$exercise().description);

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private trainingService: TrainingService,
  ) {
    this.$loading.set(true);

    effect(() => {
      console.log(this.$exercise(), 'exercise');

      this.$loading.set(true);
      // this.exerciseCounter++;
      this.$timeLeft.set(this.trainingService.SET_DURATION);

      let counter = this.trainingService.SET_DURATION;
      const intervalId = setInterval(() => {
        if (this.appService.$paused()) {
          return;
        }

        counter--;

        if (counter <= 0) {
          clearInterval(intervalId);
          return;
        }

        this.$timeLeft.set(counter);
      }, 1000);
    }, { allowSignalWrites: true });
  }

  public pauseTraining() {
    this.appService.$paused.set(true);

    const config: MatDialogConfig = {
      id: 'training-menu',
      autoFocus: false,
      disableClose: false,
      width: '60vw',
      height: '30vh',
    };

    const dialogRef = this.dialog.open(TrainingMenuComponent, config);

    dialogRef.afterClosed().subscribe(() => {
      this.appService.$paused.set(false);
    });
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
