export class Formatter {
  public static formatAsCurrency(input: number): string {
    return Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(input)
  }
}