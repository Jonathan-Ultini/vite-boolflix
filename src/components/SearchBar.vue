<template>
  <div>
    <h2>Search Bar</h2>
    <input type="text" v-model="searchQuery" placeholder="Cerca un film..." @keyup.enter="submitSearch" />
    <button @click="submitSearch">Cerca</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    submitSearch() {
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
