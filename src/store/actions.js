import * as types from './mutation-types'
import {indexInList,saveSearchHistory,loadSearchHistory,deleteSearchHistory,clearSearchHistory} from 'common/util.js'
// 判断该歌曲是否已经存在于播放列表中

export const selectPlay = ({ commit, state }, { list, index }) => {
    if (!state.playlist.length) {
        commit(types.SET_FULLSCREEN, true)
    }
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
}

export const clearPlaylist = ({ commit, state }) => {
    if (state.playlist.length) {
        commit(types.SET_PLAYING, false)
        commit(types.SET_CURRENT_INDEX,-1)
        commit(types.SET_PLAYLIST,[])    
    }
}

export const insertSong = ({commit,state},song) =>{
    let playlist = state.playlist.slice()
    let currentIndex = state.currentIndex
    let currentSong = playlist[currentIndex]
    // 判断插入的歌曲是否已经存在于播放列表中，并返回索引
    let index = indexInList(playlist,song)
    // 将歌曲插入列表
    playlist.splice(currentIndex+1,0,song)
    if(index > -1){
        // 档歌曲存在于播放列表，如果歌曲索引在当前播放歌曲索引之前
        if(index < currentIndex){
            playlist.splice(index,1)
            currentIndex--
        }else{
            playlist.splice(index+1,1)
        }
    }
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_CURRENT_INDEX,currentIndex+1)
    commit(types.SET_PLAYING,true)
}

export const saveSearch = ({commit},historyQuery) =>{
    commit(types.SET_SEARCH_HISTORY,saveSearchHistory(historyQuery))
}
export const loadSearch = ({commit}) =>{
    commit(types.SET_SEARCH_HISTORY,loadSearchHistory())
}
export const deleteSearch = ({commit},historyQuery) =>{
    commit(types.SET_SEARCH_HISTORY,deleteSearchHistory(historyQuery))
}
export const clearSearch = ({commit}) =>{
    commit(types.SET_SEARCH_HISTORY,clearSearchHistory())
}
