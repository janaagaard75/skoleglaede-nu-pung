export class Formatter {
  public static formatAsCurrency(input: number): string {
    // toLocaleString is not supported on Android. Based on https://stackoverflow.com/a/14428340/37147.
    return (
      input
        .toFixed(2)
        .replace(".", ",")
        .replace(/\d(?=(\d{3})+,)/g, "$&.") + " kr."
    );
    // return input.toLocaleString("da-DK", { style: "currency", currency: "DKK" })
  }
}
