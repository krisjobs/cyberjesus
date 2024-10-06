import { computed, effect, Injectable, signal } from '@angular/core';
import { Training, TrainingConfig, TrainingPhase, TrainingRecord } from '../../$training';

import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
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
  }

  private generateTrainingConfig(): TrainingConfig {
    return {
      id: uuidv4(),
      exercises: [
        {
          id: uuidv4(),
          key: 'exercise-1',
          name: 'Exercise 1',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: uuidv4(),
          key: 'exercise-2',
          name: 'Exercise 2',
          image: 'https://via.placeholder.com/160',
        },
      ]
    }
  }

  public endTraining() {
    this.$training.set(null);
  }
}
