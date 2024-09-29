// The formula for FD Calculation is: M = P + (P × r × t/100),
// where M is the Maturity Amount, P is the Principal Amount, r is the rate of interest, and t is the tenure.


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

export const finalMaturityAmount = (
    interestRate: number,
    startingBalance: number,
    investmentTerm: number
): number => {
    const initialBalance = validatedStatingBalance(startingBalance)
    return initialBalance + ( initialBalance * convertedInterestRate(interestRate) * investmentTerm)
}


enum InterestPaymentFrequency {
    MONTHLY = 12,
    QUARTERLY = 4,
    ANNUALLY = 1,
    ATMATURITY = 0
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



//For compounded interest, the formula is: M = P × {(1 + i/100)^t - 1},
// where i is the rate of interest per period
// and t is the tenure
export const finalAmountWithPaymentPeriods = (
    startingBalance: number,
    interestRate: number,
    investmentTerm: number,
    interestPaymentFrequency: string
): number => {
    const startingAmount = validatedStatingBalance(startingBalance)
    const transformedInterestPaymentFrequency = validatedInterestPaymentFrequency(interestPaymentFrequency)
    const interestValue = convertedInterestRate(interestRate)
    const interestPerPeriod = interestValue / transformedInterestPaymentFrequency
    const periodsInvested = transformedInterestPaymentFrequency * validatedInvestmentTerm(investmentTerm)
    return startingAmount * (1 + interestPerPeriod) ** periodsInvested

}


