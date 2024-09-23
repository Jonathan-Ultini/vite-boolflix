// Funzione per gestire l'ottenimento dell'URL della bandiera di un paese
export function useFlag() {
  // Funzione che prende il codice del paese e restituisce l'URL della bandiera
  function getFlagUrl(countryCode) {
    // Controlla se il codice del paese è fornito
    if (countryCode) {
      // Costruisce l'URL dell'immagine della bandiera usando FlagCDN
      // Convertendo il codice del paese in lettere minuscole come richiesto dall'API
      return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
    }
    // Se il codice non è fornito, restituisce null (nessuna bandiera disponibile)
    return null;
  }

  // Ritorna la funzione getFlagUrl, permettendo di usarla in altri componenti
  return { getFlagUrl };
}