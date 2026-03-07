'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Header from '@/components/Header'
import { useLoan } from '@/context/LoanContext'
import { formatCurrency } from '@/lib/format'

export default function VisualizationScreen() {
  const router = useRouter()
  const { inputs, results } = useLoan()

  useEffect(() => {
    if (!inputs || !results) {
      router.replace('/')
    }
  }, [inputs, results, router])

  const chartData = useMemo(() => {
    if (!results) return []
    let cumulativeCost = 0
    return results.schedule.map((row) => {
      cumulativeCost += row.payment
      return {
        period: row.period,
        capitalRestante: parseFloat(row.remainingBalance.toFixed(2)),
        costoAcumulado: parseFloat(cumulativeCost.toFixed(2)),
      }
    })
  }, [results])

  if (!inputs || !results) return null

  const frequencyLabel = inputs.frequency === 'monthly' ? 'Mes' : 'Año'

  // Determine a good interval for x-axis ticks so it doesn't crowd on mobile
  const totalPeriods = results.schedule.length
  const tickInterval = totalPeriods <= 24 ? 0 : Math.ceil(totalPeriods / 12) - 1

  return (
    <div className="flex flex-col flex-1">
      <Header title="Visualización de Pagos" showBack onBack={() => router.push('/results')} />

      <main className="flex-1 flex flex-col px-2 py-4">
        <div className="bg-white rounded-2xl shadow-card p-3 flex-1">
          <div className="mb-4 px-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
              Progresión del Préstamo
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradCapital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#66F1C2" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#66F1C2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCosto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7675" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FF7675" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
                label={{ value: 'Período', position: 'insideBottom', offset: -2, fontSize: 11 }}
                tick={{ fontSize: 10 }}
                interval={tickInterval}
                height={40}
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v)}
                tick={{ fontSize: 9 }}
                width={72}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === 'capitalRestante' ? 'Capital Restante' : 'Costo Acumulado',
                ]}
                labelFormatter={(label) => `${frequencyLabel} ${label}`}
                contentStyle={{ borderRadius: 12, fontSize: 12 }}
              />
              <Legend
                formatter={(value) =>
                  value === 'capitalRestante' ? 'Capital Restante' : 'Costo Acumulado'
                }
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Area
                type="monotone"
                dataKey="capitalRestante"
                stroke="#66F1C2"
                strokeWidth={2.5}
                fill="url(#gradCapital)"
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Area
                type="monotone"
                dataKey="costoAcumulado"
                stroke="#FF7675"
                strokeWidth={2.5}
                fill="url(#gradCosto)"
                dot={false}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend summary */}
          <div className="mt-4 grid grid-cols-2 gap-3 px-1">
            <div className="bg-light rounded-xl p-3 border-l-4 border-primary">
              <p className="text-xs text-gray-500 mb-0.5">Capital Restante Final</p>
              <p className="text-sm font-bold text-primary">
                {formatCurrency(chartData[chartData.length - 1]?.capitalRestante ?? 0)}
              </p>
            </div>
            <div className="bg-light rounded-xl p-3 border-l-4 border-coral">
              <p className="text-xs text-gray-500 mb-0.5">Costo Total Acumulado</p>
              <p className="text-sm font-bold text-coral">
                {formatCurrency(chartData[chartData.length - 1]?.costoAcumulado ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
