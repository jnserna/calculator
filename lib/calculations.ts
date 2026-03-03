import type { LoanInputs, LoanResults, AmortizationRow } from '@/types/loan'

function getPeriodicRate(annualRatePercent: number, frequency: LoanInputs['frequency']): number {
  const annualRate = annualRatePercent / 100
  return frequency === 'monthly' ? annualRate / 12 : annualRate
}

function getNumPeriods(termYears: number, frequency: LoanInputs['frequency']): number {
  return frequency === 'monthly' ? termYears * 12 : termYears
}

function buildSchedulePrincipalInterest(
  principal: number,
  periodicRate: number,
  numPeriods: number,
  periodicPayment: number,
): AmortizationRow[] {
  const rows: AmortizationRow[] = []
  let balance = principal

  for (let i = 1; i <= numPeriods; i++) {
    const interestPortion = balance * periodicRate
    let principalPortion = periodicPayment - interestPortion
    // On final payment, adjust for rounding
    if (i === numPeriods) {
      principalPortion = balance
    }
    balance = Math.max(0, balance - principalPortion)

    rows.push({
      period: i,
      principal: principalPortion,
      interest: interestPortion,
      payment: principalPortion + interestPortion,
      remainingBalance: balance,
    })
  }

  return rows
}

function buildScheduleInterestOnly(
  principal: number,
  periodicRate: number,
  numPeriods: number,
  periodicPayment: number,
): AmortizationRow[] {
  const rows: AmortizationRow[] = []

  for (let i = 1; i <= numPeriods; i++) {
    const isLast = i === numPeriods
    const principalPortion = isLast ? principal : 0
    const interestPortion = periodicPayment

    rows.push({
      period: i,
      principal: principalPortion,
      interest: interestPortion,
      payment: isLast ? principal + periodicPayment : periodicPayment,
      remainingBalance: isLast ? 0 : principal,
    })
  }

  return rows
}

export function calculateLoan(inputs: LoanInputs): LoanResults {
  const { amount, interestRate, termYears, frequency, repaymentType } = inputs
  const r = getPeriodicRate(interestRate, frequency)
  const n = getNumPeriods(termYears, frequency)

  let periodicPayment: number
  let schedule: AmortizationRow[]

  if (repaymentType === 'principal-interest') {
    if (r === 0) {
      // Zero interest edge case
      periodicPayment = amount / n
    } else {
      periodicPayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }
    schedule = buildSchedulePrincipalInterest(amount, r, n, periodicPayment)
  } else {
    // Interest only: periodic payment = P × r; principal returned at end
    periodicPayment = amount * r
    schedule = buildScheduleInterestOnly(amount, r, n, periodicPayment)
  }

  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0)
  const totalPrincipal = amount
  const totalCost = totalPrincipal + totalInterest

  return {
    periodicPayment,
    totalPrincipal,
    totalInterest,
    totalCost,
    schedule,
  }
}
