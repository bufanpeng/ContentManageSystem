import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
const state = {
    textcolor: "rgba(6, 247, 114, 1)",
    bgcolor: 'rgba(88, 88, 101, 1)',
    activecolor: "rgba(255, 68, 0, 1)",
    ttextcolor: "rgba(56, 176, 110, 1)",
    tbgcolor: "rgba(244, 244, 249, 1)",
    tactivecolor: "rgba(255, 68, 0, 1)",
    navlist:[],
    admin:'',
    nav_arr:[],
}
console.log(state)
console.log( localStorage)
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})