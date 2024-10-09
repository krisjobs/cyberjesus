import { TrainingState } from ".";


export const $changeActiveIdx = () => {
  return (state: TrainingState): TrainingState => {
    return {
      ...state,
      activeIdx: state.activeIdx + 1 !== Object.keys(state.exercises).length ? state.activeIdx + 1 : 0,
    };
  };
}
