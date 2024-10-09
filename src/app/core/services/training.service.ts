import { computed, effect, Injectable, signal } from '@angular/core';
import { $changeActiveIdx, BaseTrainingConfig, Training, TrainingConfig, TrainingPhase, TrainingRecord } from '../../$training';

import { v4 as uuidv4 } from 'uuid';
import { exercises, Exercise, ExerciseKey } from '../../$exercise';
import { patchState } from '@ngrx/signals';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public readonly SET_DURATION = 5; // seconds
  public readonly EXERCISE_COUNT = 10;

  private $training = signal<Training | null>(null);

  // ===================== CONFIG =====================

  /**
   * use only while inTraining
   */
  private get training() {
    const training = this.$training();
    if (!training) {
      throw new Error('Training not initialized');
    }

    return training;
  }

  public get exercises(): Exercise[] {
    return this.training.exercises;
  }

  // ===================== STATE =====================

  public $noTraining = computed(() => {
    return !this.$training();
  });

  public $inTraining = computed(() => {
    return this.$training()?.$state().phase === TrainingPhase.InTraining;
  });

  public get $state() {
    return this.training.$state;
  }

  constructor(
    private appService: AppService,
  ) {
    this.setAutosave();
  }

  private setAutosave() {
    effect(() => {
      const game = this.$training();
      if (!game) {
        return;
      }

      const config = this.training.config;
      const state = this.training.$state();
      const record: TrainingRecord = {
        config,
        state,
      };

      localStorage.setItem('autosave', JSON.stringify(record));

      console.warn('State updated', state)
    });
  }

  public startTraining() {
    const config = this.generateTrainingConfig();
    const exerciseCount = config.exercises.length;

    this.$training.set(new Training(config));

    let counter = 0;
    const intervalId = setInterval(() => {
      if (this.appService.$paused()) {
        return;
      }

      counter++;

      if (counter >= exerciseCount) {
        clearInterval(intervalId);
        this.endTraining();
        return;
      }

      this.changeActiveIdx();
    }, this.SET_DURATION * 1000);
  }

  private generateTrainingConfig(): TrainingConfig {
    const allExercises = Object.keys(exercises) as ExerciseKey[];

    const randomKeys = allExercises.sort(() => Math.random() - 0.5).slice(0, this.EXERCISE_COUNT);

    const config: BaseTrainingConfig = {
      exercises: randomKeys
    }

    return {
      id: uuidv4(),
      exercises: config.exercises.map((key) => Exercise.initConfig(key)),
    }
  }

  public endTraining() {
    this.$training.set(null);
  }

  // ===================== exercises =====================

  public changeActiveIdx() {
    patchState(this.training.$state, $changeActiveIdx());
  }
}
