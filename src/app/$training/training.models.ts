import { ExerciseKey, ExerciseState, ExerciseConfig } from "../$exercise";

// ===================== CONFIG =====================

export interface BaseTrainingConfig {
  exercises: ExerciseKey[];
}

export interface TrainingConfig extends Omit<BaseTrainingConfig, 'exercises'> {
  id: string;

  exercises: ExerciseConfig[];
}

// ===================== STATE =====================

export enum TrainingPhase {
  PreTraining = 'pre-training',
  InTraining = 'in-training',
  PostTraining = 'post-training',
}

export interface TrainingStats {

}

export interface TrainingState {
  phase: TrainingPhase;
  isPaused: boolean;

  activeIdx: number;

  exercises: Record<string, ExerciseState>;

  stats: TrainingStats;
}

// ===================== SETTINGS =====================

export interface TrainingSettings {
}

// ===================== STORAGE =====================

export interface TrainingRecord {
  config: TrainingConfig;
  state: TrainingState;
}
