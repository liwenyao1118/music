<template>
  <div class="disc-list">
    <div class="classify">
      <div class="title" v-html="title"></div>
      <i class="iconfont icon-xiayigeleft" v-show="showArrow"></i>
    </div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index"
           @click="select(item)">
        <img v-lazy="item.picUrl">
        <div class="intro" v-html="item.name"></div>
        <div class="min" v-show="showCount">
          <i class="iconfont icon-erjikefu"></i>
          {{count(item.playCount)}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list:{
      default(){
        return []
      },
      type: Array
    },
    showArrow: {
      default:true,
      type:Boolean
    },
    showCount: {
      default:true,
      type:Boolean
    }
  },
  methods:{
    count(num){
      if(num<10000){
        return num
      }else{
        return Math.ceil(num / 10000) + '万'
      } 
    },
    select(item){
      this.$emit('selectList',item)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "style/varibal.scss";
.disc-list {
  padding-bottom: 10px;
  margin-top: 20px;
  .classify {
    .title {
      display: inline-block;
      position: relative;
      padding-left: 10px;
      &::before {
        content: "";
        left: 0;
        position: absolute;
        display: block;
        width: 2px;
        height: 100%;
        background-color: $red;
      }
    }
    i {
      color: #aaa;
    }
  }
  .list {
    flex-wrap: wrap;
    display: flex;
    .item {
      margin-top: 10px;
      position: relative;
      width: calc(100% / 3);
      display: flex;
      padding:0 1px;
      flex-direction: column;
      img {
        display: block;
        width: 100%;
      }
      .intro {
        padding: 5px;
        font-size: 12px;
      }
      .min {
        color: #fff;
        position: absolute;
        top: 3px;
        right: 5px;
        font-size: 12px;
        i {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
