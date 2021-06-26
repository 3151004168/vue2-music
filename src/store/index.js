import Vue from "vue";
import Vuex from "vuex";
// 导入持久化插件
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/mutations";
import state from "@/store/state";
import *as getters from "@/store/getters";
import actions from "@/store/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  // 数据持久化
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "store",
      render(state) {
        return { ...state };
      },
    }),
  ],
});
