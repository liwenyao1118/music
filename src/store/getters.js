import { stat } from "fs";

export const disc = state => state.disc

export const playlist = state => state.playlist

export const currentIndex = state => state.currentIndex

export const playing = state => state.playing

export const fullscreen = state => state.fullscreen

export const showMiniList = state => state.showMiniList

export const singer = state => state.singer

export const searchHistory = state => state.searchHistory

export const currentSong = state => {
    return state.playlist[state.currentIndex] || {}
}