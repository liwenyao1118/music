<template>
  <div class="singer-list">
    <scroll
      class="scroll"
      ref="scroll"
      :listenScroll="listenScroll"
      :probeType="probeType"
      @scrollY="getY"
    >
      <div class="item" v-for="(singer,index) in singerList" 
        :key="index" ref="item">
        <div class="title">{{singer.title | toUpperCase}}</div>
        <div class="artist" v-for="(item,index) in singer.arr" 
          :key="index" 
          @click="selectItem(item)">
          <div class="pic">
            <img v-lazy="item.picUrl" alt>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="tag" ref="tag" v-show="y<0">{{tag}}</div>
    <div class="right-bar">
      <ul>
        <li
          :class="{active:activeIndex==index}"
          @click="select(item,index)"
          v-for="(item,index) in singerList"
          :key="index"
        >{{item.title | toUpperCase}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Scroll from "base/scroll/Scroll.vue";
import { Transform } from "stream";
import {listHeight} from 'common/mixin.js'
export default {
  mixins:[listHeight],
  props: {
    singerList: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      y: 0,
      hArr: [],
      activeIndex: 0,
      tag: "热"
    };
  },
  filters: {
    toUpperCase(val) {
      return val[0].toUpperCase();
    }
  },
  methods: {
    handlePlaylist(){
     let bottom =  this.playlist.length ? '50px' : 0;
     this.$refs.scroll.$el.style.bottom = bottom;
     this.$refs.scroll.refresh()
    },
    selectItem(item){
      this.$emit("selectItem",item)
    },
    getY(val) {
      this.y = val;
    },
    select(item, index) {
      this.activeIndex = index;
      let aims = this.$refs.item;
      this.$refs.scroll.scrollToElement(aims[index], 200);
    },
    _calculateHeight() {
      this.$nextTick(() => {
        let items = this.$refs.item;
        let h = 0;
        this.hArr.push(h);
        for (let i = 0; i < items.length; i++) {
          h += items[i].clientHeight;
          this.hArr.push(h);
        }
      });
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },

  watch: {
    singerList(newVal, oldVal) {
      if (newVal.length) {
        this._calculateHeight();
      }
    },
    y(newVal) {
      for (let i = 0; i < this.hArr.length; i++) {
        let h1 = this.hArr[i];
        let h2 = this.hArr[i + 1];
        if (-newVal >= h1 && -newVal < h2) {
          this.activeIndex = i;
        }
        if(this.activeIndex == -1){
          this.activeIndex = 0;
        }
      }
      this.tag = this.singerList[this.activeIndex].title
        .toUpperCase()
        .slice(0, 1);
      let disY = this.hArr[this.activeIndex + 1] + newVal;
      if (disY < 30) {
        this.$refs.tag.style.transform = `translate3d(0,${disY - 30}px,0)`;
      } else {
        this.$refs.tag.style.transform = "";
      }
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.singer-list {
  background-color: #f2f3f4;
  .scroll {
    position: fixed;
    top: 46px;
    bottom: 0;
    width: 100%;
  }
  .item {
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.5);
      background: #333;
    }
    .artist {
      height: 70px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      border-bottom: 1px solid #e4e4e4;
      .pic {
        display: flex;

        align-items: center;
        img {
          border-radius: 5px;
          width: 50px;
          height: 50px;
        }
        .name {
          margin-left: 20px;
          color: #333;
        }
      }
    }
  }
  .right-bar {
    text-align: center;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    ul {
      padding: 10px 0;
      border-radius: 9px;
      background-color: #fff;
      li {
        padding: 3px;
        line-height: 1;
        color: #333;
        font-size: 12px;
        &.active {
          color: #d23930;
        }
      }
    }
  }
  .tag {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.5);
    background: #333;
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
  }
}
</style>
