<template>
  <div>
    <h1>Risultati Film: </h1>

    <!-- Lista dei film -->
    <ul class="movie-list">
      <!-- Ciclo v-for per iterare su ogni film -->
      <li v-for="(movie, index) in movies" :key="index" class="movie-card" @mouseover="showDetails(index)"
        @mouseleave="hideDetails">
        <!-- Poster del film -->
        <img :src="getImageUrl(movie.poster_path)" alt="Copertina" />
        <h3>{{ movie.title }}</h3>

        <!-- Dettagli del film -->
        <div class="movie-info" v-if="hoveredMovie === index">

          <p><strong>Titolo Originale:</strong> {{ movie.original_title }}</p>

          <!-- <p><strong>Lingua Originale:</strong> {{ movie.original_language }}</p> -->

          <p><strong>Lingua Originale:</strong>
            <span v-if="getFlagUrl(movie.original_language)">
              <img :src="getFlagUrl(movie.original_language)" alt="Bandiera" class="flag" />
            </span>
            <span v-else>Non disponibile</span>
          </p>

          <p><strong>Voto:</strong>
            <span class="stars">
              <i v-for="star in 5" :key="star"
                :class="star <= getStarRating(movie.vote_average) ? 'fas fa-star' : 'far fa-star'"></i>
            </span>
          </p>

          <p><strong>Data di uscita:</strong> {{ movie.release_date }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
// Importa le composable functions useFlag e useRating dai rispettivi file
import { useFlag } from '../composables/useFlag';
import { useRating } from '../composables/useRatings';

// Definisce l'URL base per le immagini dei film e la dimensione desiderata
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w342';

export default {
  name: 'MovieList',  // Nome del componente

  // Prop che accetta un array di film da visualizzare
  props: {
    movies: Array
  },
  data() {
    return {
      hoveredMovie: null
    };
  },
  methods: {
    getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    },
    showDetails(index) {
      this.hoveredMovie = index;
    },
    hideDetails() {
      this.hoveredMovie = null;
    }
  },
  // Definizione della logica del componente usando la funzione setup
  setup() {
    // Utilizza le funzioni importate per ottenere l'URL della bandiera e il voto in stelle
    const { getFlagUrl } = useFlag();
    const { getStarRating } = useRating();

    // Funzione che costruisce l'URL completo per il poster del film
    function getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    }

    // Mappa i codici delle lingue a codici paese per ottenere la bandiera corretta
    function getFlagUrlMovie(originalLanguage) {
      const languageToCountryCodeMap = {
        en: 'us',  // Inglese -> Stati Uniti
        ja: 'jp',  // Giapponese -> Giappone
      };

      // Prende il codice del paese dalla mappa, se disponibile, e usa la funzione getFlagUrl per ottenere l'URL della bandiera
      const countryCode = languageToCountryCodeMap[originalLanguage];
      return getFlagUrl(countryCode);
    }

    // Ritorna le funzioni che possono essere utilizzate nel template
    return {
      getFlagUrl: getFlagUrlMovie,  // Usa la versione modificata della funzione getFlagUrl
      getStarRating,  // Usa la funzione per il calcolo delle stelle
      getImageUrl  // Usa la funzione per costruire l'URL delle immagini
    };
  }
};
</script>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  position: relative;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  height: auto;
}

.movie-info {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  width: 100%;
  padding: 10px;
  display: none;
}

.movie-card:hover .movie-info {
  display: block;
}

ul {
  list-style-type: none;
  padding: 20px;
}

li {
  margin-bottom: 20px;
}

h1 {
  color: white;
  background-color: green;
  font-weight: bold;
}

h3 {
  color: greenyellow;
}

.stars {
  color: gold;
  font-size: 20px;
}
</style>
