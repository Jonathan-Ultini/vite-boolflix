<template>
  <div>
    <h1>Risultati Serie TV: </h1>
    <ul class="tv-list">
      <li v-for="(tvShow, index) in tvShows" :key="index" class="tv-card" @mouseover="showDetails(index)"
        @mouseleave="hideDetails">
        <!-- Immagine della copertina -->
        <img :src="getImageUrl(tvShow.poster_path)" alt="Copertina" class="poster" />

        <!-- Titolo della serie -->
        <h3>{{ tvShow.name }}</h3>

        <!-- Dettagli visualizzati al passaggio del mouse -->
        <div v-if="hoveredTvShow === index" class="tv-info">
          <p><strong>Titolo Originale:</strong> {{ tvShow.original_name }}</p>
          <!-- <p><strong>Lingua Originale:</strong> {{ tvShow.original_language }}</p> -->
          <p><strong>Lingua originale:</strong>
            <span v-if="tvShow.origin_country.length > 0">
              <img v-if="getFlagUrl(tvShow.origin_country[0])" :src="getFlagUrl(tvShow.origin_country[0])"
                alt="Bandiera" class="flag" />
              <span v-else>Non disponibile</span>
            </span>
            <span v-else>Non disponibile</span>
          </p>

          <!-- Voto medio della serie TV -->
          <p><strong>Voto:</strong>
            <span class="stars">
              <i v-for="star in getStarRating(tvShow.vote_average)" :key="'filled-' + star" class="fas fa-star"></i>
              <i v-for="star in 5 - getStarRating(tvShow.vote_average)" :key="'empty-' + star" class="far fa-star"></i>
            </span>
          </p>
        </div>
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
  data() {
    return {
      hoveredTvShow: null // Stato per gestire il mouse hover
    };
  },
  methods: {
    getImageUrl(posterPath) {
      return `${IMAGE_BASE_URL}${IMAGE_SIZE}${posterPath}`;
    },
    showDetails(index) {
      this.hoveredTvShow = index;
    },
    hideDetails() {
      this.hoveredTvShow = null;
    }
  },
  // Definizione della logica del componente usando la funzione setup
  setup() {
    // Funzione per ottenere l'URL della bandiera
    const { getFlagUrl } = useFlag();
    // Funzione per ottenere il voto in stelle
    const { getStarRating } = useRating();

    return {
      getFlagUrl, // Rende disponibile la funzione per ottenere l'URL della bandiera
      getStarRating, // Rende disponibile la funzione per ottenere il rating in stelle
    };
  }
};
</script>

<style scoped>
.tv-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.tv-card {
  position: relative;
  cursor: pointer;
}

.tv-card img.poster {
  width: 100%;
  height: auto;
}

.tv-info {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  width: 100%;
  padding: 10px;
  display: none;
}

.tv-card:hover .tv-info {
  display: block;
}


.stars {
  color: gold;
  font-size: 20px;
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
  background-color: orange;
  font-weight: bold
}

h3 {
  color: orange;
}
</style>
