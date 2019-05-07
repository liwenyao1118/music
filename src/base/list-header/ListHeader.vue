<template>
  <div class="list-header">
    <div class="header" @click="clickHeader">
      <i class="iconfont icon-bofang1"></i>
      播放全部
      <span>(共{{num}}首)</span>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        num: {
            default:0,
            type: Number
        }
    },
    methods: {
        clickHeader(){
            this.$emit('play')
        }
    }
}
</script>

<style lang="scss" scoped>
.list-header{
    i {
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(233, 235, 235);
    font-size: 18px;
    color: rgb(49, 49, 49);
    i {
      font-size: 26px;
    }
  }
}
</style>
