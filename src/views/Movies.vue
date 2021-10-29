<template>
  <div id="movie-app">
    <h2>Movie App</h2>
    <div class="page-description">
      Vue app using <a target="_blank" href="http://www.omdbapi.com/">OMDb API</a> to search movies
      by title. <br />Built to showcase asynchronous data loading and Vue's transitions
      <a target="_blank" href="https://github.com/jumokee/joemcbroom.dev">View on Github</a>
    </div>
    <div class="movie-search">
      <label for="searchTerm">
        Search for a movie
      </label>
      <div class="input-group">
        <input
          id="searchTerm"
          v-model="searchTerm"
          class="search-field"
          type="text"
          placeholder="Eg. The Big Lebowski"
          @keyup="triggerSearch"
          @keyup.enter="$event.target.blur()"
        />
      </div>
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

export default {
  components: { SearchError, MovieCard },
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
h2 {
  margin-top: 0;
}
.page-description {
  width: 75%;
  margin: 0 auto 20px;
  a {
    color: var(--Blue);
  }
}
.search-term {
  display: inline-block;
  position: relative;
  height: 40px;
  margin: 20px 0;
}
.highlight {
  position: relative;
}
.highlight::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.9rem;
  background-color: var(--Orange);
  top: 6px;
  left: 2px;
  z-index: -1;
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
  gap: 0.5rem;
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
