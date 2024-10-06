// ===================== CONFIG =====================

export interface ExerciseConfig {
  id: string;
  key: string;

  name: string;
  description?: string;

  image: string;

  duration?: number;
  repetitions?: number;
  sets?: number;
  rest?: number;
}

// ===================== STATE =====================

export interface ExerciseStats {

}

export interface ExerciseState {
  stats: ExerciseStats;
}

// ===================== SETTINGS =====================

export interface ExerciseSettings {
}
