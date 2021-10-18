<template>
  <div id="users">
    <div v-if="Object.keys(info).length">Results: {{ info.results }}</div>
    <FiltersList v-if="Object.keys(filters).length" :filters="filters" />
    <UsersList v-if="users.length" :users="users" />
    <search-error v-if="error" :error="error" class="highlight" />
  </div>
</template>

<script>
import UsersList from '../components/UsersList';
import FiltersList from '../components/FiltersList';
export default {
  components: { UsersList, FiltersList },
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
          this.users = users;
          this.info = info;
          this.filters = this.buildFilters(users);
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

<style></style>
