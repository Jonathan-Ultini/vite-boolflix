export function useFlag() {
  function getFlagUrl(countryCode) {
    if (countryCode) {
      return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
    }
    return null;
  }

  return { getFlagUrl };
}
