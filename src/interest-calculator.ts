enum InterestPaymentFrequency {
    MONTHLY = 12,
    QUARTERLY = 4,
    ANNUALLY = 1,
    ATMATURITY = 0
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

export const validatedStatingBalance = (startingBalance: number) => {
    if(startingBalance > 0) {
        return startingBalance
    } else {
        throw new ValidationError(`Starting balance must be greater than 0`)
    }
}

export const convertedInterestRate = (interestRate: number): number => {
    if(interestRate > 0) {
        return interestRate/100
    } else {
        throw new ValidationError("Interest rate must be entered as a percentage (e.g. 1.5) and must be greater than 0")
    }
}

export const validatedInvestmentTerm = (investmentTerm: number) => {
    if(investmentTerm >= 1) {
        return investmentTerm
    } else {
        throw new ValidationError('Investment term is the number os years the money will be invested and must be greater than 1')
    }
}

export const validatedInterestPaymentFrequency = (interestPayment: string) => {
    const transformedPaymentInput = interestPayment.toUpperCase().replace(/\s/g, "")
    const frequencyEnum = InterestPaymentFrequency[transformedPaymentInput as keyof typeof InterestPaymentFrequency]

    if(frequencyEnum !== undefined) {
        return frequencyEnum
    } else {
        throw new ValidationError(`Payment frequency must be Monthly, Quarterly, Annually or At Maturity`)
    }
}

export const finalMaturityAmount = (
    interestRate: number,
    startingBalance: number,
    investmentTerm: number
): number => {
    const initialBalance = validatedStatingBalance(startingBalance)
    return initialBalance + ( initialBalance * convertedInterestRate(interestRate) * investmentTerm)
}

export const finalAmountWithPaymentPeriods = (
    startingBalance: number,
    interestRate: number,
    investmentTerm: number,
    transformedInterestPaymentFrequency: InterestPaymentFrequency
): number => {
    const startingAmount = validatedStatingBalance(startingBalance)
    const interestValue = convertedInterestRate(interestRate)
    const interestPerPeriod = interestValue / transformedInterestPaymentFrequency
    const periodsInvested = transformedInterestPaymentFrequency * validatedInvestmentTerm(investmentTerm)
    return startingAmount * (1 + interestPerPeriod) ** periodsInvested
}

export const finalBalance = (
    startingBalance: number,
    interestRate: number,
    investmentTerm: number,
    interestPaymentFrequency: string
) => {
    const transformedInterestPaymentFrequency = validatedInterestPaymentFrequency(interestPaymentFrequency)
    if(transformedInterestPaymentFrequency === 0) {
        return finalMaturityAmount(interestRate, startingBalance, investmentTerm)
    } else {
        return finalAmountWithPaymentPeriods(startingBalance, interestRate, investmentTerm, transformedInterestPaymentFrequency)
    }
}