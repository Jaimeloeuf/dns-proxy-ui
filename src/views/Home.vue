<template>
  <div class="home">
    <button class="button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    async logout() {
      // Only load logout controller when needed and call its default export function immediately
      (await import("@/controllers/logout.js")).default();
    },
  },
};
</script>
