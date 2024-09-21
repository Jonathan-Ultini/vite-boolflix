<template>
  <div>
    <h1>Ricerca Film</h1>
    <!-- Componente per la barra di ricerca -->
    <SearchBar @search-query="handleSearch" />

    <!-- Loader durante il caricamento -->
    <Loader v-if="loading" />

    <!-- Lista dei film con i risultati passati come props -->
    <MovieList :movies="movies" v-if="!loading && movies.length" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import MovieList from './components/MovieList.vue';
import Loader from './components/Loader.vue';

export default {
  data() {
    return {
      movies: [],  // Memorizza i risultati della ricerca
      loading: false // Stato di caricamento
    };
  },
  components: {
    SearchBar,
    MovieList,
    Loader
  },
  methods: {
    async handleSearch(query) {
      this.loading = true;  // Mostra il loader durante il caricamento
      this.movies = [];  // Pulisce i risultati precedenti
      try {
        const apiKey = import.meta.env.VITE_API_KEY; // Inserita la API_KEY
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const data = await response.json();
        this.movies = data.results;  // Aggiorna i film trovati
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
      } finally {
        this.loading = false;  // Nascondi il loader una volta completata la richiesta
      }
    }
  }
};
</script>

<style>
/* Qui puoi aggiungere il tuo stile */
</style>
