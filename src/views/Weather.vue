<template>
  <div class="weather">
    <h1>Check your local forecast</h1>
    <form @submit.prevent="triggerSearch">
      <input v-model="searchTerm" type="number" name="zipcode" placeholder="Enter Zipcode" />
    </form>
    <div v-if="!searchTerm && !error" class="search-term highlight">
      Please Enter a Search Term
    </div>
    <search-error v-if="error" :error="error" class="highlight" />
    <div v-if="!error && Object.keys(days).length" class="search-term highlight">
      Results for: {{ searchTerm }}
    </div>
    <div class="weather-cards">
      <div v-for="day in days" :key="day.dt" class="card">
        <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`" />
        <div>{{ day.main.temp }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchError from '../components/SearchError';
import dayjs from 'dayjs';
export default {
  components: { SearchError },
  data() {
    return {
      OPENWEATHER_API_URL_FORECAST: `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`,
      searchTerm: '',
      error: '',
      days: [],
    };
  },
  methods: {
    triggerSearch() {
      this.isLoading = true;
      fetch(`${this.OPENWEATHER_API_URL_FORECAST}&zip=${this.searchTerm}`)
        .then((res) => {
          return res.json();
        })
        .then((forecast) => {
          const days = forecast.list.reduce((acc, item) => {
            if (item.dt_txt.includes('18:00:00')) {
              acc.push(item);
            }
            return acc;
          }, []);
          this.days = days;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    min-height: 8rem;
    border: 1px solid darkgrey;
    margin: 0 1rem;
  }
}
</style>
