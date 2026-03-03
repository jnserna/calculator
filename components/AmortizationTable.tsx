import type { AmortizationRow } from '@/types/loan'
import { formatCurrency } from '@/lib/format'

interface AmortizationTableProps {
  rows: AmortizationRow[]
  frequencyLabel: string
}

export default function AmortizationTable({ rows, frequencyLabel }: AmortizationTableProps) {
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-140px)] rounded-2xl border border-gray-200 shadow-card bg-white">
      <table className="w-full text-sm border-collapse">
        <thead className="sticky top-0 z-10 bg-primary text-white">
          <tr>
            <th className="px-3 py-3 text-left font-semibold">{frequencyLabel}</th>
            <th className="px-3 py-3 text-right font-semibold">Capital</th>
            <th className="px-3 py-3 text-right font-semibold">Interés</th>
            <th className="px-3 py-3 text-right font-semibold">Pago</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.period}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-light'}
            >
              <td className="px-3 py-2.5 font-medium text-dark">{row.period}</td>
              <td className="px-3 py-2.5 text-right text-gray-700">{formatCurrency(row.principal)}</td>
              <td className="px-3 py-2.5 text-right text-coral">{formatCurrency(row.interest)}</td>
              <td className="px-3 py-2.5 text-right font-semibold text-primary">{formatCurrency(row.payment)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
