import {loadSearchHistory} from 'common/util.js'
const state = {
    singer:{},
    disc: {},
    playlist:[],
    currentIndex: -1,
    playing:false,
    fullscreen: false,
    showMiniList:false,
    searchHistory: loadSearchHistory()
}
export default state;