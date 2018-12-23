export class Formatter {
  public static formatAsCurrency(input: number): string {
    return input.toLocaleString("da-DK", { style: "currency", currency: "DKK" })
  }
}