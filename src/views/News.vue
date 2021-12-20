<template>
  <div id="news-app">
    <h2>News App</h2>
    <div class="news-search">
      <span>
        Search for a News Topic
      </span>
      <search-bar :on-submit="getNews" :search-term.sync="searchTerm" />
    </div>
    <div v-if="!searchTerm && !error" class="search-term highlight">Please Enter a Search Term</div>
    <search-error v-if="error" :error="error" class="highlight" />
    <div v-if="!error && Object.keys(newsList).length" class="search-term highlight">
      Results for: {{ searchTerm }}
    </div>

    <transition-group name="list" tag="div" class="results-list">
      <result-card
        v-for="(news, index) in newsList"
        :key="index"
        :front-image="news.urlToImage ? news.urlToImage : FALLBACK_IMAGE"
        class="news-item"
      >
        >
        <template v-slot:front>
          <div class="front-content">
            <h3>{{ news.title }}</h3>
          </div>
        </template>

        <template v-slot:back>
          <div class="back-content">
            <p>{{ news.description }}</p>
            <a :href="news.url" target="_blank">Read More...</a>
          </div>
        </template>
      </result-card>
    </transition-group>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService';
import SearchError from '@/components/SearchError';
import SearchBar from '@/components/SearchBar';
import ResultCard from '@/components/ui/ResultCard';

export default {
  components: { SearchError, SearchBar, ResultCard },
  data() {
    return {
      isLoading: false,
      newsService: {},
      searchTerm: '',
      endpoint: 'everything',
      error: '',
      newsList: [],
      totalResults: 0,
      activeResultId: -1,
      FALLBACK_IMAGE: require('@/assets/img/article-default.jpeg'),
    };
  },
  async created() {
    this.newsService = new NewsService();
  },
  methods: {
    async getNews() {
      this.isLoading = true;
      try {
        const { articles, total } = await this.newsService.getArticles(this.searchTerm);
        this.newsList = articles;
        this.total = total;
        this.error = '';
      } catch ({ message }) {
        if (message === 'parametersMissing') {
          this.error = 'Please enter a search term';
        } else {
          this.error = message;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
#news-app {
  border: 1px solid var(--Dark-Blue);
  box-shadow: inset 1px 1px 2px var(--Dark-Blue);
  padding: 20px;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    height: 1.5rem;
    border: 1px solid black;
    border-right: none;
  }
  .search-button {
    object-fit: cover;
    border: 1px solid black;
    border-left: none;
    height: 1.5rem;
    width: 1.5rem;
    img {
      object-fit: contain;
      width: 100%;
      background-color: var(--Blue);
      padding: 2px;
    }
  }
}
.results-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // align-items: stretch;
}
.news-item {
  width: 25%;
  max-height: 250px;
}
.front-content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  h3 {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
  }
}
.back-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  p {
    font-size: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  a {
    font-size: 0.9rem;
    color: var(--Blue);
    text-decoration: none;
    margin-top: auto;
  }
}
</style>
