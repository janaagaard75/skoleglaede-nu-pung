import { Formatter } from '../Formatter'

export abstract class Action {
  constructor(
    amount: number
  ) {
    this.amount = amount
  }

  public readonly amount: number

  protected get formattedAmount(): string {
    return Formatter.formatAsCurrency(this.amount)
  }

  public abstract get text(): string

  public abstract performAction(previousAmount: number): number
}