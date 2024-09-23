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
      </li>
    </ul>
  </div>
</template>

<script>
import { useFlag } from '../composables/useFlag'; // Importa il composable

export default {
  name: 'TvList',
  props: {
    tvShows: Array
  },
  setup() {
    const { getFlagUrl } = useFlag(); // Usa il composable
    return { getFlagUrl };
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
</style>
