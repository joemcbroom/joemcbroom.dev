<template>
  <div id="filters-container">
    <div v-for="(value, filter) in filters" :key="filter">
      <div class="filter-label">{{ filter }}</div>
      <v-select multiple :options="Array.from(value)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#filters-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  background: white;
  padding: 2rem 0;
  margin: 0 -2rem 2rem;
  box-shadow: 0px 4px 4px -2px var(--Dark-Blue);
  > div {
    flex-basis: 30%;
  }
}
</style>
