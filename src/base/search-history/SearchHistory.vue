<template>
  <div class="search-history">
    <div class="top">
      <div class="title">搜索历史</div>
      <div class="clear" @click="clear">
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>
    <div class="item" 
      v-for="(item,index) in searchHistory" 
      :key="index" @click="select(item)">
      <div class="song">{{item}}</div>
      <div class="delete" 
      @click.stop="selectDelete(item)"></div>
    </div>
    <confirm v-show="clearHistory"
     @sure="sure" @cancel="cancel" 
     confirmTitle="是否清空搜索历史"></confirm>
  </div>
</template>
<script>
import Confirm from "base/confirm/Confirm.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    data(){
        return {
            clearHistory:false
        }
    },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  methods: {
    select(item) {
      this.$emit("selectHistory", item);
    },
    selectDelete(item) {
      this.deleteSearch(item);
    },
    clear() {
        this.clearHistory = true
    },
    cancel(){
        this.clearHistory = false;
    },
    sure(){
        this.clearSearch()
        this.clearHistory = false;
    },
    ...mapActions(["deleteSearch", "clearSearch"])
  },
  components: {
    Confirm
  }
};
</script>

<style lang="scss" scoped>
.search-history {
  margin-top: 50px;
  position: relative;
  z-index: 4;
  .top {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 40px;
  }
  .item {
    font-size: 14px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .delete {
      position: relative;
      width: 20px;
      height: 20px;
      &::before,
      &::after {
        content: "";
        left: 50%;
        top: 50%;
        display: block;
        position: absolute;
        width: 16px;
        height: 2px;
        background-color: #333;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}
</style>

