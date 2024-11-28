// Define the checklist rules in a modular way
const evaluateChecklist = (data) => {
    const results = [];

    // Rule 1: Valuation Fee Paid
    if (data.isValuationFeePaid) {
        results.push({ rule: 'Valuation Fee Paid', status: 'Passed' });
    } else {
        results.push({ rule: 'Valuation Fee Paid', status: 'Failed' });
    }

    // Rule 2: UK Resident
    if (data.isUkResident) {
        results.push({ rule: 'UK Resident', status: 'Passed' });
    } else {
        results.push({ rule: 'UK Resident', status: 'Failed' });
    }

    // Rule 3: Risk Rating Medium
    if (data.riskRating === 'Medium') {
        results.push({ rule: 'Risk Rating Medium', status: 'Passed' });
    } else {
        results.push({ rule: 'Risk Rating Medium', status: 'Failed' });
    }

    // Rule 4: LTV Below 60%
    const loanRequired = parseFloat(data.mortgage.loanRequired.replace('£', '').replace(',', ''));
    const purchasePrice = parseFloat(data.mortgage.purchasePrice.replace('£', '').replace(',', ''));
    const ltv = (loanRequired / purchasePrice) * 100;

    if (ltv < 60) {
        results.push({ rule: 'LTV Below 60%', status: 'Passed' });
    } else {
        results.push({ rule: 'LTV Below 60%', status: 'Failed' });
    }

    return results;
};

module.exports = { evaluateChecklist };
