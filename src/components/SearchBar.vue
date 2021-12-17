<template>
  <div class="wrap">
    <form class="search" @submit.prevent="onSubmit">
      <input
        type="text"
        class="searchTerm"
        placeholder="What are you looking for?"
        @input="$emit('update:searchTerm', $event.target.value)"
      />
      <button type="submit" class="searchButton">
        <search-icon color="white" />
      </button>
    </form>
  </div>
</template>

<script>
import SearchIcon from '@/components/icons/SearchIcon';
export default {
  components: { SearchIcon },
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid var(--Blue);
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: var(--Blue);
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid var(--Blue);
  background: var(--Blue);
  text-align: center;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.wrap {
  width: 35%;
  margin: 2rem auto;
}
</style>
