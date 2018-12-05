import { ActionType } from './ActionType'

export abstract class Action {
  constructor(
    type: ActionType,
    amount: number
  ) {
    this.type = type
    this.amount = amount
  }

  public amount: number
  public type: ActionType
}