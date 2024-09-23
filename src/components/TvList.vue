<template>
  <div>
    <h2>Risultati Serie TV</h2>
    <ul>
      <li v-for="(tvShow, index) in tvShows" :key="index"> <!-- Ciclo su ogni elemento della lista tvShows -->
        <img :src="getImageUrl(tvShow.poster_path)" alt="Copertina" width="200px" />

        <h3>{{ tvShow.name }}</h3>

        <p><strong>Titolo Originale: </strong> {{ tvShow.original_name }}</p>

        <p><strong>Lingua Originale: </strong> {{ tvShow.original_language }}</p>

        <p><strong>Paese di Origine: </strong>
          <!-- Se la serie ha paesi di origine definiti -->
          <span v-if="tvShow.origin_country.length > 0">
            <!-- Se la bandiera del paese di origine è disponibile -->
            <img v-if="getFlagUrl(tvShow.origin_country[0])" :src="getFlagUrl(tvShow.origin_country[0])" alt="Bandiera"
              width="30px" />
            <span v-else>Non disponibile</span> <!-- Se la bandiera non è disponibile -->
          </span>
          <span v-else>Non disponibile</span> <!-- Se non è definito nessun paese di origine -->
        </p>

        <!-- Voto medio della serie TV visualizzato con stelle -->
        <p><strong>Voto:</strong>
          <span class="stars">
            <!-- Stelle piene in base al voto medio -->
            <i v-for="star in getStarRating(tvShow.vote_average)" :key="'filled-' + star" class="fas fa-star"></i>
            <!-- Stelle vuote per riempire fino a 5 stelle -->
            <i v-for="star in 5 - getStarRating(tvShow.vote_average)" :key="'empty-' + star" class="far fa-star"></i>
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useFlag } from '../composables/useFlag'; // Importa la funzione per ottenere l'URL della bandiera
import { useRating } from '../composables/useRatings'; // Importa la funzione per ottenere il voto in stelle

// Costanti per costruire l'URL delle immagini
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w342';

export default {
  name: 'TvList', // Nome del componente
  props: {
    tvShows: Array // Definisce la proprietà tvShows come un array 
  },
  // Definizione della logica del componente usando la funzione setup
  setup() {
    // Funzione per ottenere l'URL della bandiera
    const { getFlagUrl } = useFlag();
    // Funzione per ottenere il voto in stelle
    const { getStarRating } = useRating();

    // Funzione per generare l'URL completo della copertina della serie TV
    function getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    }

    return {
      getFlagUrl, // Rende disponibile la funzione per ottenere l'URL della bandiera
      getStarRating, // Rende disponibile la funzione per ottenere il rating in stelle
      getImageUrl // Rende disponibile la funzione per ottenere l'URL della copertina
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
