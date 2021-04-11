import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    MiniDrawer: true,
  },
  mutations: {
    SetMiniDrawer(state, value) {
      state.MiniDrawer = value
    },
    ResetState() {
      //for signing out from client side.
    }
  },
  actions: {},
  modules: {
   
  }
});
