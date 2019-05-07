<template>
  <div class="singer">
    <singer-list :singerList="singerList" @selectItem="selectItem"></singer-list>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
const HOT_COUNT = 10;
const HOT_TITLE = "热门";
import SingerList from "base/singer-list/SingerList.vue";
import py from "pinyin";
import { singerData } from "api/home.js";
import {mapMutations } from 'vuex';
export default {
  data() {
    return {
      singerList: []
    };
  },
  methods: {
     
    selectItem(item) {
      this.$router.push({
        name: "singerDetail",
        params: { id: item.id }
      });
      this.setSinger(item)
    },
    getSingerData() {
      singerData().then(res => {
        let arr = res.data.artists.map(item => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl
          };
        });
        arr = arr.map(item => {
          item.py = py(item.name[0], {
            style: py.STYLE_FIRST_LETTER
          })[0][0];
          return item;
        });
        let hot = [
          {
            title: HOT_TITLE,
            arr: arr.slice(0, HOT_COUNT)
          }
        ];
        let ret = {};
        arr.forEach(item => {
          if (!item.py.match(/[a-z]/g)) {
            return;
          }
          if (!ret[item.py]) {
            ret[item.py] = [];
          }
          ret[item.py].push(item);
        });
        let arr2 = [];
        for (let key in ret) {
          arr2.push({
            title: key,
            arr: ret[key]
          });
        }
        arr2.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        this.singerList = hot.concat(arr2);
      });
    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  created() {
    this.getSingerData();
  },
  components: {
    SingerList
  }
};
</script>
<style lang="scss" scoped>
.slider-enter-active,.slider-leave-active{
  transition: transform .2s;
}
.slider-enter,.slider-leave-to{
  transform: translate3d(100%,0,0)
}
</style>
