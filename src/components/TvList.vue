<template>
  <div>
    <h2>Risultati Serie TV</h2>
    <ul>
      <li v-for="(tvShow, index) in tvShows" :key="index">
        <img :src="getImageUrl(tvShow.poster_path)" alt="Copertina" width="200px" />
        <h3>{{ tvShow.name }}</h3>
        <p><strong>Titolo Originale: </strong> {{ tvShow.original_name }}</p>

        <p><strong>Lingua Originale: </strong> {{ tvShow.original_language }}</p>

        <p><strong>Paese di Origine: </strong>
          <span v-if="tvShow.origin_country.length > 0">
            <img v-if="getFlagUrl(tvShow.origin_country[0])" :src="getFlagUrl(tvShow.origin_country[0])" alt="Bandiera"
              width="30px" />
            <span v-else>Non disponibile</span>
          </span>
          <span v-else>Non disponibile</span>
        </p>

        <p><strong>Voto:</strong>
          <span class="stars">
            <i v-for="star in getStarRating(tvShow.vote_average)" :key="'filled-' + star" class="fas fa-star"></i>
            <i v-for="star in 5 - getStarRating(tvShow.vote_average)" :key="'empty-' + star" class="far fa-star"></i>
          </span>
        </p>
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
  name: 'TvList',
  props: {
    tvShows: Array
  },
  setup() {
    const { getFlagUrl } = useFlag();
    const { getStarRating } = useRating();

    function getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    }

    return {
      getFlagUrl,
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
  color: red;
}

h3 {
  color: orange;
}

.stars {
  color: gold;
  font-size: 20px;
}
</style>