export function thousandSeparator(val: number | string): string {
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "0";
}
