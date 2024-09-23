<template>
  <div>
    <h2>Risultati Film</h2>

    <!-- Lista dei film -->
    <ul>
      <!-- Ciclo v-for per iterare su ogni film nell'array "movies" passato come prop.
           Utilizza "index" come chiave unica per ogni elemento della lista. -->
      <li v-for="(movie, index) in movies" :key="index">

        <!-- Immagine del poster del film, generata usando la funzione getImageUrl che costruisce
             l'URL completo dell'immagine a partire da una parte dell'URL ricevuta dall'API -->
        <img :src="getImageUrl(movie.poster_path)" alt="Copertina" width="200px" />

        <h3>{{ movie.title }}</h3>

        <p><strong>Titolo Originale:</strong> {{ movie.original_title }}</p>

        <p><strong>Lingua Originale:</strong> {{ movie.original_language }}</p>

        <p><strong>Bandiera della Lingua Originale:</strong>
          <!-- Mostra la bandiera solo se la funzione getFlagUrl ritorna un URL valido -->
          <span v-if="getFlagUrl(movie.original_language)">
            <!-- Immagine della bandiera, con la funzione getFlagUrl che costruisce l'URL della bandiera -->
            <img :src="getFlagUrl(movie.original_language)" alt="Bandiera" width="30px" />
          </span>
          <!-- Testo alternativo se la bandiera non è disponibile -->
          <span v-else>Non disponibile</span>
        </p>

        <!-- Voto del film, mostrato come stelle -->
        <p><strong>Voto:</strong>
          <!-- Ciclo per creare un'icona di stella piena per il numero di stelle calcolato da getStarRating -->
          <span class="stars">
            <i v-for="star in getStarRating(movie.vote_average)" :key="'filled-' + star" class="fas fa-star"></i>
            <!-- Ciclo per creare le stelle vuote, sottraendo le stelle piene dal numero totale di stelle (5) -->
            <i v-for="star in 5 - getStarRating(movie.vote_average)" :key="'empty-' + star" class="far fa-star"></i>
          </span>
        </p>

        <p><strong>Data di uscita:</strong> {{ movie.release_date }}</p>
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
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h2 {
  color: green;
}

h3 {
  color: greenyellow;
}

.stars {
  color: gold;
  font-size: 20px;
}
</style>
