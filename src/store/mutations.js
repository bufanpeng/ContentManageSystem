import {
    TEXTCOLOR,
    BGCOLOR,
    ACTIVECOLOR,
    TTEXTCOLOR,
    TBGCOLOR,
    TACTIVECOLOR,
    NAVLIST,
    NAV_ARR,
    ADMIN,
    BREADLISTMUTATIONS,
}  from './mutation-types.js'

export default {
    // 注释
    [TEXTCOLOR](state, textcolor) {
        console.log(state)
        window.localStorage.textcolor = JSON.stringify(textcolor);
        state.textcolor = textcolor;
    },
    // 
    [BGCOLOR](state, bgcolor) {
        console.log(state)
        window.localStorage.bgcolor = JSON.stringify(bgcolor);
        state.bgcolor = bgcolor;
    },
    // 
    [ACTIVECOLOR](state, activecolor) {
        console.log(state)
        window.localStorage.activecolor = JSON.stringify(activecolor);
        state.activecolor = activecolor;
    },
    // 
    [TTEXTCOLOR](state, ttextcolor) {
        window.localStorage.ttextcolor = JSON.stringify(ttextcolor);
        state.ttextcolor = ttextcolor;
    },
    // 
    [TBGCOLOR](state, tbgcolor) {
        window.localStorage.tbgcolor = JSON.stringify(tbgcolor);
        state.tbgcolor = tbgcolor;
    },

    // 
    [TACTIVECOLOR](state, tactivecolor) {
        window.localStorage.tactivecolor = JSON.stringify(tactivecolor);
        state.tactivecolor = tactivecolor;
    },
    // 
    [NAVLIST](state, data) {
        console.log(data)
        window.localStorage.navlist = data;
        state.navlist = data;
    },
    // 
    [NAV_ARR](state, data) {
        window.localStorage.nav_arr = data;
        state.nav_arr = data;
    },
    // 
    [ADMIN](state, data) {
        window.localStorage.admin = data;
        state.admin = data;
    },
    // 
    [BREADLISTMUTATIONS](state, data) {
        console.log(data)
        sessionStorage.setItem('breadListStorage',data);
        state.breadListMutations = data;
    },
}