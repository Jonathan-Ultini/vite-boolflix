// Funzione per gestire il calcolo delle stelle basato sul voto
export function useRating() {
  // Funzione che converte il voto medio (su 10) in un numero di stelle (su 5)
  function getStarRating(vote) {
    // Il voto ricevuto è diviso per 2 per convertirlo in una scala da 1 a 5
    // Math.ceil arrotonda il valore per eccesso (per esempio 4.3 diventa 5)
    const starRating = Math.ceil(vote / 2);
    // Restituisce il valore minimo tra 5 e il calcolo effettuato, assicurandosi
    // che il massimo numero di stelle sia 5 (anche se il voto arrotondato superasse 5)
    return Math.min(starRating, 5);
  }

  // Ritorna la funzione getStarRating, permettendo di usarla in altri componenti
  return { getStarRating };
}