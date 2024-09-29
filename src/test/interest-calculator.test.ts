import {
    convertedInterestRate,
    finalMaturityAmount, validatedInvestmentTerm,
    validatedStatingBalance,
    ValidationError
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

describe('tests final balance', () => {
    // it('tests balance with period', () => {
    //     expect(finalBalance("monthly", 10000, 1.1, 3)).toBeCloseTo(10335.35, 2)
    // })

    it('tests balance at maturity', () => {
        expect(finalMaturityAmount(1.1, 10000, 3)).toBeCloseTo(10330.00, 2)
    })
})
