<template>
  <div id="movie-app">
    <h2>Movie App</h2>
    <div class="page-description">
      Vue app using <a target="_blank" href="http://www.omdbapi.com/">OMDb API</a> to search movies
      by title. <br />Built to showcase asynchronous data loading and Vue's transitions
      <a target="_blank" href="https://github.com/jumokee/joemcbroom.dev">View on Github</a>
    </div>
    <div class="movie-search">
      <span>
        Search for a movie
      </span>
      <search-bar :on-submit="triggerSearch" :search-term.sync="searchTerm" />
    </div>
    <div v-if="!searchTerm && !error" class="search-term highlight">Please Enter a Search Term</div>
    <search-error v-if="error" :error="error" class="highlight" />
    <div v-if="!error && Object.keys(movieList).length" class="search-term highlight">
      Results for: {{ searchTerm }}
    </div>

    <transition-group name="list" tag="div" class="results-list">
      <movie-card
        v-for="(movie, i) in movieList"
        :key="movie.imdbID"
        :movie="movie"
        @moveToFront="moveToFront(i)"
        @hideDetails="hideDetails"
      />
    </transition-group>
  </div>
</template>

<script>
import SearchError from '../components/SearchError';
import MovieCard from '../components/MovieCard';
import SearchBar from '@/components/SearchBar';

export default {
  components: { SearchError, MovieCard, SearchBar },
  data() {
    return {
      OMDB_API_URL: `https://www.omdbapi.com/?apikey=${process.env.VUE_APP_API_KEY}&`,
      isLoading: false,
      movieList: [],
      searchTerm: '',
      error: '',
      tempIndex: 0,
    };
  },
  methods: {
    triggerSearch() {
      this.isLoading = true;
      fetch(this.OMDB_API_URL + 's=' + this.searchTerm)
        .then((res) => {
          if (!this.searchTerm) throw new Error('Please Enter a Search Term');
          return res.json();
        })
        .then((movies) => {
          if (movies.Error) throw new Error(movies.Error);
          this.movieList = movies.Search.filter(
            (movie) => movie.Poster != 'N/A' && movie.Type == 'movie'
          );
          this.error = null;
          this.isLoading = false;
        })
        .catch((err) => {
          this.movieList = [];
          this.error = err.message;
          this.isLoading = false;
        });
    },
    moveToFront(i) {
      this.tempIndex = i;
      this.movieList.unshift(this.movieList.splice(i, 1)[0]);
    },
    hideDetails() {
      let el = this.movieList.shift();
      this.movieList.splice(this.tempIndex, 0, el);
    },
  },
};
</script>

<style lang="scss" scoped>
#movie-app {
  border: 1px solid var(--Dark-Blue);
  box-shadow: inset 1px 1px 2px var(--Dark-Blue);
  padding: 20px;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.page-description {
  width: 75%;
  margin: 0 auto 20px;
  a {
    color: var(--Blue);
  }
}

.movie-search {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
}
.input-group {
  display: flex;
  width: 100%;
  justify-content: center;
}
.results-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
