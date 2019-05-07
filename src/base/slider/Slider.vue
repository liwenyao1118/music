<template>
  <div class="slider-container" ref="sliderContainer">
    <div class="slider-wrapper" ref="sliderWrapper">
      <slot></slot>
    </div>
    <div class="dot-wrapper">
      <span v-for="(item,index) in dots" 
        :key="index" 
        :class="{active:currentIndex==index}">
      </span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { setTimeout, clearTimeout } from "timers";
export default {
  data() {
    return {
      dots: [],
      currentIndex: 0
    };
  },
  methods: {
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.next();
      }, 4000);
    },
    _initWidth() {
      this.$nextTick(() => {
        if (!this.$refs.sliderWrapper.children) {
          return;
        }
        this.children = this.$refs.sliderWrapper.children;
        this._initDot();
        let w = this.$refs.sliderContainer.clientWidth;
        let width = 0;
        for (let i = 0; i < this.children.length; i++) {
          this.children[i].style.width = w + "px";
          width += w;
        }
        this.$refs.sliderWrapper.style.width = width + "px";
      });
    },
    _initSlider() {
      this.$nextTick(() => {
        if (!this.$refs.sliderContainer) {
          return;
        }
        this.slider = new BScroll(this.$refs.sliderContainer, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          click: true,
          snap: {
            threshold: 0.2,
            loop: true
          }
        });
        this.slider.on("scrollEnd", () => {
          this.currentIndex = this.slider.getCurrentPage().pageX;
          this._play();
        });
        this.slider.on("scrollStart", () => {
          clearTimeout(this.timer);
        });
      });
    },
    _initDot() {
      this.dots = new Array(this.children.length - 2);
    }
  },
  mounted() {
    this._initSlider();
    this._initWidth();
    this._play();
  },
  activated() {
    clearTimeout(this.timer);
    this._play();
  },
  deactivated() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="scss" scoped>
@import "style/varibal.scss";
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  .dot-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5px;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: rgb(250, 250, 250);
      border-radius: 50%;
      margin: 0 4px;
      &.active {
        background-color: $red;
      }
    }
  }
}
</style>
