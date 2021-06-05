import Vue from 'vue';
import Vuex from 'vuex';
import {setCookie,getCookie,removeCookie} from '../cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      collapsed:false,
      user:getCookie(),
      menuRoutes:[],
  },
  mutations: {
      setCollapsed(state,payload){
          state.collapsed=payload;
      },
      setUser(state,payload){
          state.user=payload;
      },
      setMenuRoutes(state,payload){
        state.menuRoutes=payload;
      },
      loginOut(state){
        state.user={
            username:'',
            role:'',
            appkey:'',
            email:'',
        }
      }
  },
  actions: {
      changeCollapsed({commit},payload){
          commit('setCollapsed',payload);
      },
      changeUser({commit},payload){
        commit('setUser',payload);
       setCookie(payload);
      },
      loginOut({commit}){
          commit('loginOut');
         removeCookie();
      },
      changeMenuRoutes({commit},payload){
          commit('setMenuRoutes',payload);
      }
  },
});
