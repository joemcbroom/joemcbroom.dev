<template>
  <div id="counting-game">
    <div v-if="result" class="result" :class="{ correct: isCorrect }">
      <span class="animate__animated animate__tada">{{ result }}</span>
      <img
        v-if="isCorrect"
        class="animate__animated animate__pulse animate__infinite"
        src="../assets/img/arrows.png"
        @click="randomizeGameBoard()"
      />
    </div>
    <div class="counting-game-board">
      <div v-for="(number, i) in randomNumber" :key="i" class="emoji">
        {{ emojis[i] }}
      </div>
    </div>
    <div class="answers">
      <div
        v-for="number in 12"
        :key="number"
        class="answer"
        :class="{ 'has-result': result }"
        @click="guessNumber(number)"
      >
        <span class="answer-number">
          {{ number }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const EMOJIS = [
  '🐈',
  '🐕',
  '🐇',
  '🐁',
  '🐘',
  '🐥',
  '🐸',
  '🐍',
  '🐢',
  '🐛',
  '🐝',
  '🐌',
  '🐙',
  '🐚',
  '🐞',
  '🐜',
  '🐟',
  '🦖',
  '🦕',
  '😊',
  '😍',
  '😘',
  '❤️'
];
export default {
  name: 'CountingGame',
  data() {
    return {
      randomNumber: null,
      emojis: [],
      result: 'hi',
      isCorrect: false
    };
  },
  mounted() {
    this.randomizeGameBoard();
  },
  methods: {
    getNRandomEmojis(n) {
      const result = new Set();
      do {
        const randomIndex = Math.floor(Math.random() * EMOJIS.length);
        const randomEmoji = EMOJIS[randomIndex];
        result.add(randomEmoji);
      } while (result.size < n);
      return Array.from(result);
    },
    getRandomNumberFromOneTo(max) {
      return Math.floor(Math.random() * max) + 1;
    },
    randomizeGameBoard() {
      this.result = '';
      this.isCorrect = false;
      this.randomNumber = this.getRandomNumberFromOneTo(12);
      this.emojis = this.getNRandomEmojis(this.randomNumber);
    },
    guessNumber(number) {
      if (number === this.randomNumber) {
        this.result = 'Correct!';
        this.isCorrect = true;
      } else {
        this.result = 'Try Again!';
        this.isCorrect = false;
        setTimeout(() => {
          this.result = '';
        }, 1500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#counting-game {
  height: 55vh;
  width: 100vw;
  position: absolute;
  top: 51px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 3rem;
}

.result {
  position: absolute;
  top: 0;
  font-size: 2rem;
  width: 100%;
  text-align: center;
  color: var(--Red);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    border: 2px solid var(--Red);
  }
  img {
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
    outline: 1px solid var(--Green);
    border-radius: 50%;
    padding: 0.5rem;
  }

  &.correct {
    color: var(--Green);
    span {
      border: 2px solid var(--Green);
      margin-left: auto;
    }
  }
}
.counting-game-board {
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  .emoji {
    font-size: 5rem;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }
}
.answers {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  .answer {
    width: calc(100% / 6);
    aspect-ratio: 1/1;
    display: grid;
    place-content: center;
    border: 2px solid var(--Dark-Blue);
    box-sizing: border-box;
    background: var(--Blue);
    color: white;
    font-size: 2rem;
    &.has-result {
      pointer-events: none;
      background: lightgray;
    }
  }
}
</style>
