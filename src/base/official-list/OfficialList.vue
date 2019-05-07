<template>
  <div class="official-list">
    <div class="title">官方榜</div>
    <div class="item" v-for="(item,index) in officialTopList" :key="index" @click="select(item)">
      <div class="pic">
        <img v-lazy="item.coverImgUrl">
      </div>
      <div class="context">
        <div class="song" v-for="(song,index) in item.songs" :key="index">
            {{index+1}}. {{song.name}} - {{song.ar | arr2string}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import { officialListData } from "api/home.js";
const num = [3, 0, 1, 2];
export default {
  data() {
    return {
      officialTopList: []
    };
  },
  filters:{
      arr2string(arr){
          let temp = [];
      arr.forEach(item => {
        temp.push(item.name);
      });
      return temp.join("/");
    
      }
  },
  methods: {
      select(data){
          this.$router.push({
              name:'toplist',
              params:{id:data.id}
          })
          this.setDisc(data)
      },
    fetchData(id) {
      officialListData(id).then(res => {
        let list = res.data.playlist
        list.picUrl = res.data.playlist.coverImgUrl
        list.songs = res.data.playlist.tracks.slice(0,3)
        this.officialTopList.push(list)
      });
    },
    _normalizeArray(arr) {
      let temp = [];
      arr.forEach(item => {
        temp.push(item.name);
      });
      return temp.join("/");
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  },
  created() {
    num.forEach(item => {
      this.fetchData(item);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "style/varibal.scss";
.official-list {
  .title {
      margin: 20px 0 10px 0;
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
  .item {
      padding-left: 1px;
    margin: 2px 0;
    display: flex;
    .pic {
      flex: 0 0 30%;
      width: 30%;
      img {
        display: block;
        width: 100%;
      }
    }
    .context {
      border-bottom: 1px solid #e4e4e4;
      overflow: hidden;
      flex: 1;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .song {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
        font-weight: 400;
        font-size: 14px;
        color: #2e4030;
      }
    }
  }
}
</style>
