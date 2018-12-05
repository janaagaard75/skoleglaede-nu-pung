import { Action } from './Action'
import { ActionType } from './ActionType'

export class AddAction extends Action {
  constructor(
    amountToAdd: number
  ) {
    super(ActionType.Add, amountToAdd)
  }
}