<template>
  <div>
    <img src="@/assets/404.png" />

    <br />
    <br />
    <h1 class="title mx-4">
      You will be redirected back to the previous page in 5 seconds.
    </h1>

    <div class="columns is-centered is-mobile">
      <div class="column">
        <button class="button" :to="{ name: 'home' }">Home</button>
      </div>
      <div class="column">
        <button class="button" @click="$router.back()">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {
      // Timeout data object that can be referenced to clear if user navigates away before timeout
      timeout: setTimeout(
        (router) => {
          // Navigate back to last location if possible. 2 as user's default home page may not be a blank tab
          if (window.history.length > 2) router.back();
          // Else, redirect back home
          else router.replace({ name: "home" });
        },
        5000,
        this.$router
      ),
    };
  },
  beforeDestroy() {
    // Prevent the timeout from still routing to home if user already navigated away themselves
    clearTimeout(this.timeout);
  },
};
</script>
