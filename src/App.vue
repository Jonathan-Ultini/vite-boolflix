<template>
  <div>
    <!-- <h1>Ricerca Film</h1> -->

    <Header @search-query="handleSearch" />
    <!-- Componente di ricerca che emette l'evento 'search-query' per avviare la ricerca -->

    <Loader v-if="loading" /> <!-- Mostra il caricamento se 'loading' è true -->

    <MovieList :movies="movies" v-if="!loading && movies.length" />
    <!-- Mostra la lista dei film se non è in caricamento e ci sono film da visualizzare -->

    <TvList :tvShows="tvShows" v-if="!loading && tvShows.length" />
    <!-- Mostra la lista delle serie TV se non è in caricamento e ci sono serie da visualizzare -->
  </div>
</template>

<script>
import Header from './components/Header.vue';  // Importa header
import SearchBar from './components/SearchBar.vue'; // Importa il componente di ricerca
import MovieList from './components/MovieList.vue'; // Importa il componente per la lista dei film
import Loader from './components/Loader.vue'; // Importa il componente di caricamento
import TvList from './components/TvList.vue'; // Importa il componente per la lista delle serie TV

export default {
  data() {
    return {
      movies: [], // Array per memorizzare i film trovati
      tvShows: [], // Array per memorizzare le serie TV trovate
      loading: false // Stato di caricamento inizialmente impostato su false
    };
  },
  components: {
    Header,
    SearchBar, // Registra il componente di ricerca
    MovieList, // Registra il componente della lista dei film
    Loader, // Registra il componente di caricamento
    TvList // Registra il componente della lista delle serie TV
  },
  methods: {
    async handleSearch(query) { // Metodo per gestire la ricerca
      this.loading = true; // Imposta loading a true per mostrare il caricamento
      this.movies = []; // Resetta l'array dei film
      this.tvShows = []; // Resetta l'array delle serie TV
      try {
        const apiKey = import.meta.env.VITE_API_KEY; // Ottiene la chiave API dall'ambiente

        // Chiamata all'API per cercare film
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const movieData = await movieResponse.json(); // Converte la risposta in JSON

        // Chiamata all'API per cercare serie TV
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&language=it-IT`
        );
        const tvData = await tvResponse.json(); // Converte la risposta in JSON

        this.movies = movieData.results; // Aggiorna l'array dei film con i risultati ottenuti
        this.tvShows = tvData.results; // Aggiorna l'array delle serie TV con i risultati ottenuti

      } catch (error) {
        console.error('Errore nella chiamata API:', error); // Gestisce eventuali errori nella chiamata API
      } finally {
        this.loading = false; // Imposta loading a false al termine della ricerca
      }
    }
  }
};
</script>

<style></style>
