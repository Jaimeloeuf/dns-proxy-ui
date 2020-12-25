<template>
  <div id="login">
    <div class="field">
      <div class="control">
        <input
          v-autofocus
          class="input is-large"
          type="text"
          v-model="email"
          placeholder="Email"
          @keypress.enter="login"
          required
        />
      </div>

      <div class="control">
        <input
          class="input is-large"
          type="password"
          v-model="password"
          placeholder="Password"
          @keypress.enter="login"
          required
        />
      </div>
    </div>

    <br />

    <button class="button" @click="login">
      Login
    </button>

    <br />
    <br />

    <router-link :to="{ name: 'signup' }">
      Dont have an account? Signup now!
    </router-link>
  </div>
</template>

<script>
/**
 * @Todo - Add in browser's "required" attribute checker for input.
 */

import firebase from "firebase/app";
import "firebase/auth";

// Function to map and return a given err.code to a user friendly message
function error_msg(err) {
  switch (err.code) {
    case "auth/wrong-password":
      return "Invalid password or email!";
    case "auth/network-request-failed":
      return "Oops, check your internet connection!";
    case "auth/user-not-found":
      return "Sorry but you dont have an account with us, please signup first!";
    case "email/no-verify":
      return "Email not verified. Please verify before trying again";
    default:
      return "Something went wrong! Please try again.";
  }
}

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      /*
        @todo Disable the login/signup up buttons or some code here to prevent this from being called more then once

        To prevent:
        - double call to login
        - double navigation to the same route
      */

      try {
        // eslint-disable-next-line no-unused-vars
        const usr = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        if (!firebase.auth().currentUser.emailVerified) {
          // Throw new error with pre-defined code to get the right error_msg
          const error = new Error();
          error.code = "email/no-verify";
          throw error;
        }

        // Await for async dispatch to ensure app only starts after user info is available.
        // await this.$store.dispatch("getUserDetails", this.email);
        // this.$store.dispatch("init");

        // Route to the user's home page, after login
        this.$router.replace({ name: "home" });
      } catch (error) {
        // Only resend verification email if needed, but both will end early after signout without continuing to normal error handling
        if (error.code === "email/no-verify") {
          if (
            confirm(
              "Please verify your email first! Resend verification email?"
            )
          )
            firebase.auth().currentUser.sendEmailVerification();
          return await firebase.auth().signOut();
        }

        // If there is an error but user is somehow logged in, sign user out to try again
        if (firebase.auth().currentUser) await firebase.auth().signOut();

        alert("Authentication Failed " + error_msg(error));
      }
    },
  },
};
</script>

<style scoped>
input {
  margin: 0.4em 0;
  padding: 1em;

  width: calc(100% - 6em);
  max-width: 30em;

  border: 1px solid grey;
  border-radius: 0.4em;
}
</style>
