import { Action } from './Action'
import { ActionType } from './ActionType'

export class SetAction extends Action {
  constructor(
    amountToSetTo: number
  ) {
    super(ActionType.Set, amountToSetTo)
  }
}