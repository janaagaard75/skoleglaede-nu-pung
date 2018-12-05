import { Action } from './actions/Action'

export class Wallet {
  private static _amount = 0

  public static get amount(): number {
    return this._amount
  }

  public static performAction(action: Action) {
    this._amount = action.performAction(this._amount)
  }
}