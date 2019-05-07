<template>
  <scroll class="scroll" ref="scroll" @pullingUp="loadMore" :pullUpLoad="pullUpLoad" :data="songs">
    <div class="suggest" v-show="query">
      <div class="title">最佳匹配</div>
      <div class="wrapper">
        <div
          class="item"
          v-for="(artist,index) in showSinger"
          :key="index"
          @click.stop="selectSinger(artist)"
        >
          <img v-lazy="artist.picUrl" :key="artist.picUrl">
          <div class="intro">
            <div class="disc">歌手：{{artist.name}}</div>
          </div>
        </div>
        <div class="list" v-show="songs.length">
          <div class="item" v-for="(song,index) in songs" :key="index" @click="selectSong(song)">
            <div class="intro">
              <div class="disc">{{song.name}}</div>
              <div class="name">{{song.singer}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="more" v-show="showMore">加载更多。。。。。</p>
  </scroll>
</template>
<script>
import Scroll from "base/scroll/Scroll.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { suggestData, searchData, songDetail } from "api/home.js";
import { listHeight } from "common/mixin.js";
import { setTimeout } from "timers";
export default {
  mixins: [listHeight],
  props: {
    query: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      artists: [],
      songs: [],
      offset: 0,
      songCount: 0,
      pullUpLoad: true,
      showMore: false,
      haveMore: true
    };
  },
  computed: {
    showSinger() {
      return this.artists;
    },
    ...mapGetters(["playlist"])
  },
  methods: {
    loadMore() {
      if (!this.query) {
        return;
      }
      if (!this.haveMore) {
        this.showMore = false;
        return;
      }
      this.showMore = true;
      setTimeout(() => {
        searchData(this.query, this.offset).then(res => {
          if (!res.data.result) {
            return;
          }
          if (!res.data.result.songs) {
            return;
          }
          this.songCount = res.data.result.songCount;
          let arr = res.data.result.songs.map(item => {
            return {
              id: item.id,
              singer: this._normalizeSinger(item.artists),
              name: item.name
            };
          });
          if (this.songCount <= this.offset) {
            this.haveMore = false;
          }
          this.songs = this.songs.concat(arr);
          this.offset += 30;
        });
        this.$refs.scroll.scroll.finishPullUp();
        this.showMore = false;
      }, 200);
    },
    handlePlaylist() {
      let bottom = this.playlist.length ? "50px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectSong(item) {
      songDetail(item.id).then(res => {
        item.picUrl = res.data.songs[0].al.picUrl;
      });
      this.saveSearch(item.name);
      this.insertSong(item);
    },
    fetchSuggest(query, offset) {
      if (!query.length) {
        return;
      }
      suggestData(query).then(res => {
        this.artists = res.data.result.artists;
      });
      searchData(query, offset).then(res => {
        if (!res.data.result) {
          return;
        }
        if (!res.data.result.songs) {
          return;
        }
        this.songCount = res.data.result.songCount;
        this.songs = res.data.result.songs.map(item => {
          return {
            id: item.id,
            singer: this._normalizeSinger(item.artists),
            name: item.name
          };
        });

        if (this.songCount <= this.offset) {
          this.haveMore = false;
        }
        this.offset += 30;
      });
    },
    _normalizeSinger(arr) {
      let a = [];
      arr.forEach(item => {
        a.push(item.name);
      });
      return a.join("/");
    },
    selectSinger(item) {
      this.$router.push({
        name: "searchDetail",
        params: { id: item.id }
      });
      this.saveSearch(item.name);
      this.setSinger(item);
    },
    ...mapMutations({
      setSinger: "SET_SINGER",
      setSearchHistory: "SET_SEARCH_HISTORY"
    }),
    ...mapActions(["selectPlay", "insertSong", "saveSearch"])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        this.artists = [];
        return;
      }
      this.offset = 0;
      this.$refs.scroll.scrollTo(0, 0);
      this.fetchSuggest(newQuery, this.offset);
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  position: fixed;
  top: 45px;
  bottom: 0;
  left: 0;
  width: 100%;
  .more {
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    font-size: 14px;
    text-align: center;
    color: #757575;
    line-height: 30px;
  }
}
.suggest {
  .title {
    font-size: 12px;
    color: #d44439;
    padding: 10px 0 10px 20px;
  }
  .wrapper {
    .item {
      border-bottom: 1px solid #e4e4e4;
      align-items: center;
      padding: 10px 20px;
      display: flex;
      img {
        width: 50px;
        height: 50px;
      }
      .intro {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-left: 15px;
        .disc {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .name {
          margin-top: 5px;
          font-size: 12px;
          color: #757575;
        }
      }
    }
  }
}
</style>
