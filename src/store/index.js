import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName:'',
    root:false,
  },
  // 变更状态
  mutations: {  
    changeName(state,payload) {
      state.userName = payload.name;
    },
    changeRoot(state,payload) {
      state.root = payload.root;
    }
  },
  actions: {},
  modules: {}
});
