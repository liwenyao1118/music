<template>
  <div class="list">
    <div class="item" v-for="(song,index) in songs" 
      :key="index" @click="select(song,index)" 
      :style="{height:height}">
      <div class="icon" :style="{width:height,height:height,lineHeight:height}">
        <span v-show="song.id!=currentSong.id">{{index+1}}</span>
        <i class="iconfont icon-laba" v-show="song.id==currentSong.id"></i>
      </div>
      <div class="song">
        <div class="title" v-html="song.name" :style="{fontSize:fontSize}"></div>
        <div class="artist" v-show="showArtist">{{song.singer}}-{{song.album}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations} from "vuex";
export default {
  props: {
    songs: {
      default: [],
      type: Array
    },
    showArtist: {
        default:true,
        type:Boolean
    },
    fontSize: {
        default:"16px",
        type:String
    }
  },
  computed: {
    height(){
      return this.fontSize == "14px" ? "40px" : "50px"
    },
    ...mapGetters(["currentSong", "currentIndex"])
  },
  methods: {
    select(song,index){
      this.$emit('selectListItem',song,index)
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING'
    })
  }
};
</script>

<style lang="scss" scoped>
.list {
    padding-bottom: 10px;
  .item {
    display: flex;
    .icon {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: rgb(145, 146, 147);
      i {
        color: #d23930;
        font-weight: 600;
      }
    }
    .song {
      padding-right: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      border-bottom: 1px solid rgb(233, 235, 235);
      .title {
        color: rgb(49, 49, 49);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .artist {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: rgb(145, 146, 147);
      }
    }
  }
}
</style>
