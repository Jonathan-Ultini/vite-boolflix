export function useRating() {
  function getStarRating(vote) {
    const starRating = Math.ceil(vote / 2);
    return Math.min(starRating, 5);
  }

  return { getStarRating };
}
