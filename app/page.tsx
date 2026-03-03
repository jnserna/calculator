'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import TogglePill from '@/components/TogglePill'
import { useLoan } from '@/context/LoanContext'
import { calculateLoan } from '@/lib/calculations'
import type { RepaymentFrequency, RepaymentType } from '@/types/loan'

interface FormErrors {
  amount?: string
  interestRate?: string
  termYears?: string
}

const FREQUENCY_OPTIONS: { label: string; value: RepaymentFrequency }[] = [
  { label: 'Mensual', value: 'monthly' },
  { label: 'Anual', value: 'annually' },
]

const REPAYMENT_OPTIONS: { label: string; value: RepaymentType }[] = [
  { label: 'Capital e Interés', value: 'principal-interest' },
  { label: 'Solo Interés', value: 'interest-only' },
]

export default function MainScreen() {
  const router = useRouter()
  const { inputs, setInputs, setResults } = useLoan()

  const [amount, setAmount] = useState(inputs?.amount?.toString() ?? '')
  const [interestRate, setInterestRate] = useState(inputs?.interestRate?.toString() ?? '')
  const [termYears, setTermYears] = useState(inputs?.termYears?.toString() ?? '')
  const [frequency, setFrequency] = useState<RepaymentFrequency>(inputs?.frequency ?? 'monthly')
  const [repaymentType, setRepaymentType] = useState<RepaymentType>(
    inputs?.repaymentType ?? 'principal-interest',
  )
  const [errors, setErrors] = useState<FormErrors>({})

  // Restore values from context when navigating back
  useEffect(() => {
    if (inputs) {
      setAmount(inputs.amount.toString())
      setInterestRate(inputs.interestRate.toString())
      setTermYears(inputs.termYears.toString())
      setFrequency(inputs.frequency)
      setRepaymentType(inputs.repaymentType)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function validate(): boolean {
    const newErrors: FormErrors = {}
    const amountNum = parseFloat(amount)
    const rateNum = parseFloat(interestRate)
    const termNum = parseFloat(termYears)

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0'
    } else if (amountNum > 100_000_000) {
      newErrors.amount = 'El monto no puede superar $100,000,000'
    }

    if (!interestRate || isNaN(rateNum) || rateNum < 0) {
      newErrors.interestRate = 'La tasa de interés debe ser 0% o mayor'
    } else if (rateNum > 100) {
      newErrors.interestRate = 'La tasa de interés no puede superar el 100%'
    }

    if (!termYears || isNaN(termNum) || termNum < 1 || !Number.isInteger(termNum)) {
      newErrors.termYears = 'El plazo debe ser un número entero de al menos 1 año'
    } else if (termNum > 50) {
      newErrors.termYears = 'El plazo no puede superar los 50 años'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleCalculate() {
    if (!validate()) return

    const loanInputs = {
      amount: parseFloat(amount),
      interestRate: parseFloat(interestRate),
      termYears: parseInt(termYears, 10),
      frequency,
      repaymentType,
    }

    setInputs(loanInputs)
    setResults(calculateLoan(loanInputs))
    router.push('/results')
  }

  return (
    <div className="flex flex-col flex-1">
      <Header title="Paloan" showMenu />

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Section 1: Loan Information */}
        <section>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Información del Préstamo
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">
                Monto del Préstamo
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 text-dark font-medium focus:outline-none focus:border-primary transition-colors ${
                    errors.amount ? 'border-coral bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-xs text-coral font-medium">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">
                Tasa de Interés (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="0.00"
                  className={`w-full px-4 pr-10 py-3 rounded-xl border-2 text-dark font-medium focus:outline-none focus:border-primary transition-colors ${
                    errors.interestRate ? 'border-coral bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  %
                </span>
              </div>
              {errors.interestRate && (
                <p className="mt-1 text-xs text-coral font-medium">{errors.interestRate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">
                Plazo del Préstamo (Años)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                placeholder="0"
                className={`w-full px-4 py-3 rounded-xl border-2 text-dark font-medium focus:outline-none focus:border-primary transition-colors ${
                  errors.termYears ? 'border-coral bg-red-50' : 'border-gray-200 bg-white'
                }`}
              />
              {errors.termYears && (
                <p className="mt-1 text-xs text-coral font-medium">{errors.termYears}</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Payment Options */}
        <section>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Opciones de Pago
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-dark mb-2">Frecuencia de Pago</p>
              <TogglePill
                name="frequency"
                options={FREQUENCY_OPTIONS}
                selected={frequency}
                onChange={setFrequency}
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-dark mb-2">Tipo de Pago</p>
              <TogglePill
                name="repaymentType"
                options={REPAYMENT_OPTIONS}
                selected={repaymentType}
                onChange={setRepaymentType}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Section 3: Action */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        <button
          onClick={handleCalculate}
          className="w-full py-4 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-primary to-[#8B7FEE] shadow-lg active:scale-[0.98] transition-transform"
        >
          Calcular
        </button>
      </div>
    </div>
  )
}
