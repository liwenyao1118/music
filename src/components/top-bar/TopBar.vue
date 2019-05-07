<template>
  <div class="top-bar">
    <router-link to="/rank">
      <i class="iconfont icon-yinyue"></i>
    </router-link>
    <router-link to="/home">
      <i class="iconfont icon-wangyiyunyinlezizhi-copy"></i>
    </router-link>
    <router-link to="/singer">
      <i class="iconfont icon-huoban"></i>
    </router-link>
    <router-link tag="div" to="/search" class="search">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
@import "style/varibal.scss";
.top-bar {
  position: relative;
  z-index: 1;
  background-color: $red;
  padding: 10px 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  i {
    color: $gray;
    font-size: 28px;
    font-weight: 400;
  }
  a {
    &.router-link-active {
      i {
        color: #fff;
      }
    }
  }
}
</style>
