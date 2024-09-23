<template>
  <div>
    <h2>Risultati Film</h2>
    <ul>
      <li v-for="(movie, index) in movies" :key="index">
        <img :src="getImageUrl(movie.poster_path)" alt="Copertina" width="200px" />
        <h3>{{ movie.title }}</h3>
        <p><strong>Titolo Originale:</strong> {{ movie.original_title }}</p>

        <p><strong>Lingua Originale:</strong> {{ movie.original_language }}</p>

        <p><strong>Bandiera della Lingua Originale:</strong>
          <span v-if="getFlagUrl(movie.original_language)">
            <img :src="getFlagUrl(movie.original_language)" alt="Bandiera" width="30px" />
          </span>
          <span v-else>Non disponibile</span>
        </p>

        <p><strong>Voto:</strong>
          <span class="stars">
            <i v-for="star in getStarRating(movie.vote_average)" :key="'filled-' + star" class="fas fa-star"></i>
            <i v-for="star in 5 - getStarRating(movie.vote_average)" :key="'empty-' + star" class="far fa-star"></i>
          </span>
        </p>

        <p><strong>Data di uscita:</strong> {{ movie.release_date }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useFlag } from '../composables/useFlag';
import { useRating } from '../composables/useRatings';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w342';

export default {
  name: 'MovieList',
  props: {
    movies: Array
  },
  setup() {
    const { getFlagUrl } = useFlag();
    const { getStarRating } = useRating();

    function getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    }

    function getFlagUrlMovie(originalLanguage) {
      const languageToCountryCodeMap = {
        en: 'us',
        ja: 'jp',
      };

      const countryCode = languageToCountryCodeMap[originalLanguage];
      return getFlagUrl(countryCode);
    }

    return {
      getFlagUrl: getFlagUrlMovie,
      getStarRating,
      getImageUrl
    };
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h2 {
  color: green;
}

h3 {
  color: greenyellow;
}

.stars {
  color: gold;
  font-size: 20px;
}
</style>
