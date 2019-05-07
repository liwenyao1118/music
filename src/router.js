import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/Home.vue')
const Rank = () => import('components/rank/Rank.vue')
const Singer = () => import('components/singer/Singer.vue')
const Search = () => import('components/search/Search.vue')
const Playlist = () => import('components/playlist/Playlist.vue')
const SingerDetail = () => import('components/singer-detail/SingerDetail.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':id',
          name: 'playlist',
          component: Playlist
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [
        {
          path: ':id',
          name: 'toplist',
          component: Playlist
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'singerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          name: 'searchDetail',
          component: SingerDetail
        }
      ]
    }
  ]
})
