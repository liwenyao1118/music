<template>
  <div class="player" v-show="playlist.length">
    <transition name="fade">
      <div class="full-screen" v-show="fullscreen" @click="toggleShowLyric">
        <div class="bg">
          <img :src="currentSong.picUrl" alt>
        </div>
        <div class="top-bar">
          <div class="top">
            <div class="back" @click.stop="zoom">
              <i class="iconfont icon-xiayigeleft"></i>
            </div>
            <div class="title" v-html="currentSong.name"></div>
          </div>
          <div class="artist" v-html="currentSong.singer"></div>
        </div>
        <transition name="lyric-fade">
          <div class="content" v-show="!showLyric">
            <div class="wrapper">
              <div class="pointer" :class="{playing:playing}"></div>
              <div class="bottom">
                <div class="cd" :class="{playing:playing}">
                  <img :src="currentSong.picUrl">
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="lyric-fade">
          <div class="lyric-wrapper" v-show="showLyric">
            <scroll ref="scroll">
              <ul v-if="lyric" ref="lyricContainer">
                <li
                  :class="{current:currentLine==index}"
                  v-for="(item,index) in lyric.lines"
                  :key="index"
                >{{item.txt}}</li>
              </ul>
              <div class="no-lyric" v-show="noLyric">抱歉，该歌曲没有歌词</div>
            </scroll>
          </div>
        </transition>
        <div class="process">
          <div class="current" v-html="format(currentTime)"></div>
          <div class="bar">
            <div
              class="sup"
              ref="bar"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd"
            >
              <div class="sub" ref="on"></div>
            </div>
          </div>
          <div class="duration" v-html="format(duration)"></div>
        </div>
        <div class="control">
          <div class="btn">
            <i class="iconfont icon-xunhuanbofang"></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-shangyishouxianxing" @click.stop="prev"></i>
          </div>
          <div class="btn" @click.stop="togglePlay">
            <i :class="playIcon"></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-xiayishouxianxing" @click.stop="next"></i>
          </div>
          <div class="btn" @click.stop="miniList">
            <i class="iconfont icon-bofangliebiao"></i>
          </div>
        </div>
      </div>
    </transition>
    <div class="mini" v-show="!fullscreen" @click="expand">
      <div class="pic">
        <img :src="currentSong.picUrl" alt :class="{playing:playing}">
      </div>
      <div class="title">
        <div class="name" v-html="currentSong.name"></div>
        <div class="artist" v-html="currentSong.singer"></div>
      </div>
      <div class="control">
        <i :class="playIcon" @click.stop="togglePlay"></i>
        <i class="iconfont icon-bofangliebiao" @click.stop="miniList"></i>
      </div>
    </div>
    <mini-list @selectClear="clear"></mini-list>
    <audio ref="audio" @canplay="canplay" @error="error" @ended="end" @timeupdate="timeUpdate"></audio>
  </div>
</template>
<script>
import Scroll from "base/scroll/Scroll";
import lyricPaser from "lyric-parser";
import { songUrl, lyric } from "api/home.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { setTimeout, clearTimeout } from "timers";
import MiniList from "base/mini-list/MiniList.vue";
export default {
  data() {
    return {
      songUrl: "",
      showLyric: false,
      currentTime: 0,
      duration: 0,
      flag: false,
      lyric: null,
      currentLine: 0,
      noLyric: false,
      picUrl: ""
    };
  },
  methods: {
    clear() {
      if (this.playing) {
        this.$refs.audio.pause();
      }
      this.lyric && this.lyric.stop();
      this.clearPlaylist();
      this.setMiniList(false);
      this.songUrl = "";
    },
    toggleShowLyric() {
      this.showLyric = !this.showLyric;
    },
    getLyric(id) {
      if (!id) {
        return;
      }
      if (this.lyric) {
        this.lyric.stop();
        this.lyric = null;
      }
      lyric(id).then(res => {
        if (!res.data.lrc) {
          this.noLyric = true;
          return;
        }
        this.noLyric = false;
        this.lyric = new lyricPaser(res.data.lrc.lyric, this.handleLyric);
        if (this.playing) {
          this.lyric && this.lyric.play();
        }
      });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLine = lineNum;
      if (lineNum > 5) {
        this.$refs.scroll.scrollToElement(
          this.$refs.lyricContainer.children[lineNum - 5],
          1000
        );
      } else {
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
    },
    miniList() {
      if (!this.showMiniList) {
        this.setMiniList(true);
      }
    },
    // 缩小播放器
    zoom() {
      this.setFullscreen(false);
    },
    // 扩展播放器
    expand() {
      this.setFullscreen(true);
    },
    touchStart(e) {
      this.initTouch = true;
      this.startX = e.touches[0].pageX;
      this.initWidth = this.$refs.on.clientWidth;
    },
    touchMove(e) {
      let maxWidth = this.$refs.bar.clientWidth;
      let width = 0;
      if (this.initTouch) {
        this.moveX = e.touches[0].pageX;
        this.disX = this.moveX - this.startX;
        width = this.disX + this.initWidth;
        if (width < 0) {
          width = 0;
        } else if (width > maxWidth) {
          width = maxWidth;
        }
      }
      this.currentTime = (width / maxWidth) * this.duration;
      if (this.lyric) {
        this.lyric.seek(this.currentTime * 1000);
      }
      this.$refs.on.style.width = width + "px";
    },
    touchEnd() {
      this.initTouch = false;
      this.$refs.audio.currentTime = this.currentTime;
    },
    getSongUrl(id) {
      if (!id) {
        return;
      }
      if (id)
        if (id) {
          songUrl(this.currentSong.id).then(res => {
            this.songUrl = res.data.data[0].url;
          });
        }
    },
    // 控制音乐播放
    play() {
      this.$refs.audio.play();
      this.setPlaying(true);
    },
    pause() {
      this.$refs.audio.pause();
      this.setPlaying(false);
    },
    togglePlay() {
      if (!this.playing) {
        this.play();
      } else {
        this.pause();
      }
      this.lyric && this.lyric.togglePlay();
    },
    next() {
      if (this.flag) {
        let index = this.currentIndex;
        index += 1;
        if (index > this.playlist.length - 1) {
          index = 0;
        }
        this.setCurrentIndex(index);
      }
      if (this.playlist.length == 1) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        this.lyric && this.lyric.play();
      }
      this.flag = false;
      this.resetLyric();
    },
    prev() {
      if (this.flag) {
        let index = this.currentIndex;
        index -= 1;
        if (index < 0) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
      }
      if (this.playlist.length == 1) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        this.lyric && this.lyric.play();
      }
      this.flag = false;
      this.resetLyric();
    },
    end() {
      this.next();
    },
    timeUpdate(e) {
      if (!this.initTouch) {
        this.currentTime = e.target.currentTime;
      }
    },
    canplay() {
      this.flag = true;
      let audio = this.$refs.audio;
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.duration = audio.duration;
      }, 200);
    },
    error() {
      this.flag = true;
    },
    format(num) {
      let m = Math.floor(num / 60);
      let s = Math.floor(num % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return `${m}:${s}`;
    },
    resetLyric() {
      this.currentLine = 0;
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    ...mapMutations({
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlaying: "SET_PLAYING",
      setFullscreen: "SET_FULLSCREEN",
      setMiniList: "SET_SHOW_MINI_LIST"
    }),
    ...mapActions(["clearPlaylist"])
  },
  watch: {
    currentSong(newCurrent, oldCurrent) {
      this.getSongUrl(newCurrent.id);
    },
    songUrl(newUrl, oldUrl) {
      if (newUrl == null) {
        this.$refs.audio.pause();
        this.setPlaying(false);
        this.flag = true;
          alert('不是尊贵的vip不准听!')
      }
      if (newUrl) {
        let audio = this.$refs.audio;
        audio.src = newUrl;
        this.play();
        this.canplay();
        this.getLyric(this.currentSong.id);
      }
    },
    currentTime(now) {
      if (!this.initTouch) {
        let percent = now / this.duration;
        let w = parseInt(percent * this.$refs.bar.clientWidth);
        this.$refs.on.style.width = w + "px";
      }
    },
    showLyric(flag) {
      if (flag) {
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
          if (this.currentLine > 5) {
            this.$refs.scroll.scrollToElement(
              this.$refs.lyricContainer.children[this.currentLine - 5],
              0
            );
          } else {
            this.$refs.scroll.scrollTo(0, 0);
          }
        });
      }
    }
  },
  computed: {
    playIcon() {
      return this.playing ? "iconfont icon-pause" : "iconfont icon-bofang1";
    },
    ...mapGetters([
      "playlist",
      "currentIndex",
      "currentSong",
      "playing",
      "fullscreen",
      "showMiniList"
    ])
  },
  components: {
    MiniList,
    Scroll
  }
};
</script>

<style lang="scss" scoped>
@import "style/mixin.scss";
.player {
  position: relative;
  z-index: 3;
  .full-screen {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #333;
    .lyric-wrapper {
      width: 80%;
      margin: 0 auto;
      position: fixed;
      top: 80px;
      bottom: 130px;
      left: 0;
      right: 0;
      .scroll {
        width: 100%;
        height: 100%;
        .no-lyric {
          position: fixed;
          left: 50%;
          font-size: 14px;
          transform: translate(-50%, -50%);
          color: #fff;
          margin-top: 50%;
        }
        li {
          transition: color 0.2s;
          text-align: center;
          list-style: none;
          line-height: 40px;
          color: #c7c7c7;
          font-size: 14px;
          &.current {
            color: #fff;
          }
        }
      }
    }
    .bg {
      transition: all 0.3s;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      filter: blur(20px);
      opacity: 0.6;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top-bar {
      color: #fff;
      position: relative;
      .top {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .back {
          transform: rotateZ(-90deg);
          position: absolute;
          left: 15px;
          i {
            font-size: 20px;
            display: block;
            transform: rotateZ(180deg);
          }
        }
        .title {
          text-align: center;
          width: 70%;
          margin: 0 auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .artist {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .wrapper {
      .pointer {
        transition: transform 0.6s;
        transform: rotate3d(0, 0, 1, -20deg);
        transform-origin: 0 0;
        z-index: 2;
        position: absolute;
        top: 60px;
        left: calc(50% - 15px);
        width: 84px;
        height: 122px;
        &.playing {
          transform: rotate3d(0, 0, 0, 0);
        }
        @include bg("./pointer");
        @media screen and (min-width: 360px) {
          left: calc(50% - 18px);
          width: 96px;
          height: 137px;
        }
        @media screen and (min-width: 414px) {
          width: 110px;
          height: 157px;
        }
      }
      .bottom {
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        top: 123px;
        width: 248px;
        height: 248px;
        @include bg("./bottom");
        @media screen and (min-width: 360px) {
          top: 130px;
          width: 296px;
          height: 296px;
        }
        @media screen and (min-width: 414px) {
          top: 140px;
          width: 342px;
          height: 342px;
        }
        .cd {
          animation: rotate 20s linear infinite;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          @include bg("./on");
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          animation-play-state: paused;
          &.playing {
            animation-play-state: running;
          }
          img {
            border-radius: 50%;
            display: block;
            width: 150px;
            height: 150px;
            @media screen and (min-width: 360px) {
              width: 184px;
              height: 184px;
            }
            @media screen and (min-width: 414) {
              width: 212px;
              height: 212px;
            }
          }
        }
      }
    }
    .process {
      position: absolute;
      width: 80%;
      left: 50%;
      transform: translateX(-50%);
      height: 30px;
      bottom: 90px;
      display: flex;
      justify-items: center;
      align-items: center;
      .current {
        margin-right: 10px;
        font-size: 12px;
        color: #fff;
      }
      .bar {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .sup {
          position: relative;
          width: 100%;
          height: 30px;
          padding: 13px 0;
          background-clip: content-box;
          background-color: rgba(0, 0, 0, 0.3);
          box-sizing: border-box;
          .sub {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 4px;
            background: #d23930;
            &::after {
              content: "";
              position: absolute;
              display: block;
              width: 10px;
              height: 10px;
              background-color: #fff;
              background-clip: content-box;
              box-sizing: content-box;
              padding: 10px;
              border-radius: 50%;
              right: 0;
              top: 50%;
              transform: translate(50%, -50%);
            }
          }
        }
      }
      .duration {
        margin-left: 10px;
        font-size: 12px;
        color: #fff;
      }
    }
    .control {
      position: absolute;
      bottom: 30px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px 0;
      i {
        color: #eee;
        font-size: 30px;
      }
    }
  }
  .mini {
    padding: 0 20px;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: hsla(0, 0%, 100%, 0.85);
    align-items: center;
    display: flex;
    .pic {
      margin-right: 20px;
      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        animation: rotate 20s linear 0.6s infinite;
        animation-play-state: paused;
        &.playing {
          animation-play-state: running;
        }
      }
    }
    .title {
      flex: 1;
      max-width: 70%;
      .name {
        font-size: 14px;
        flex-grow: 0;
        overflow: hidden;
        max-width: 70%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: 12px;
      }
    }
    .control {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      i {
        font-size: 22px;
        margin-left: 20px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(0, 100%, 0);
}
.lyric-fade-enter-active,
.lyric-fade-leave-active {
  transition: opacity .8s;
}
.lyric-fade-enter,
.lyric-fade-leave-to {
  opacity: 0;
}
@keyframes rotate {
  from {
    transform: rotate3d(0, 0, 0, 0);
  }
  to {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
