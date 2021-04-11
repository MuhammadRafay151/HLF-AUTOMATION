<template>
  <v-navigation-drawer
    app
    clipped
    :permanent="!$vuetify.breakpoint.mobile"
    :temporary="$vuetify.breakpoint.mobile"
    v-model="drawer"
    :mini-variant.sync="mini"
  >
    <v-list>
      <v-list-item class="px-2">


        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
    </v-list>

    <v-list nav dense>
      <v-list-item link to="/dockerscript">
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Docker Script</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/orgscript">
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Organization Script</v-list-item-title>
      </v-list-item>
    
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawer: false,
      mini: false,
    };
  },
  watch: {
    mini(NewVal) {
      this.$store.commit("SetMiniDrawer", NewVal);
    },
  },
};
</script>