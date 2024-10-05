import { Injectable, signal } from '@angular/core';
import { Training } from '../../$training';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private $training = signal<Training | null>(null);

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

  constructor() { }
}
