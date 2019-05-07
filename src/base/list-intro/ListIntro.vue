<template>
  <div class="list-intro" :style="{backgroundImage:`url(${pic})`}">
    <div class="name" v-show="name" v-html="name"></div>
    <div class="intro">
      <div class="count" v-show="count">
        <i class="iconfont icon-erjikefu"></i>
        <span v-html="count"></span>
      </div>
      <div class="title" v-html="title"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name:{
      default:'',
      type:String
    },
    pic: {
      default: "",
      type: String
    },
    count: {
      default: "",
      type: String
    },
    title: {
      default: "",
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.list-intro {
  width: 100%;
  padding-bottom: 70%;
  background-size: cover;
  position: relative;
  background-position: center;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
  }
  .name {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
    font-size: 20px;
    z-index: 99;
    font-weight: 600;
  }
  .intro {
    z-index: 999;
    position: absolute;
    bottom: 40px;
    left: 15px;
    width: 80%;
    color: #fff;
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
      margin-top: 10px;
    }
    .count {
      span {
        padding-left: 5px;
      }
    }
  }
}
</style>
