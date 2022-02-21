import Vue from 'vue';

export const store = Vue.observable({
  newsList: [],
  searchTerm: '',
});

export const mutations = {
  setNewsList(newsList) {
    store.newsList = newsList;
  },
  setSearchTerm(searchTerm) {
    store.searchTerm = searchTerm;
  },
};
