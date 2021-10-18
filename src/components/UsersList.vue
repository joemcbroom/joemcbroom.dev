<template>
  <div id="users-container">
    <div v-for="user in users" :key="user.id.value" class="user-card">
      <div>{{ user.name.first }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { users: { type: Array, required: true } },
};
</script>

<style lang="scss" scoped>
#users-container {
  display: flex;
  flex-wrap: wrap;
  .user-card {
    flex-basis: 50%;
    height: 200px;
  }
}
</style>
