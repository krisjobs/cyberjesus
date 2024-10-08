import { TrainingState } from ".";


export const $changeActiveIdx = () => {
  return (state: TrainingState): TrainingState => {
    console.warn(state.activeIdx, Object.keys(state.exercises).length)
    return {
      ...state,
      activeIdx: state.activeIdx + 1 !== Object.keys(state.exercises).length ? state.activeIdx + 1 : 0,
    };
  };
}
