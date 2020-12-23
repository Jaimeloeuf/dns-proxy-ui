<template>
  <div>
    Custom List of domains to proxy
    <br />
    <br />

    <input type="text" v-model="newDomain" @keypress.enter="addNewItem" />

    <br />
    <br />

    <div class="content">
      <ol type="1">
        <li v-for="(domain, i) in list" :key="i">
          {{ domain }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// Custom List of domains to proxy

export default {
  name: "CustomList",

  data() {
    return {
      newDomain: "",

      list: [],

      // Regex pattern to test for valid domain names
      pattern: new RegExp(
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g
      ),
    };
  },

  methods: {
    addNewItem() {
      /* Basic checks */
      if (!this.newDomain) return;
      if (!this.pattern.test(this.newDomain))
        if (!confirm("Invalid domain name, use anyway?")) return;

      // Save variable to vuex store, and trigger background job to update server
      this.list.push(this.newDomain);

      // Reset the variable after saving it
      this.newDomain = "";
    },
  },
};
</script>
