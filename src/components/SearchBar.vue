<template>
  <div>
    <h2>Search Bar</h2>
    <input type="text" v-model="searchQuery" placeholder="Cerca un film..." @keyup.enter="submitSearch" />
    <!-- Input di testo legato al modello 'searchQuery', la ricerca viene inviata anche quando si preme Invio -->
    <button @click="submitSearch">Cerca</button> <!-- Bottone che attiva la ricerca quando viene cliccato -->
  </div>
</template>

<script>
export default {
  name: 'SearchBar', // Nome del componente
  data() {
    return {
      searchQuery: '' // Inizializza la query di ricerca come stringa vuota
    };
  },
  methods: {
    submitSearch() {
      // Metodo chiamato quando si clicca sul bottone di ricerca o si preme Invio nell'input
      // Emette l'evento 'search-query' verso il componente padre, passando la query inserita
      this.$emit('search-query', this.searchQuery);
    }
  }
};
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
