import {finalBalance} from "./interest-calculator";
import {program} from 'commander';
import inquirer from 'inquirer';

// CLI Configuration
program
    .name("Interest Calculator CLI")
    .version('0.0.1')
    .description('Calculates the ending balance of a deposit ' +
        'given the investment term, annual interest and interest payment frequency');

// Process input arguments
program.parse();
const options = program.opts();

// Use inquirer to prompt the user
inquirer.prompt([
    {
        type: 'input',
        name: 'startingBalance',
        message: 'Enter the starting balance:',
        validate: (value: string) => !isNaN(parseFloat(value)) ? true : 'Please enter a valid number',
    },
    {
        type: 'input',
        name: 'annualInterest',
        message: 'Enter the annual interest (e.g., 1.23 for 1.23%):',
        validate: (value: string) => !isNaN(parseFloat(value)) ? true : 'Please enter a valid number',
    },
    {
        type: 'input',
        name: 'investmentTerm',
        message: 'Enter the number of years the investment will run:',
        validate: (value: string) => !isNaN(parseInt(value)) ? true : 'Please enter a valid number',
    },
    {
        type: 'list',
        name: 'interestPaymentFrequency',
        message: 'Select how often the term deposit pays interests:',
        choices: ['Monthly', 'Quarterly', 'Annually', 'At Maturity'],
    },
]).then((answers) => {
    const startingBalance = parseFloat(answers.startingBalance);
    const annualInterest = parseFloat(answers.annualInterest);
    const investmentTerm = parseInt(answers.investmentTerm);
    const interestPaymentFrequency = answers.interestPaymentFrequency;

    // Run Application
    const result = finalBalance(startingBalance, annualInterest, investmentTerm, interestPaymentFrequency);
    const formattedResult: string = result.toLocaleString('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Print outputs
    console.log('Input arguments:');
    console.log('interestPaymentFrequency:', interestPaymentFrequency);
    console.log('initialBalance:', startingBalance);
    console.log('annualInterest:', annualInterest);
    console.log('investmentTerm:', investmentTerm);
    console.log('-------------------------------');
    console.log('Final Balance:', formattedResult);
});
