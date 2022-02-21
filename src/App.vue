<template>
  <div id="app">
    <div id="nav">
      <div v-if="$route.name === 'CountingGame'" class="back-arrow">
        <router-link to="/"><div class="caret"></div></router-link>
      </div>
      <div v-else>
        <div class="name">Joe McBroom</div>
        <router-link to="/">Home</router-link>
        <router-link to="/movies">Movie App</router-link>
        <router-link to="/counting-game">Counting Game</router-link>
      </div>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Proza+Libre&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
:root {
  --Red: #ef476fff;
  --Orange: #ffd166ff;
  --Green: #06d6a0ff;
  --Blue: #118ab2ff;
  --Dark-Blue: #073b4cff;
}
#app {
  font-family: 'Roboto Slab', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--Dark-Blue);
  max-width: 1000px;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--Blue);
  text-shadow: 0px 1px 1px var(--Dark-Blue);
  padding-bottom: 5px;
}
#nav a,
h1,
h2,
h3,
h4,
h5 {
  font-family: 'Proza Libre', sans-serif;
}

#nav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;
  top: 70px;
  left: 70px;
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.body {
  padding-left: 230px;
  padding-top: 70px;
}

#nav a {
  font-weight: bold;
  color: var(--Blue);
  margin-bottom: 4px;
  text-decoration: none;
}

.caret {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.caret:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-right: 13px solid var(--Dark-Blue);
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
}

.caret:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 5px;
  border-right: 8px solid #fff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

@media screen and (max-width: 900px) {
  #nav {
    position: static;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }
  .name {
    position: absolute;
    left: 30px;
    padding: 0;
  }
  #nav a {
    padding-left: 10px;
    margin-right: 10px;
  }
  #nav a:last-of-type {
    border-left: 1px solid var(--Blue);
  }
  .body {
    padding: 0 20px;
  }
}
@media screen and (max-width: 700px) {
  .name {
    position: static;
    padding-bottom: 10px;
  }
  #nav {
    flex-direction: column;
  }
  #nav a:last-of-type {
    border: none;
  }
}

#nav a.router-link-exact-active {
  color: var(--Red);
}
</style>
