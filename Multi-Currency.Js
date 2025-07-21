<script>
    const exchangeRates = {
        ISK: 1,
        USD: 0.0082,  // Example rate
        EUR: 0.0070,
        GBP: 0.0061
      };
    
      const currencySymbols = {
        ISK: 'ISK',
        USD: '$',
        EUR: '€',
        GBP: '£'
      };
    
      function updatePrices(currency) {
        const prices = document.querySelectorAll('.price');
        prices.forEach(priceEl => {
          const iskValue = parseFloat(priceEl.getAttribute('data-isk'));
          const converted = iskValue * exchangeRates[currency];
          const formatted = currency === 'ISK' 
            ? `${currencySymbols[currency]} ${iskValue.toLocaleString()}`
            : `${currencySymbols[currency]} ${converted.toFixed(2)}`;
    
          priceEl.innerText = `${formatted} `; // Adjust based on your actual text
        });
      }
    
      document.getElementById('currencySelector').addEventListener('change', (e) => {
        updatePrices(e.target.value);
      });
    
      // Optional: convert to user's local currency on first load
      window.addEventListener('DOMContentLoaded', () => {
        const defaultCurrency = document.getElementById('currencySelector').value;
        updatePrices(defaultCurrency);
      });
</script>
