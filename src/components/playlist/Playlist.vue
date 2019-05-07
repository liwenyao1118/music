<template>
  <div class="playlist">
    <div class="top-bar" @click="back" ref="topBar">
      <div class="back">
        <i class="iconfont icon-xiayigeleft"></i>
      </div>
      <p>歌单</p>
    </div>
    <scroll
    ref="scroll"
      class="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scrollY="getScrollY"
    >
      <list-intro :pic="pic" :title="title" :count="count"></list-intro>
      <song-list :songs="songs" @selectItem="selectItem"></song-list>
    </scroll>
  </div>
</template>
<script>
import ListIntro from "base/list-intro/ListIntro.vue";
import SongList from "base/song-list/SongList.vue";
import Scroll from "base/scroll/Scroll.vue";
import { discData, isOk } from "api/home.js";
import { mapGetters, mapActions } from "vuex";
import { setTimeout } from "timers";
import {listHeight} from 'common/mixin.js'
export default {
  mixins:[listHeight],
  data() {
    return {
      songs: [],
      probeType: 3,
      listenScroll: true,
      y: 0
    };
  },
  computed: {
    title() {
      return this.disc.name;
    },
    pic() {
      return this.disc.picUrl;
    },
    count() {
      if(this.disc.playCount < 10000){
        return ''+this.disc.playCount
      }else{
        return Math.ceil(this.disc.playCount / 10000) + "万"
      }
    },
    ...mapGetters(["disc","currentSong"])
  },
  components: {
    Scroll,
    ListIntro,
    SongList
  },
  methods: {
    handlePlaylist(){
     let bottom =  this.playlist.length ? '50px' : 0;
     this.$refs.scroll.$el.style.bottom = bottom;
     this.$refs.scroll.refresh()
    },
    selectItem(song, index) {
      this.name = song.name;
      this.singer = song.singer;
      this.picUrl = song.picUrl;
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    getScrollY(y) {
      this.y = y;
    },
    back() {
      this.$router.back();
    },

    getDiscData() {
      if (!this.disc.id) {
        this.$router.push("/home");
        return;
      }
      let id = this.disc.id;
      discData(id).then(res => {
        let arr = []
        arr = res.data.playlist.tracks.map(item => {
          return {
            album: item.al.name,
            picUrl: item.al.picUrl,
            singer: this._normalizeSinger(item.ar),
            name: item.name,
            id: item.id
          };
        });
        this.songs = arr;
      });
    },
    _checkSong(id) {
      isOk(id).then(res => {
        return res.data.success;
      });
    },
    _normalizeSinger(data) {
      let arr = data.map(item => {
        return item.name;
      });
      return arr.join("/");
    },
    ...mapActions({
      selectPlay: "selectPlay"
    })
  },
  watch: {
    y(newY) {
      let opacity = 0;
      if (-newY < 200) {
        opacity = -newY / 400;
      } else {
        opacity = 0.5;
      }
      this.$refs.topBar.style.backgroundColor = `rgba(0,0,0,${opacity})`;
    }
  },
  created() {
    setTimeout(() => {
      this.getDiscData();
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.playlist {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .top-bar {
    width: 100%;
    padding: 10px 0;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    color: #fff;
    align-items: center;
    i {
      margin-left: 15px;
      margin-right: 5px;
      display: block;
      transform: rotateZ(180deg);
      font-size: 20px;
      color: #fff;
    }
    p {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
.scroll {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
