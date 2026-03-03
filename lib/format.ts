const currencyFormatter = new Intl.NumberFormat('es', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatPercent(value: number): string {
  return `${value}%`
}
