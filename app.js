const apiKey = '384fc522241843cfaf690dfe00cdad6b'; // Replace 'YOUR_API_KEY' with your actual API key

// Function to fetch currency options from the API
async function fetchCurrencies() { // Use async keyword to indicate that this function returns a promise
    try {
        // Use await keyword to pause the execution until the promise is resolved
        const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${apiKey}`);
        const data = await response.json();

        const sourceCurrencySelect = document.getElementById('sourceCurrency');
        const targetCurrencySelect = document.getElementById('targetCurrency');

        // Populate the source and target currency dropdowns
        for (const currency in data) {
            const option = document.createElement('option');
            option.value = currency;
            option.text = data[currency];
            sourceCurrencySelect.appendChild(option);
            targetCurrencySelect.appendChild(option.cloneNode(true));
        }
    } catch (error) { // Use catch block to handle any errors
        console.error('Error fetching currencies:', error);
    }
}

// Function to perform currency conversion
async function convertCurrency() { // Use async keyword to indicate that this function returns a promise
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;

    if (isNaN(amount) || !sourceCurrency || !targetCurrency) {
        alert('Please enter valid input.');
        return;
    }

    try {
        // Use the latest endpoint of the Open Exchange Rates API, which supports CORS and has a simpler URL format
        // Use await keyword to pause the execution until the promise is resolved
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${sourceCurrency}&symbols=${targetCurrency}`);
        const data = await response.json();

        if (data.rates === undefined) {
            throw new Error('Exchange rates are undefined.');
        }

        // Extract the exchange rate from the response and multiply it by the amount to get the conversion result
        const rate = data.rates[targetCurrency];
        const result = rate * amount;
        const resultElement = document.getElementById('result');
        resultElement.textContent = `${amount.toFixed(2)} ${sourceCurrency} = ${result.toFixed(2)} ${targetCurrency}`;
    } catch (error) { // Use catch block to handle any errors
        console.error('Error converting currency:', error);
        alert('Error converting currency. Please try again later.');
    }
}

// Call the function to fetch currencies when the page loads
fetchCurrencies();
