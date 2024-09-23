<template>
  <div>
    <h2>Risultati Serie TV</h2>
    <ul>
      <li v-for="(tvShow, index) in tvShows" :key="index">
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

        <p><strong>Voto:</strong> {{ tvShow.vote_average }}</p>

        <div>
          <span v-for="star in 5" :key="star" class="star">
            <i v-if="star <= getStarRating(tvShow.vote_average)" class="fas fa-star stars"></i>
            <i v-else class="far fa-star stars"></i>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useFlag } from '../composables/useFlag';
import { useRating } from '../composables/useRatings';

export default {
  name: 'TvList',
  props: {
    tvShows: Array
  },
  setup() {
    const { getFlagUrl } = useFlag();
    const { getStarRating } = useRating();

    return {
      getFlagUrl,
      getStarRating
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