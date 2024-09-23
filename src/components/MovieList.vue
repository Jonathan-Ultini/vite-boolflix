<template>
  <div>
    <h2>Risultati Film</h2>
    <ul>
      <li v-for="(movie, index) in movies" :key="index">
        <h3>{{ movie.title }}</h3>
        <p><strong>Titolo Originale:</strong> {{ movie.original_title }}</p>

        <p><strong>Lingua Originale:</strong> {{ movie.original_language }}</p>

        <p><strong>Bandiera della Lingua Originale:</strong>
          <span v-if="getFlagUrl(movie.original_language)">
            <img :src="getFlagUrl(movie.original_language)" alt="Bandiera" width="30px" />
          </span>
          <span v-else>Non disponibile</span>
        </p>

        <p><strong>Voto:</strong> {{ movie.vote_average }}</p>
        <p><strong>Data di uscita:</strong> {{ movie.release_date }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useFlag } from '../composables/useFlag'; // Importa il composable

export default {
  name: 'MovieList',
  props: {
    movies: Array
  },
  setup() {
    const { getFlagUrl } = useFlag(); // Usa il composable per la bandiera

    // Corregge il codice ISO-639-1 (lingua) per farlo funzionare come codice ISO-3166-1 (paese) per le bandiere
    function getFlagUrlMovie(originalLanguage) {
      // Mappatura di alcune lingue comuni ai codici di paese ISO 3166-1
      const languageToCountryCodeMap = {
        en: 'us',
        ja: 'jp',
      };

      const countryCode = languageToCountryCodeMap[originalLanguage];
      return getFlagUrl(countryCode);
    }

    return { getFlagUrl: getFlagUrlMovie };
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
</style>
