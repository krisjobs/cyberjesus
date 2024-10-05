import { signalState, SignalState } from "@ngrx/signals";
import { TrainingConfig, TrainingState } from "./training.models";
import { Exercise, ExerciseState } from "../$exercise";
import { computed } from "@angular/core";


export class Training {
  public exercises: Exercise[];

  public config!: TrainingConfig;
  public $state!: SignalState<TrainingState>;

  constructor(
    config: TrainingConfig,
  ) {
    this.config = config;
    this.$state = signalState<TrainingState>(this.initState());

    this.exercises = config.exercises.map(
      (config) => {
        const $state = computed(() => {
          const stateMap = this.$state.exercises();
          return stateMap[config.id]
        });

        return new Exercise(config, $state);
      });
  }

  private initState(): TrainingState {
    return {
      exercises: this.config.exercises.reduce(
        (rec, config) => {
          // TODO add other configs as params
          const state = Exercise.initState(config);
          rec[config.id] = state;
          return rec;
        },
        {} as Record<string, ExerciseState>
      ),
    };
  }

}
