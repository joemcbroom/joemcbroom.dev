<template>
  <div id="filters-container">
    <v-select
      v-for="(value, filter) in filters"
      :key="filter"
      class="filter-select"
      multiple
      :placeholder="filter"
      :options="Array.from(value)"
    />
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

<style lang="scss">
#filters-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  position: sticky;
  top: 0;
  background: white;
  padding: 2rem 1rem;
  margin: 0 -2rem 2rem;
  box-shadow: 0px 4px 4px -2px var(--Dark-Blue);
  flex-direction: column;
  > div {
    flex-basis: 100%;
  }
}
@media only screen and (min-width: 768px) {
  #filters-container {
    > div {
      flex-basis: 30%;
    }
  }
}

.filter-select .vs__search::placeholder {
  text-transform: capitalize;
}
</style>
