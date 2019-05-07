<template>
  <div class="my">
    <scroll ref="scroll">
      <official-list></official-list>
      <disc-list
        :showCount="showCount"
        :showArrow="showArrow"
        title="全球榜"
        :list="globalTopList"
        @selectList="selectList"
      ></disc-list>
      </scroll>
      <transition name="slider">
        <router-view></router-view>
      </transition>
    
  </div>
</template>
<script>
import Scroll from "base/scroll/Scroll.vue";
import OfficialList from "base/official-list/OfficialList.vue";
import DiscList from "base/disc-list/DiscList.vue";
import { toplistData } from "api/home.js";
import { mapMutations } from "vuex";
import { setTimeout } from "timers";
import { listHeight } from "common/mixin.js";
export default {
  mixins: [listHeight],
  data() {
    return {
      globalTopList: [],
      showCount: false,
      showArrow: false
    };
  },
  components: {
    DiscList,
    OfficialList,
    Scroll
  },
  methods: {
    handlePlaylist() {
      let bottom = this.playlist.length ? "50px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    getTopList() {
      toplistData().then(res => {
        let arr = res.data.list;
        arr = arr.map(item => {
          return {
            id: item.id,
            playCount: item.playCount,
            name: item.name,
            picUrl: item.coverImgUrl
          };
        });
        this.globalTopList = arr.slice(4);
      });
    },
    selectList(data) {
      this.$router.push({
        name: "toplist",
        params: { id: data.id }
      });
      this.setDisc(data);
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  },
  created() {
    this.getTopList();
  }
};
</script>
<style lang="scss" scoped>
.scroll {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  width: 100%;
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

