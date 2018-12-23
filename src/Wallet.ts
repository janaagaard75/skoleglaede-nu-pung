import { Action } from "./actions/Action"

export class Wallet {
  private static _credit = 4000

  public static get credit(): number {
    return this._credit
  }

  public static performAction(action: Action) {
    this._credit = action.performAction(this._credit)
  }
}