<template>
  <transition name="slider">
    <div class="mini-list-wrapper" v-show="showMiniList">
      <div class="mini-list" @click="stop">
        <div class="top-bar">
          <div class="left">
            <div class="icon">
              <i class="iconfont icon-xunhuanbofang"></i>
            </div>
            <div class="mode">列表循环({{playlist.length}})</div>
          </div>
          <div class="right">
            <i class="iconfont icon-shanchu"></i>
            <div class="clear" @click="selectClear">清空</div>
          </div>
        </div>
        <scroll ref="scroll">
          <list-wrapper
            :songs="playlist"
            :showArtist="showArtist"
            :fontSize="fontSize"
            @selectListItem="changeCurrentSong"
          ></list-wrapper>
        </scroll>
        <confirm v-show="showConfirm" @cancel="cancel" @sure="sure"></confirm>
      </div>
    </div>
  </transition>
</template>
<script>
import Scroll from "base/scroll/Scroll.vue";
import ListWrapper from "base/list-wrapper/ListWrapper.vue";
import { mapGetters, mapMutations } from "vuex";
import Confirm from 'base/confirm/Confirm.vue'
export default {
  data(){
    return {
      showConfirm:false
    }
  },
  computed: {
    ...mapGetters(["playlist", "showMiniList"])
  },
  components: {
    Scroll,
    Confirm,
    ListWrapper
  },
  methods: {
    cancel(){
      this.showConfirm = false;
    },
    sure(){
      this.showConfirm = false;
      this.$emit('selectClear')
    },
    selectClear(){
      this.showConfirm = true;
    },
    changeCurrentSong(song, index) {
      this.setCurrentIndex(index);
    },
    stop(e) {
      e.stopPropagation();
    },
    ...mapMutations({
      setMiniList: "SET_SHOW_MINI_LIST",
      setCurrentIndex: "SET_CURRENT_INDEX"
    })
  },
  watch: {
    showMiniList(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
      }
    }
  },
  created() {
    document.documentElement.addEventListener(
      "click",
      () => {
        if (this.showMiniList) {
          this.setMiniList(false);
        }
      },
      false
    );
    this.showArtist = false;
    this.fontSize = "14px";
  }
};
</script>
<style lang="scss" scoped>
.mini-list-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .mini-list {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #f2f3f4;
    position: absolute;
    bottom: 0;
    height: 350px;
    width: 100%;
    .top-bar {
      height: 50px;
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      i {
        font-size: 20px;
        vertical-align: middle;
      }
      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
      }
      .right {
        align-items: center;
        display: flex;
        .clear {
          text-align: center;
          line-height: 40px;
          width: 40px;
          height: 40px;
        }
      }
    }
    .close {
      text-align: center;
      line-height: 30px;
      font-size: 16px;
    }
    .scroll {
      height: calc(100% - 50px);
    }
  }
  
}
.slider-enter-active,
.slider-leave-active {
  transition: opacity 0.3s ease-in-out;
  .mini-list {
    transition: all 0.3s ease-in-out;
  }
}
.slider-enter,
.slider-leave-to {
  opacity: 0;
  .mini-list {
    transform: translate3d(0, 100%, 0);
  }
}
.slider-enter-to,
.slider-leave {
  opacity: 1;
  .mini-list {
    transform: translate3d(0, 0, 0);
  }
}

</style>
