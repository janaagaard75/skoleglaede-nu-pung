import { Action } from "./actions/Action"

export class Wallet {
  private static _credit = 4000
  private static _savings = 0

  public static reset() {
    this._credit = 4000
    this._savings = 0
  }

  public static get credit(): number {
    return this._credit
  }

  public static get savings(): number {
    return this._savings
  }

  public static performAction(action: Action) {
    this._credit = action.performAction(this._credit)
  }
}