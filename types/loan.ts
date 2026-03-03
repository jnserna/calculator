export type RepaymentFrequency = 'monthly' | 'annually'
export type RepaymentType = 'principal-interest' | 'interest-only'

export interface LoanInputs {
  amount: number
  interestRate: number
  termYears: number
  frequency: RepaymentFrequency
  repaymentType: RepaymentType
}

export interface AmortizationRow {
  period: number
  principal: number
  interest: number
  payment: number
  remainingBalance: number
}

export interface LoanResults {
  periodicPayment: number
  totalPrincipal: number
  totalInterest: number
  totalCost: number
  schedule: AmortizationRow[]
}
