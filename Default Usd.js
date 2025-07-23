<script>

   let exchangeRates = {};

  const currencySymbols = {
    ISK: 'ISK',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  async function fetchExchangeRates() {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=ISK&to=USD,EUR,GBP');
      const data = await res.json();
      console.log('Frankfurter API Response:', data);

      exchangeRates = {
        ISK: 1,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP
      };
    } catch (error) {
      console.error('Exchange rate fetch failed:', error);
    }
  }

  function updatePrices(currency) {
    document.querySelectorAll('.price').forEach(el => {
      const isk = parseFloat(el.getAttribute('data-isk'));
      if (isNaN(isk)) return;

      const converted = isk * exchangeRates[currency];
      const formatted = currency === 'ISK'
        ? `${currencySymbols[currency]} ${isk.toLocaleString()}`
        : `${currencySymbols[currency]} ${converted.toFixed(2)}`;

      el.innerText = ` ${formatted} `;
    });
  }

  async function initCurrencySelector() {
    await fetchExchangeRates();

    const selector = document.getElementById('currencySelector');
    if (selector) {
      // ✅ Display initial price in USD (default selected)
      updatePrices(selector.value);

      selector.addEventListener('change', () => {
        updatePrices(selector.value);
      });
    }
  }

  window.addEventListener('DOMContentLoaded', initCurrencySelector);


</script>
