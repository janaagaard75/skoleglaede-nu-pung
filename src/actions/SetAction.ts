import { Action } from './Action'
import { ActionType } from './ActionType'

export class SetAction extends Action {
  constructor(
    amountToSetTo: number
  ) {
    super(ActionType.Set, amountToSetTo)
  }

  public get text(): string {
    return `Nultil til ${this.formattedAmount}?`
  }
}