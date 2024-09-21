<template>
  <div>
    <h2>Risultati della Ricerca</h2>
    <ul>
      <li v-for="(movie, index) in movies" :key="index">
        <h3>{{ movie.title }}</h3>
        <p><strong>Titolo Originale:</strong> {{ movie.original_title }}</p>
        <p><strong>Lingua:</strong> {{ movie.original_language }}</p>
        <p><strong>Voto:</strong> {{ movie.vote_average }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: Array  // Accetta la lista dei film come props
  }
};
</script>

<style scoped>
/* Stile per la lista dei film */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}
</style>
