<template>
  <div>
    <h1>App principale</h1>
    <!-- Include il componente SearchBar -->
    <SearchBar />

    <!-- Include il componente MovieList -->
    <MovieList />

    <!-- Include il componente Loader -->
    <Loader />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';  // Importa il componente SearchBar
import MovieList from './components/MovieList.vue';  // Importa il componente MovieList
import Loader from './components/Loader.vue';        // Importa il componente Loader

export default {
  components: {
    SearchBar,
    MovieList,
    Loader
  }
};
</script>

<style>
/* Qui puoi aggiungere il tuo stile */
</style>
