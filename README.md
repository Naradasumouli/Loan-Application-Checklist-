"# loan-application-checklist" 
Here’s a detailed README template for your checklist system project in Node.js. You can copy this into your `README.md` file:

---

# Checklist System using Node.js

## Description

This project implements a simple checklist system using Node.js that evaluates conditions based on data fetched from an API and displays the results on a dashboard. The checklist rules are modular and easy to extend in the future.

## Features

- Fetches data from an external API.
- Evaluates multiple checklist conditions dynamically.
- Displays the status of each rule (Passed/Failed) on a dashboard.
- Easily extendable system to add or modify rules in the future.
- Clean, modular codebase following best practices.

## API Endpoint for Input Data

The system fetches data from the following API endpoint:

```plaintext
http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639
```

Sample response from the API:

```json
{
  "_id": "67339ae56d5231c1a2c63639",
  "riskRating": "Medium",
  "isValuationFeePaid": true,
  "isUkResident": true,
  "purchasePrice": "£700,000",
  "loanRequired": "£400,000",
  ...
}
```

## Checklist Rules

The following conditions are checked for each application:

1. **Valuation Fee Paid**: `isValuationFeePaid` should be `true`.
2. **UK Resident**: `isUkResident` should be `true`.
3. **Risk Rating Medium**: `riskRating` should be "Medium".
4. **LTV Below 60%**: The Loan-to-Value (LTV) is calculated as:

   \[
   \text{LTV} = \left( \frac{\text{Loan Required}}{\text{Purchase Price}} \right) \times 100
   \]

   The LTV must be less than 60%.

## Requirements

- **Node.js** (>=v18.0.0)
- **axios** (for making API requests)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/checklist-system.git
cd checklist-system
```

### 2. Install Dependencies

Run the following command to install required dependencies:

```bash
npm install
```

### 3. Run the Application

Start the Node.js server:

```bash
npm start
```

This will start a basic server that fetches data from the API and evaluates the checklist conditions.

### 4. Access the Dashboard

Open your browser and visit `http://localhost:3000` to see the checklist dashboard with the evaluation results.

## Folder Structure

```
checklist-system/
│
├── index.js          # Main server file
├── package.json      # Project configuration
├── README.md         # Project documentation
└── public/            # Frontend files (HTML, CSS, JS)
    └── index.html     # Dashboard HTML file
```

## Adding New Conditions

To add new conditions:

1. Modify the `checklistRules` array in `index.js`. Each condition is stored in this array.
2. Define a function to check the new rule and return whether it passed or failed.
3. Update the frontend (`index.html`) if necessary to display the new condition's result.

For example, to add a new rule that checks if the loan amount is above £500,000:

### Step 1: Add the rule to `checklistRules` array in `index.js`:

```javascript
const checklistRules = [
  {
    ruleName: 'Valuation Fee Paid',
    ruleFunction: (data) => data.isValuationFeePaid === true,
  },
  {
    ruleName: 'UK Resident',
    ruleFunction: (data) => data.isUkResident === true,
  },
  {
    ruleName: 'Risk Rating Medium',
    ruleFunction: (data) => data.riskRating === 'Medium',
  },
  {
    ruleName: 'LTV Below 60%',
    ruleFunction: (data) => {
      const loanRequired = parseFloat(data.loanRequired.replace('£', '').replace(',', ''));
      const purchasePrice = parseFloat(data.purchasePrice.replace('£', '').replace(',', ''));
      const ltv = (loanRequired / purchasePrice) * 100;
      return ltv < 60;
    },
  },
  // New rule: Loan above £500,000
  {
    ruleName: 'Loan Amount Above £500,000',
    ruleFunction: (data) => {
      const loanRequired = parseFloat(data.loanRequired.replace('£', '').replace(',', ''));
      return loanRequired > 500000;
    },
  },
];
```

### Step 2: Add the rule to display in the frontend:

In `index.html`, make sure to display the new rule result.

```html
<div id="new-rule">
  <p>Loan Amount Above £500,000: <span id="loan-status"></span></p>
</div>
```

In your frontend script, you can display the status of the new rule:

```javascript
const newRuleStatus = document.createElement("span");
newRuleStatus.innerText = result.loanStatus ? 'Passed' : 'Failed';
document.getElementById('loan-status').appendChild(newRuleStatus);
```

## Contributing

Feel free to fork the repository and make changes. If you have improvements or fixes, create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

