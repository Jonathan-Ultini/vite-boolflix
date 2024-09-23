<template>
  <div>
    <h1>Ricerca Film</h1>
    <SearchBar @search-query="handleSearch" />

    <Loader v-if="loading" />

    <MovieList :movies="movies" v-if="!loading && movies.length" />

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
      movies: [],
      tvShows: [],
      loading: false
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
      this.loading = true;
      this.movies = [];
      this.tvShows = [];
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const movieData = await movieResponse.json();

        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const tvData = await tvResponse.json();

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
