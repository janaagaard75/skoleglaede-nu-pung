import { Action } from './Action'
import { ActionType } from './ActionType'

export class SubtractAction extends Action {
  constructor(
    amountToSubtract: number
  ) {
    super(ActionType.Subtract, amountToSubtract)
  }
}