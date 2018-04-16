import {
    BREADLISTMUTATIONS,
}  from './mutation-types.js'
export default {
    'BREADLISTMUTATIONS' : () => {
            return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
        },
}