<template>
  <div class="movie-details">
    <span class="close-button" @click="$emit('close')">✖️</span>
    <img class="image" :src="details.Poster" :alt="`Poster for ${details.Title}`" />
    <div class="content">
      <h3 class="title">{{ details.Title }}</h3>
      <div class="plot">{{ details.Plot }}</div>
      <div class="director">
        <span class="title">Directed by: </span>
        <span class="value">{{ details.Director }}</span>
      </div>
      <div class="ratings">
        <div v-for="rating in details.Ratings" :key="rating.Source" class="rating">
          <span class="source">{{ rating.Source }}</span>
          <span class="value">
            <span>{{ rating.Value }}</span>
            <div v-if="rating.Source == 'Rotten Tomatoes'">
              <fresh-tomato v-if="isFresh(rating)" class="icon" />
              <rotten-tomato v-else class="icon" />
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FreshTomato from './FreshTomato';
import RottenTomato from './RottenTomato';
export default {
  components: { FreshTomato, RottenTomato },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    isFresh: ({ Value }) => parseFloat(Value) >= 60,
  },
};
</script>

<style lang="scss">
.movie-details {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .close-button {
    position: absolute;
    top: 2px;
    right: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      font-size: 1.5rem;
      text-shadow: 1px 1px 1px 2px var(--Dark-Blue);
    }
  }
  img.image {
    top: -7px;
    position: absolute;
    height: 110%;
    width: 25%;
    object-fit: contain;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 25%;
    .title {
      // font-family: ;
      font-weight: bold;
    }
    .plot {
      font-size: 0.8rem;
    }
    .director {
      display: flex;
      justify-content: center;
      span {
        padding-right: 10px;
      }
    }
    .ratings {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--Blue);
      .rating {
        padding: 0 10px;
        font-weight: bold;
        .value {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon {
          padding-left: 3px;
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    img.image {
      display: none;
    }
    .content {
      padding-left: 0px;
    }
  }
}
</style>
