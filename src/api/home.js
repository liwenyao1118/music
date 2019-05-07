import axios from 'axios'

let baseUrl = process.env.NODE_ENV == "development" ? "/api" : ""

export const sliderData = function () {
    return axios.get(baseUrl + '/banner')
}
export const recommendListData = function () {
    return axios.get(baseUrl + '/personalized')
}

export const newListData = function () {
    return axios.get(baseUrl + '/top/playlist?limit=12&order=new')
}

export const hotListData = function () {
    return axios.get(baseUrl + '/top/playlist?limit=12&order=hot')
}

export const isOk = function (id) {
    return axios.get(baseUrl + '/check/music', {
        params: {
            id
        }
    })
}

export const discData = function (id) {
    return axios.get(baseUrl + '/playlist/detail', {
        params: {
            id
        }
    })
}

export const songDetail = function (ids) {
    return axios.get(baseUrl + '/song/detail', {
        params: {
            ids
        }
    })
}

export const songUrl = function (id) {
    return axios.get(baseUrl + '/song/url', {
        params: {
            id
        }
    })
}

export const lyric = function (id) {
    return axios.get(baseUrl + '/lyric', {
        params: {
            id
        }
    })
}

export const singerData = function(){
    return axios.get(baseUrl + '/top/artists?limit=100')
}

export const singerSongs = function(id){
    return axios.get(baseUrl + '/artists',{
        params: {
            id
        }
    })
}

export const searchData = function(keywords,offset){
    return axios.get(baseUrl + '/search',{
        params: {
            limit:30,
            keywords,
            offset
        }
    })
}

export const suggestData = function(keywords){
    return axios.get(baseUrl + '/search/suggest',{
        params: {
            keywords
        }
    })
}

export const searchHotData = function(){
    return axios.get(baseUrl + '/search/hot')
}

export const toplistData = function(){
    return axios.get(baseUrl + '/toplist')
}

export const officialListData = function(idx){
    return axios.get(baseUrl + '/top/list',{
        params: {
            idx
        }
    })
}