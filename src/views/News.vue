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
    <div v-for="(news, index) in newsList" :key="index" class="news-item">
      <div class="news-item-title">
        <a :href="news.url" target="_blank">
          {{ news.title }}
        </a>
      </div>
      <div class="news-item-description">
        {{ news.description }}
      </div>
      <div class="news-item-date">
        {{ news.date }}
      </div>
    </div>
  </div>
</template>

<script>
import NewsService from '@/services/NewsService';
import SearchError from '@/components/SearchError';
import SearchBar from '@/components/SearchBar';
export default {
  components: { SearchError, SearchBar },
  data() {
    return {
      isLoading: false,
      newsService: {},
      searchTerm: '',
      endpoint: 'everything',
      error: '',
      newsList: [],
      totalResults: 0,
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
</style>
