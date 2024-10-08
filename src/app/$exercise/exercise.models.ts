// ===================== CONFIG =====================

export interface BaseExerciseConfig {
  name: string;
  description?: string;

  images: string[];

  duration?: number;
  repetitions?: number;
  sets?: number;
  rest?: number;
}

export interface ExerciseConfig extends BaseExerciseConfig {
  id: string;
  key: string;
}

// ===================== STATE =====================

export interface ExerciseStats {

}

export interface ExerciseState {
  stats: ExerciseStats;
}

// ===================== LIBRARY =====================

export type ExerciseKey =
  // warmup
  'alternatingBackExpansions' |
  'alternatingChestExpansions' |
  'armCircles' |
  'armRotations' |
  'backwardLegRaises' |
  'bounceOnTheSpot' |
  'chestExpansions' |
  'hopsOnTheSpot' |
  'legRaises' |
  'lightLowKicks' |
  'lightLowTurningKicks' |
  'lightPunches' |
  'neckRotations' |
  'raisedArmsCircles' |
  'shoulderRotations' |
  'sideArmRaises' |
  'sideLegRaises' |
  'sideLegRotation' |
  'sideToSideFeetTogetherHops' |
  'sideToSideSingleLegHops' |
  'singleHipRotations' |
  'singleLegHops' |
  'slowForwardAndBackNeckTilts' |
  'slowMarchJacks' |
  'slowNeckRotations' |
  'slowSideJacks' |
  'slowSideToSideNeckTilts' |
  'torsoRotations' |
  'wideArmCircles' |
  'neckTilts'

  // training

  // stretching
  ;

export type ExerciseLib = Record<ExerciseKey, BaseExerciseConfig>;
export type VariationLib = Partial<Record<ExerciseKey, BaseExerciseConfig>>;

// ===================== SETTINGS =====================

export interface ExerciseSettings {
}
