import {
    convertedInterestRate, finalAmountWithPaymentPeriods, finalBalance,
    finalMaturityAmount, validatedInterestPaymentFrequency, validatedInvestmentTerm,
    validatedStatingBalance,
} from "../interest-calculator";

describe('validatedStatingBalance', () => {
    it('should throw a ValidationError if starting balance is 0', () => {
        expect(() => validatedStatingBalance(0)).toThrow('Starting balance must be greater than 0')
        expect(() => validatedStatingBalance(-10)).toThrow('Starting balance must be greater than 0')
    })
    it('should return starting balance it is is greater than 0', () => {
        expect(validatedStatingBalance(10000)).toBe(10000)
    })
})

describe('convertedInterestRate', () => {
    it('should throw a ValidationError if interest rate is 0 or negative', () => {
        expect(() => convertedInterestRate(0)).toThrow("Interest rate must be entered as a percentage (e.g. 1.5) and must be greater than 0");
        expect(() => convertedInterestRate(-5)).toThrow("Interest rate must be entered as a percentage (e.g. 1.5) and must be greater than 0");
    });

    it('should return the converted interest rate for positive values', () => {
        expect(convertedInterestRate(5)).toBe(0.05);
        expect(convertedInterestRate(150)).toBe(1.5);
    });
});

describe('validatedInvestmentTerm', () => {
    it('should throw a ValidationError if investment period is less than 1', () => {
        expect(() => validatedInvestmentTerm(0)).toThrow("Investment term is the number os years the money will be invested and must be greater than 1");
        expect(() => validatedInvestmentTerm(-5)).toThrow("Investment term is the number os years the money will be invested and must be greater than 1");
    });

    it('should return the converted interest rate for positive values', () => {
        expect(validatedInvestmentTerm(2)).toBe(2);
        expect(validatedInvestmentTerm(2.5)).toBe(2.5);
    });
});
describe('InterestPaymentFrequency', () => {
    it('tests enum generator with a valid string', () => {
        expect(validatedInterestPaymentFrequency("Monthly")).toEqual(12)
    })

    it('tests enum generator for at maturity', () => {
        expect(validatedInterestPaymentFrequency("at maturity")).toEqual(0)
    })
})

describe('finalMaturityAmount', () => {
    it('tests balance at maturity', () => {
        expect(finalMaturityAmount(1.1, 10000, 3)).toBeCloseTo(10330.00, 2)
    })
})

describe('finalAmountWithPaymentPeriods', () => {
    it('tests balance at monthly period', () => {
        expect(finalAmountWithPaymentPeriods(10000, 5.0, 3, 12)).toBeCloseTo(11614.72, 2)
    })

    it('tests balance at quarterly period', () => {
        expect(finalAmountWithPaymentPeriods(10000, 5.0, 3, 4)).toBeCloseTo(11607.55, 2)
    })

    it('tests balance at annually period', () => {
        expect(finalAmountWithPaymentPeriods(10000, 5.0, 3, 1)).toBeCloseTo(11576.25, 2)
    })
})

describe('finalBalance', () => {
    it('tests balance with period', () => {
        expect(finalBalance( 20000, 5.0, 5, 'at maturity')).toBeCloseTo(25000, 2)
    })

    it('tests balance at maturity', () => {
        expect(finalBalance(20000, 5.0, 5, 'monthly')).toBeCloseTo(25667.17, 2)
    })
})
