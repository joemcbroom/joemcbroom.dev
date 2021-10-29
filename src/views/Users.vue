<template>
  <div id="users">
    <div v-if="Object.keys(info).length" class="results">Results: {{ info.results }}</div>
    <FiltersList v-if="Object.keys(filters).length" :filters="filters" />
    <UsersList v-if="users.length" :users="users" />
    <LoadingIndicator v-else spinner-type="ripple" />
    <search-error v-if="error" :error="error" class="highlight" />
  </div>
</template>

<script>
import UsersList from '../components/UsersList';
import FiltersList from '../components/FiltersList';
import LoadingIndicator from '../components/LoadingIndicator.vue';
export default {
  components: { UsersList, FiltersList, LoadingIndicator },
  data() {
    return {
      users: [],
      info: {},
      error: null,
      filters: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      fetch('https://randomuser.me/api/?results=10')
        .then((res) => res.json())
        .then(({ results: users, info }) => {
          this.info = info;
          this.filters = this.buildFilters(users);
          setTimeout(() => {
            this.users = users;
          }, 1000);
        });
    },
    buildFilters(users) {
      return users.reduce(
        (filters, user) => {
          const {
            location: { city, state },
            gender,
          } = user;
          filters.city.add(city);
          filters.state.add(state);
          filters.gender.add(gender);
          return filters;
        },
        { city: new Set(), state: new Set(), gender: new Set() }
      );
    },
  },
};
</script>
