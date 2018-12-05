import { Action } from './Action'

export class SetAction extends Action {
  public get text(): string {
    return `Nultil til ${this.formattedAmount}?`
  }

  public performAction(previousAmount: number): number {
    return this.amount
  }
}