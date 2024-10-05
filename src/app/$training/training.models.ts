import { ExerciseConfig, ExerciseState } from "../$exercise";

export interface TrainingConfig {
  id: string;

  exercises: ExerciseConfig[];
}

export interface TrainingState {
  exercises: Record<string, ExerciseState>;
}


export interface TrainingSettings {
}
