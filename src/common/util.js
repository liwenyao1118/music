import storage from 'good-storage'

const SEARCH_HISTORY = '__searchHistory__'

export const indexInList = function (list, song) {
    return list.findIndex(item => {
        return item.id == song.id
    })
}

export const unshiftArray = function (arr, val, maxLen) {
    let index = arr.findIndex(item => {
        return item == val
    })
    if (index == 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (arr.length > maxLen && maxLen) {
        arr.pop()
    }
}

export const saveSearchHistory = function (historyQuery) {
    let historyList = storage.get(SEARCH_HISTORY, [])
    unshiftArray(historyList, historyQuery, 10)
    storage.set(SEARCH_HISTORY, historyList)
    return historyList
}

export const loadSearchHistory = function () {
    return storage.get(SEARCH_HISTORY, [])
}

export const deleteSearchHistory = function (historyQuery) {
    let historyList = storage.get(SEARCH_HISTORY, [])
    let index = historyList.findIndex(item => {
        return item == historyQuery
    })
    if (index > -1) {
        historyList.splice(index, 1)
    }
    storage.set(SEARCH_HISTORY, historyList)
    return historyList
}

export const clearSearchHistory = function () {
    storage.set(SEARCH_HISTORY, [])
    return []
}