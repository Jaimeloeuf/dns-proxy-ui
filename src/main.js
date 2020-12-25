import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Register global custom directive called `v-autofocus`
import autofocus from "./directives/autofocus";
Vue.directive("autofocus", autofocus);

import firebase from "firebase/app";
import "firebase/auth";

// firebaseConfig auto generated in project settings
firebase.initializeApp({
  apiKey: "AIzaSyAr5DhM52eu4Z1Ul2_9AzonR_zN2upmzJI",
  authDomain: "dns-proxy-ui.firebaseapp.com",
  projectId: "dns-proxy-ui",
  appId: "1:701855010132:web:0acf68baf09c47ab9f0cc1",
});

Vue.config.productionTip = false;

// App variable to store reference to the vue App object
let app;

/**
 * @notice Why new vue is wrapped in this.
 * Wait for firebase to finish initialization before creating the app.
 * So that the router navigation wont break due to invalid auth
 */
const unsubscribe = firebase.auth().onAuthStateChanged(() => {
  // Prevent app initialization from running more than once
  if (!app)
    // Create new vue app
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");

  // Use the firebase.Unsubscribe function returned from adding auth state change listner to unsubscribe
  // To prevent new Vue from running more than once
  unsubscribe();
});
