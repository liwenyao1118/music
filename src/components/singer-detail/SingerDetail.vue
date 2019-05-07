<template>
  <div class="singer-detail">
    <div class="top-bar" @click="back" ref="topBar">
      <div class="back">
        <i class="iconfont icon-xiayigeleft"></i>
      </div>
      <p>歌单</p>
    </div>
    <scroll
      class="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scrollY="getScrollY"
      ref="scroll"
    >
      <list-intro :pic="pic" :name="name"></list-intro>
      <song-list :songs="songs" @selectItem="selectItem"></song-list>
    </scroll>
  </div>
</template>
<script>
import ListIntro from "base/list-intro/ListIntro.vue";
import SongList from "base/song-list/SongList.vue";
import Scroll from "base/scroll/Scroll.vue";
import { singerSongs } from "api/home.js";
import { mapGetters, mapActions } from "vuex";
import {listHeight} from "common/mixin.js";
export default {
  mixins: [listHeight],
  data() {
    return {
      songs: [],
      y: 0
    };
  },
  methods: {
    handlePlaylist() {
      let bottom = this.playlist.length ? "50px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    fetchData() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      singerSongs(this.singer.id).then(res => {
        let arr = res.data.hotSongs;
        arr = arr.map(item => {
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
    selectItem(song, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    _normalizeSinger(data) {
      let arr = data.map(item => {
        return item.name;
      });
      return arr.join("/");
    },
    back() {
      this.$router.back()
    },
    getScrollY(y) {
      this.y = y;
    },
    ...mapActions({
      selectPlay: "selectPlay"
    })
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    this.fetchData();
  },
  computed: {
    pic() {
      return this.singer.picUrl;
    },
    name() {
      return this.singer.name;
    },
    ...mapGetters(["singer"])
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
  components: {
    ListIntro,
    SongList,
    Scroll
  }
};
</script>
<style lang="scss" scoped>
.singer-detail {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .scroll {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    left: 0;
  }
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
</style>
