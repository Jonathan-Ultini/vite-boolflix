<template>
  <div>
    <h2>Lista Film</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} ({{ movie.release_date }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: Array  // Riceve i film come prop
  }
};
</script>

<style scoped>
h2 {
  color: green;
}
</style>
