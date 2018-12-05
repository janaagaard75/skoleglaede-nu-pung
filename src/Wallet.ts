import { Action } from './actions/Action'
import { ActionType } from './actions/ActionType'

export class Wallet {
  private static _amount = 0

  public static get amount(): number {
    return this._amount
  }

  public static performAction(action: Action) {
    switch (action.type) {
      case ActionType.Add:
        this._amount += action.amount
        break

      case ActionType.Subtract:
        this._amount -= action.amount
        break

      case ActionType.Set:
        this._amount = action.amount
        break

      default:
        throw new Error(`The action type '${action.type}' is not supported.`)
    }
  }
}