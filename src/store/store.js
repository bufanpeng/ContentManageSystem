import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        textcolor: "rgba(6, 247, 114, 1)",
        bgcolor: "rgba(88, 88, 101, 1)",
        activecolor: "rgba(255, 68, 0, 1)",
        ttextcolor: "rgba(56, 176, 110, 1)",
        tbgcolor: "rgba(244, 244, 249, 1)",
        tactivecolor: "rgba(255, 68, 0, 1)",
        navlist:[],
        admin:'',
        nav_arr:[],
    },
    mutations: {
        'textcolor' : (state, data) => {
            localStorage.textcolor = data;
            state.textcolor = data;
        },
        'bgcolor' : (state, data) => {
            localStorage.bgcolor = data;
            state.bgcolor = data;
        },
        'activecolor' : (state, data) => {
            localStorage.activecolor = data;
            state.activecolor = data;
        },
        'ttextcolor' : (state, data) => {
            localStorage.ttextcolor = data;
            state.ttextcolor = data;
        },
        'tbgcolor' : (state, data) => {
            localStorage.tbgcolor = data;
            state.tbgcolor = data;
        },
        'tactivecolor' : (state, data) => {
            localStorage.tactivecolor = data;
            state.tactivecolor = data;
        },
        'navlist' : (state, data) => {
            localStorage.navlist = data;
            state.navlist = data;
        },
        'nav_arr' : (state, data) => {
            localStorage.nav_arr = data;
            state.nav_arr = data;
        },
        'admin' : (state, data) => {
            localStorage.admin = data;
            state.admin = data;
        },
        'breadListMutations' : (getters,list) =>{
          getters.breadListState=list;
          sessionStorage.setItem('breadListStorage',list);
        },
    },
    getters:{
        'breadListState' : () =>{
          return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
        }
    },
})