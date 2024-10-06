import { Signal } from "@angular/core";
import { ExerciseConfig, ExerciseState } from ".";


export class Exercise {

  constructor(
    public config: ExerciseConfig,
    public $state: Signal<ExerciseState>,
  ) {

  }

  static initState(
    config: ExerciseConfig
  ): ExerciseState {
    return {
      stats: {},
    }
  }
}
