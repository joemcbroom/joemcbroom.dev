<template>
  <div class="weather">
    <h1>Check your local forecast</h1>
    <form @submit.prevent="triggerSearch">
      <input
        v-model="searchTerm"
        type="text"
        name="zipcode"
        placeholder="Enter Zipcode"
        autocomplete="off"
        @keyup="triggerSearch"
      />
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
        <img :src="require(`@/assets/img/weather/${day.weather[0].icon}.png`)" />
        <div class="date">{{ day.formattedDate }}</div>
        <div>{{ day.weather[0].main }}</div>
        <div class="mt-auto">{{ day.main.temp }}°F</div>
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
      searchTerm: '',
      error: '',
      days: [],
      units: 'imperial',
    };
  },
  computed: {
    OPENWEATHER_API_URL_FORECAST() {
      return `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPEN_WEATHER_API_KEY}&units=${this.units}&zip=${this.searchTerm}`;
    },
  },
  methods: {
    triggerSearch() {
      try {
        if (this.searchTerm.length < 5) {
          throw new Error('Please Enter a Valid Zipcode');
        } else {
          this.isLoading = true;
          fetch(this.OPENWEATHER_API_URL_FORECAST)
            .then((res) => {
              return res.json();
            })
            .then((forecast) => {
              const days = forecast.list.reduce((acc, item) => {
                if (item.dt_txt.includes('18:00:00')) {
                  item.formattedDate = dayjs(item.dt_txt).format('dddd | MMM D');
                  acc.push(item);
                }
                return acc;
              }, []);
              this.days = days;
              this.error = '';
              this.isLoading = false;
            })
            .catch((err) => {
              throw new Error('Please Enter a Valid Zipcode');
            });
        }
      } catch (err) {
        this.days = [];
        this.error = err.message;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mt-auto {
  margin-top: auto;
}
h1 {
  font-size: 1.5rem;
}
.weather-cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 25%;
    min-height: 8rem;
    border: 1px solid darkgrey;
    box-shadow: 1px 1px 2px #222;
    margin: auto;
    padding: 1rem 0 0.25rem;
    .date {
      font-size: 0.75rem;
      margin: 0.25rem 0;
    }
    img {
      max-width: 2.5rem;
      transition: all 0.5s ease-in-out;
      filter: drop-shadow(1px 1px 1px #222);
    }
    &:hover {
      img {
        transform: scale(1.1);
        // -webkit-filter: drop-shadow(2px 2px 2px #222);
        filter: drop-shadow(1px 1px 5px #222);
      }
    }
  }
}
</style>
