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

  public get text() {
    const formattedAmount = Formatter.formatAsCurrency(this.amount)

    switch (this.type) {
      case ActionType.Add:
        return `Tilføj ${formattedAmount}?`

      case ActionType.Subtract:
        return `Fratræk ${formattedAmount}?`

      case ActionType.Set:
        return `Nultil til ${formattedAmount}?`

      default:
        throw new Error(`The action '${this.type}' is not accepted. The amount is ${formattedAmount}.`)
    }
  }
}