<template>
  <div class="search-hot">
    <div class="hot">热门搜索</div>
    <div
      class="item"
      v-for="(item,index) in searchHots"
      :key="index"
      @click="select(item)"
    >{{item.first}}</div>
  </div>
</template>
<script>
export default {
  props: {
    searchHots: {
      default: [],
      type: Array
    }
  },
  methods: {
    select(item) {
      this.$emit("selectHot", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.search-hot {
    position: relative;
    z-index: 4;
  padding: 0 20px;
  .hot {
    margin: 15px 5px 0;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #757575;
  }
  .item {
    display: inline-block;
    padding: 3px 5px;
    margin: 4px;
    border: 0.8px solid #c7c7c7;
    border-radius: 5px;
    line-height: 20px;
    color: #2e3030;
    font-size: 14px;
  }
}
</style>
