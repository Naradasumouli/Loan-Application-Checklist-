const express = require('express');
const axios = require('axios');
const { evaluateChecklist } = require('./checklist');

const app = express();
const port = 3000;

// Serve static files like HTML, CSS, JS
app.use(express.static('public'));

// Endpoint to fetch application data
app.get('/api/application', async (req, res) => {
    try {
        const response = await axios.get('http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639');
        const data = response.data;

        // Evaluate checklist rules
        const evaluationResults = evaluateChecklist(data);
        res.json(evaluationResults);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
