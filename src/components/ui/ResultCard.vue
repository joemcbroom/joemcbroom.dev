<template>
  <a class="card" href="#!">
    <div class="front" :style="{ backgroundImage: `url(${frontImage})` }">
      <slot name="front" />
    </div>
    <div class="back">
      <slot name="back" />
    </div>
  </a>
</template>

<script>
export default {
  props: {
    frontImage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
$primary: hsl(222, 80%, 50%);
$primary-light: hsl(222, 50%, 95%);

$secondary: hsl(350, 80%, 50%);

$red: hsl(10, 80%, 50%);
$orange: hsl(50, 80%, 50%);

.card {
  color: inherit;
  cursor: pointer;
  width: 100%;
  height: 200px;
  perspective: 1000px;
  margin: 1rem;
  position: relative;
}

.front,
.back {
  display: flex;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
  border: 1px solid var(--Dark-Blue);
}

.front {
  background-size: cover;
  overflow: hidden;

  .card:hover & {
    transform: rotateY(180deg);
  }
  .card:nth-child(even):hover & {
    transform: rotateY(-180deg);
  }
}

.back {
  background: #fff;
  transform: rotateY(-180deg);

  .card:hover & {
    transform: rotateY(0deg);
  }

  .card:nth-child(even) & {
    transform: rotateY(180deg);
  }

  .card:nth-child(even):hover & {
    transform: rotateY(0deg);
  }
}
</style>
