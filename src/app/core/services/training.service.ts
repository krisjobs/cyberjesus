import { computed, effect, Injectable, signal } from '@angular/core';
import { $changeActiveIdx, BaseTrainingConfig, Training, TrainingConfig, TrainingPhase, TrainingRecord } from '../../$training';

import { v4 as uuidv4 } from 'uuid';
import { Exercise } from '../../$exercise';
import { patchState } from '@ngrx/signals';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly SET_DURATION = 5;

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

  constructor() {
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
    this.$training.set(new Training(config));

    setInterval(() => {
      this.changeActiveIdx();
    }, this.SET_DURATION*1000);
  }

  private generateTrainingConfig(): TrainingConfig {
    const config: BaseTrainingConfig = {
      exercises: [
        'alternatingBackExpansions',
        'bounceOnTheSpot',
      ]
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
