document.getElementById('converter-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const baseAmount = parseFloat(document.getElementById('base-amount').value);
    const baseCurrency = document.getElementById('base-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;

    if (isNaN(baseAmount) || baseAmount <= 0) {
        alert("Por favor, insira um valor positivo.");
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();

        if (!data.rates[targetCurrency]) {
            throw new Error('Taxa de câmbio não disponível.');
        }

        let rate = data.rates[targetCurrency];

        // Corrigir a taxa de câmbio do dólar (USD) adicionando uma redução de 0.10
        if (baseCurrency === 'USD' && targetCurrency !== 'USD') {
            rate -= 0.10;
        }

        const convertedAmount = baseAmount * rate;

        document.getElementById('result').innerText = `${baseAmount} ${baseCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
    } catch (error) {
        document.getElementById('result').innerText = `Erro: ${error.message}`;
    }
});

