<template>
  <div class="search-box">
    <div class="back" @click="back">
      <i class="iconfont icon-xiayigeleft"></i>
    </div>
    <div class="search-box-wrapper">
      <input type="text" placeholder="搜索歌曲、歌手" v-model="query" autofocus>
    </div>
    <div class="delete" @click="clearQuery" v-show="query"></div>
  </div>
</template>
<script>
import { clearTimeout, setTimeout } from "timers";
export default {
  data() {
    return {
      query: ""
    };
  },
  methods: {
    debounce(func, delay) {
      let timer;
      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    setQuery(query){
      this.query = query
    },
    clearQuery(){
      this.query = ''
    },
    back(){
      this.$router.back()
      this.query = ''
    }
  },
  created() {
    this.$watch(
      "query",
      this.debounce(newQuery => {
        this.$emit("queryChange", newQuery);
      }, 300)
    );
  }
};
</script>

<style lang="scss" scoped>
@import "style/varibal.scss";
.search-box {
  margin: 0 auto;
  display: flex;
  background-color: $red;
  color: #fff;
  height: 45px;
  align-items: center;
  position: relative;
  .back {
    padding: 0 10px;
    i {
      font-size: 20px;
      display: block;
      transform: rotate(180deg);
    }
  }
  .search-box-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    input {
      flex: 1;
      color: #fff;
      background-color: $red;
      border: 0;
      outline: none;
      font-size: 14px;
      line-height: 18px;
      &::-webkit-input-placeholder {
        color: #aab2bd;
      }
    }
  }
  .delete {
    margin-right: 20px;
    width: 20px;
    height: 20px;
    position: relative;
    &::before {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      position: absolute;
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background-color: #fff;
    }
    &::after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      position: absolute;
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background-color: #fff;
    }
  }
}
</style>
