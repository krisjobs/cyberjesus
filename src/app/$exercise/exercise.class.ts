import { Signal } from "@angular/core";
import { exercises, ExerciseConfig, ExerciseKey, ExerciseState } from ".";
import { v4 as uuidv4 } from 'uuid';


export class Exercise {
  public get id(): string {
    return `${this.config.id}`;
  }

  public get uid(): string {
    return `${this.config.uid}`;
  }

  public get name(): string {
    return this.config.name;
  }

  public get description(): string {
    return this.config.description ?? '';
  }


  public get url(): string {
    return this.config.images[0];
  }

  constructor(
    public config: ExerciseConfig,
    public $state: Signal<ExerciseState>,
  ) {

  }

  public static initConfig(
    key: ExerciseKey,
  ): ExerciseConfig {
    const config = exercises[key];

    return {
      ...config,

      id: uuidv4(),
      key,
    }
  }

  public static initState(
    config: ExerciseConfig
  ): ExerciseState {
    return {
      stats: {},
    }
  }
}
