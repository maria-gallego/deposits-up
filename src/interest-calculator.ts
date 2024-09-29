export const finalBalance = (
    startingBalance: number,
    interestRate: number,
    investmentTerm: number,
    interestPaymentFrequency: string
) => {
    const validatedStartingBalance = validateStatingBalance(startingBalance)
    const validatedInterest = convertedInterestRate(interestRate)
    const validatedInvestmentTerm = validateInvestmentTerm(investmentTerm)
    const transformedInterestPaymentFrequency = validatedInterestPaymentFrequency(interestPaymentFrequency)
    if(transformedInterestPaymentFrequency === 0) {
        return finalMaturityAmount(validatedInterest, validatedStartingBalance, validatedInvestmentTerm)
    } else {
        return finalAmountWithPaymentPeriods(validatedStartingBalance, validatedInterest, validatedInvestmentTerm, transformedInterestPaymentFrequency)
    }
}

export enum InterestPaymentFrequency {
    MONTHLY = 12,
    QUARTERLY = 4,
    ANNUALLY = 1,
    ATMATURITY = 0
}

export const finalMaturityAmount = (
    validatedInterest: number,
    validatedStartingBalance: number,
    validatedInvestmentTerm: number
): number => {
    return (validatedStartingBalance * validatedInterest * validatedInvestmentTerm) + validatedStartingBalance
}

export const finalAmountWithPaymentPeriods = (
    validatedStartingBalance: number,
    validatedInterest: number,
    validatedInvestmentTerm: number,
    transformedInterestPaymentFrequency: InterestPaymentFrequency
): number => {
    const interestPerPeriod = validatedInterest / transformedInterestPaymentFrequency
    const periodsInvested = transformedInterestPaymentFrequency * validatedInvestmentTerm
    return validatedStartingBalance * (1 + interestPerPeriod) ** periodsInvested
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

export const validateStatingBalance = (startingBalance: number) => {
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

export const validateInvestmentTerm = (investmentTerm: number) => {
    if(investmentTerm >= 1) {
        return investmentTerm
    } else {
        throw new ValidationError('Investment term is the number of years the money will be invested and must be greater than 1')
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