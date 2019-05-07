<template>
  <div class="home-wrapper">
    <scroll class="home" ref="scroll">
      <slider v-if="sliderList.length">
        <a
          href="javascript:;"
          class="slider-item"
          v-for="(slider,index) in sliderList"
          :key="index"
        >
          <img :src="slider.imageUrl">
        </a>
      </slider>
      <disc-list title="推荐歌单" :list="recommendList" @selectList="jumpToPlayList"></disc-list>
      <disc-list title="最热歌单" :list="hotList" @selectList="jumpToPlayList"></disc-list>
      <disc-list title="最新歌单" :list="newList" @selectList="jumpToPlayList"></disc-list>
    </scroll>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Slider from "base/slider/Slider.vue";
import Scroll from "base/scroll/Scroll.vue";
import DiscList from "base/disc-list/DiscList.vue";
import { listHeight } from "common/mixin.js";
import {
  sliderData,
  recommendListData,
  newListData,
  hotListData
} from "api/home.js";
import { setTimeout } from "timers";
import { mapMutations, mapGetters } from "vuex";
export default {
  mixins: [listHeight],
  data() {
    return {
      sliderList: [],
      recommendList: [],
      hotList: [],
      newList: []
    };
  },
  components: {
    Slider,
    DiscList,
    Scroll
  },
  created() {
    this.setSlider();
    this.setRecommendList();
    this.setHotList();
    this.setNewList();
  },
  computed: {
    date() {
      return new Date().getDate();
    },
    ...mapGetters(["playlist"])
  },
  methods: {
    handlePlaylist() {
      let bottom = this.playlist.length ? "50px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    jumpToPlayList(data) {
      this.$router.push({
        name: "playlist",
        params: { id: data.id }
      });
      this.setDisc(data);
    },
    setSlider() {
      sliderData().then(res => {
        if (res.status != 200) {
          return;
        }
        this.sliderList = res.data.banners.filter(item => {
          if (item.targetId > 0) {
            return { imageUrl: item.imageUrl, songId: item.targetId };
          }
        });
      });
    },
    setRecommendList() {
      recommendListData().then(res => {
        this.recommendList = res.data.result.slice(1, 13);
      });
    },
    setHotList() {
      hotListData().then(res => {
        this.hotList = res.data.playlists.map(item => {
          return {
            id: item.id,
            picUrl: item.coverImgUrl,
            name: item.name,
            playCount: item.playCount
          };
        });
      });
    },
    setNewList() {
      newListData().then(res => {
        this.newList = res.data.playlists.map(item => {
          return {
            id: item.id,
            picUrl: item.coverImgUrl,
            name: item.name,
            playCount: item.playCount
          };
        });
      });
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  }
};
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 46px;
  bottom: 0;
  width: 100%;
}
.slider-item {
  float: left;
  display: block;
  padding: 10px 10px 0 10px;
  img {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    display: block;
    width: 100%;
  }
}
.slider-enter-active,
.slider-leave-active {
  transition: transform 0.2s;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

