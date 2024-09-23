<template>
  <div>
    <h1>Ricerca Film</h1>
    <!-- Componente per la barra di ricerca -->
    <SearchBar @search-query="handleSearch" />

    <!-- Loader durante il caricamento -->
    <Loader v-if="loading" />

    <!-- Lista dei film con i risultati passati come props -->
    <MovieList :movies="movies" v-if="!loading && movies.length" />

    <!-- Lista delle serie TV -->
    <TvList :tvShows="tvShows" v-if="!loading && tvShows.length" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import MovieList from './components/MovieList.vue';
import Loader from './components/Loader.vue';
import TvList from './components/TvList.vue';

export default {
  data() {
    return {
      movies: [],   // Risultati dei film
      tvShows: [],  // Risultati delle serie TV
      loading: false // Stato di caricamento
    };
  },
  components: {
    SearchBar,
    MovieList,
    Loader,
    TvList
  },
  methods: {
    async handleSearch(query) {
      this.loading = true;  // Mostra il loader durante il caricamento
      this.movies = [];  // Pulisce i risultati precedenti
      this.tvShows = [];  // Pulisce anche i risultati delle serie TV
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        // Chiamata per i film
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const movieData = await movieResponse.json();

        // Chiamata per le serie TV
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const tvData = await tvResponse.json();

        // Assegna i risultati separati a film e serie TV
        this.movies = movieData.results;
        this.tvShows = tvData.results;

      } catch (error) {
        console.error('Errore nella chiamata API:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style></style>
