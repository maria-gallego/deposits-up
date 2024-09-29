import {finalBalance} from "./interest-calculator";
import {program} from 'commander';

// CLI Configuration
program
    .name("Interest Calculator CLI")
    .version('0.0.1')
    .description('Calculates the ending balance of a deposit ' +
        'given the investment term, annual interest and interest payment frequency');

program
    .requiredOption('--startingBalance <double>', 'Starting balance')
    .requiredOption('--annualInterest <double>', 'Annual interest, e.g. 1.23 for 1.23%')
    .requiredOption('--investmentTerm <integer>', 'Number of years the investment will run')
    .requiredOption('--interestPaymentFrequency <string>', 'How ofter the term deposit pays interests');

// Process input arguments
program.parse();
const options = program.opts();
const startingBalance = options.startingBalance;
const annualInterest = options.annualInterest;
const investmentTerm = options.investmentTerm;
const interestPaymentFrequency = options.interestPaymentFrequency;

// Run Application
const result = finalBalance(startingBalance, annualInterest, investmentTerm, interestPaymentFrequency);
const formattedResult: string = result.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Print outputs
console.log('Input arguments:');
console.log('interestPaymentFrequency:', interestPaymentFrequency);
console.log('initialBalance:', startingBalance);
console.log('annualInterest:', annualInterest);
console.log('investmentTerm:', investmentTerm);
console.log('-------------------------------');
console.log('Final Balance:', formattedResult);
