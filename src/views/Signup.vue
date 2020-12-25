<template>
  <div id="signup">
    <input
      v-autofocus
      type="text"
      v-model="name"
      placeholder="Name"
      @keypress.enter="signUp"
      required
    />
    <br />
    <input
      type="text"
      v-model="email"
      placeholder="Email"
      @keypress.enter="signUp"
      required
    />
    <br />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      @keypress.enter="signUp"
      required
    />

    <div style="font-size: 0.7em">
      *By creating an account, you agree to the
      <a href="https://terms.classexpress.com" target="_blank">
        terms and conditions
      </a>
    </div>

    <button class="button" @click="signUp">
      Sign Up
    </button>

    <br />
    <br />

    <div style="opacity: 0.8">
      Already have an account?
    </div>
    <button class="button" @click="$router.push({ name: 'login' })">
      Login now!
    </button>
  </div>
</template>

<script>
/**
 * @Todo - Add in browser's "required" attribute checker for input.
 */

import firebase from "firebase/app";
import "firebase/auth";
// import api from "../store/utils/fetch";
const api = fetch;

// Function to map and return a given err.code to a user friendly message
function error_msg(err) {
  switch (err.code) {
    case "auth/wrong-password":
      return "Invalid password or email.";
    case "auth/email-already-in-use":
      return "Email already in use, please log in instead. Reset password if you have forgotten it.";
    case "auth/network-request-failed":
      return "Oops, please check your internet connection!";
    default:
      return "Ugh, something went wrong! Try again please?";
  }
}

export default {
  name: "signUp",
  data() {
    return {
      verifyEmailDialog: false,

      email: "",
      name: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      try {
        // Make lowercase, refer to notes & faq on why this is lowercase.
        // tl;dr Firebase auth like google ignores the email RFC and forces email case-insensitivity
        this.email = this.email.toLowerCase();

        // Create new user and send them a email verification email
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        // Send user email verification email right await after account creation
        firebase.auth().currentUser.sendEmailVerification();

        const newUser = {
          user: {
            email: this.email,
            name: this.name,
            lastName: this.lastName,

            // @todo Hardcoded values, to be removed
            countryCode: "SG",
            cityCode: "SG",
            timezone: "SGT",
            currency: "SGD",
          },
        };

        // This needs to be before signout, as we need the token to create a new user.
        // await to prevent signout from executing before post which will delete the JWT and make this call rejected with a 401
        // const res = await api.post("/user/new", newUser);
        // @todo add api Error here?

        // Sign user out
        firebase.auth().signOut();

        // Show dialog to inform user to verify email and redirect to login view
        alert("Please verify your email before logging in!");
        this.$router.replace({ name: "login" });
      } catch (error) {
        /**
         * If there is an error before user is signed out, sign user out to try again
         * @notice This is not ideal as if the store dispatch / API failed then user needs to login directly instead of retry.
         * @todo To optimize this.
         */
        if (firebase.auth().currentUser) firebase.auth().signOut();

        // @todo Remove before production
        console.error(error);

        alert("Signup Failed" + error_msg(error));
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

  border: 1px solid turquoise;
  border-radius: 0.4em;
}
</style>
