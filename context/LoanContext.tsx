'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { LoanInputs, LoanResults } from '@/types/loan'

interface LoanContextValue {
  inputs: LoanInputs | null
  results: LoanResults | null
  setInputs: (inputs: LoanInputs) => void
  setResults: (results: LoanResults) => void
}

const LoanContext = createContext<LoanContextValue | null>(null)

export function LoanProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<LoanInputs | null>(null)
  const [results, setResults] = useState<LoanResults | null>(null)

  return (
    <LoanContext.Provider value={{ inputs, results, setInputs, setResults }}>
      {children}
    </LoanContext.Provider>
  )
}

export function useLoan(): LoanContextValue {
  const ctx = useContext(LoanContext)
  if (!ctx) throw new Error('useLoan must be used within LoanProvider')
  return ctx
}
