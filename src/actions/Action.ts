import { ActionType } from './ActionType'
import { Formatter } from '../Formatter'

export abstract class Action {
  constructor(
    type: ActionType,
    amount: number
  ) {
    this.type = type
    this.amount = amount
  }

  public readonly amount: number
  public readonly type: ActionType

  protected get formattedAmount() {
    return Formatter.formatAsCurrency(this.amount)
  }

  public abstract get text(): string
}