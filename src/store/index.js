import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    root: false,
    themeColor: {
      background: "#ccc",
      color: ""
    }
  },
  // 变更状态
  mutations: {
    changeName(state, payload) {
      state.userName = payload.name;
    },
    changeRoot(state, payload) {
      state.root = payload.root;
    },
    changeThemeColor(state, payload) {
      state.themeColor.background = payload.background;
      state.themeColor.color = payload.color;
    }
  },
  actions: {},
  modules: {}
});
