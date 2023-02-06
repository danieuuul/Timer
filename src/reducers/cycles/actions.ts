import { Cycle } from './reducer'

export enum CycleActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED'
}

function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

function interruptActiveCycleAction() {
  return {
    type: CycleActionTypes.INTERRUPT_ACTIVE_CYCLE
  }
}

function markActiveCycleAsFinishedAction() {
  return {
    type: CycleActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED
  }
}

export const CycleActionsFunctions = {
  markActiveCycleAsFinishedAction,
  interruptActiveCycleAction,
  addNewCycleAction
}
