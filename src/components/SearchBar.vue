<template>
  <div>
    <h2>Search Bar</h2>
    <input type="text" v-model="searchQuery" placeholder="Cerca un film..." @keyup.enter="submitSearch" />
    <button @click="submitSearch">Cerca</button>
    <!-- <p>{{ searchQuery }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''  // Memorizza la query di ricerca inserita dall'utente
    };
  },
  methods: {
    submitSearch() {
      this.$emit('search-query', this.searchQuery);  // Emette un evento con la query di ricerca
    }
  }
};
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
