'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import AmortizationTable from '@/components/AmortizationTable'
import { useLoan } from '@/context/LoanContext'

export default function ScheduleScreen() {
  const router = useRouter()
  const { inputs, results } = useLoan()

  useEffect(() => {
    if (!inputs || !results) {
      router.replace('/')
    }
  }, [inputs, results, router])

  if (!inputs || !results) return null

  const frequencyLabel = inputs.frequency === 'monthly' ? 'Mes' : 'Año'

  return (
    <div className="flex flex-col flex-1">
      <Header title="Tabla de Amortización" showBack onBack={() => router.push('/results')} />

      <main className="flex-1 flex flex-col px-3 py-4">
        <AmortizationTable rows={results.schedule} frequencyLabel={frequencyLabel} />
      </main>
    </div>
  )
}
