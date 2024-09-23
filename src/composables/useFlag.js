// src/composables/useFlag.js
export function useFlag() {
  function getFlagUrl(countryCode) {
    if (countryCode) {
      // Utilizza l'API di Flagpedia per ottenere l'URL della bandiera
      return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
    }
    return null;
  }

  return { getFlagUrl };
}
