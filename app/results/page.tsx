'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TableIcon, BarChart2 } from 'lucide-react'
import Header from '@/components/Header'
import ResultCard from '@/components/ResultCard'
import { useLoan } from '@/context/LoanContext'
import { formatCurrency, formatPercent } from '@/lib/format'

export default function ResultsScreen() {
  const router = useRouter()
  const { inputs, results } = useLoan()

  useEffect(() => {
    if (!inputs || !results) {
      router.replace('/')
    }
  }, [inputs, results, router])

  if (!inputs || !results) return null

  const frequencyLabel = inputs.frequency === 'monthly' ? 'Mensual' : 'Anual'
  const paymentLabel = inputs.frequency === 'monthly' ? 'Cuota Mensual' : 'Cuota Anual'

  const summaryRows = [
    { label: paymentLabel, value: formatCurrency(results.periodicPayment), highlight: true },
    { label: 'Monto del Préstamo', value: formatCurrency(inputs.amount) },
    { label: 'Tasa de Interés', value: formatPercent(inputs.interestRate) },
    { label: 'Plazo', value: `${inputs.termYears} años` },
    { label: 'Frecuencia', value: frequencyLabel },
  ]

  const breakdownRows = [
    { label: 'Capital', value: formatCurrency(results.totalPrincipal) },
    { label: 'Interés Total', value: formatCurrency(results.totalInterest) },
    { label: 'Costo Total del Préstamo', value: formatCurrency(results.totalCost), highlight: true },
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header title="Resumen de Resultados" showBack onBack={() => router.push('/')} />

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <ResultCard
          title="Resumen del Préstamo"
          rows={summaryRows}
          accentColor="border-primary"
        />

        <ResultCard
          title="Desglose del Pago"
          rows={breakdownRows}
          accentColor="border-teal"
        />

        <div className="space-y-3 pt-2">
          <button
            onClick={() => router.push('/schedule')}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl border-2 border-primary text-primary font-semibold text-sm active:bg-primary/5 transition-colors"
          >
            <TableIcon size={18} />
            Tabla de Amortización
          </button>

          <button
            onClick={() => router.push('/visualization')}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-[#8B7FEE] text-white font-semibold text-sm shadow-lg active:scale-[0.98] transition-transform"
          >
            <BarChart2 size={18} />
            Visualización de Pagos
          </button>
        </div>
      </main>
    </div>
  )
}
