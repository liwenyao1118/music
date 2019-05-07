import * as types from './mutation-types.js'

const mutations = {
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex = index
    },
    [types.SET_PLAYING](state,flag){
        state.playing = flag
    },
    [types.SET_FULLSCREEN](state,flag){
        state.fullscreen = flag
    },
    [types.SET_SHOW_MINI_LIST](state,flag){
        state.showMiniList = flag
    },
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    [types.SET_SEARCH_HISTORY](state,historyQuery){
        state.searchHistory = historyQuery
    }
}
export default mutations