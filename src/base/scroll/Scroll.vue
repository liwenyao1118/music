<template>
  <div class="scroll" ref="scrollContainer">
    <div class="scroll-wraper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    data: {
      default: function(){
        return []
      },
      type: Array
    },
    listenScroll: {
      default: false,
      type: Boolean
    },
    probeType: {
      default: 1,
      type: Number
    },
    pullUpLoad: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.$refs.scrollContainer) {
          return;
        }
        this.scroll = new BScroll(this.$refs.scrollContainer, {
          scrollX: false,
          scrollY: true,
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        });
        if (this.listenScroll) {
          this.scroll.on("scroll", pos => {
            this.$emit("scrollY", pos.y);
          });
        }
        if (this.pullUpLoad) {
          this.scroll.on("pullingUp", () => {
            this.$emit("pullingUp");
          });
        }
      });
    },
    finishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement(...args) {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, args);
    },
    scrollTo(...args) {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, args);
    }
  },
  mounted() {
    this._initScroll();
  },
  watch: {
    data() {
      this.scroll.refresh();
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll {
  overflow: hidden;
}
</style>
