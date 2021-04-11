<template>
  <v-app>
    <navbar v-on:mini="mini" />
    <navigation-drawer ref="nd" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/globals/Navbar.vue";
import NavigationDrawer from "./components/globals/NavigationDrawer.vue";
export default {
  name: "App",

  components: {
    NavigationDrawer,
    Navbar,
  },
  methods: {
    mini() {
     this.$refs.nd.drawer=true
    },
  },
};
</script>

