<template>
  <div class="song-list">
    <list-header @play="playAll" :num="num"></list-header>
    <list-wrapper :songs="songs" @selectListItem="selectListItem"></list-wrapper>
    <div class="loading" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import Loading from "base/loading/Loading.vue";
import ListHeader from 'base/list-header/ListHeader.vue'
import ListWrapper from 'base/list-wrapper/ListWrapper.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  props: {
    songs: {
      default: [],
      type: Array
    }
  },
  computed: {
    num() {
      return this.songs.length;
    }
  },
  methods: {
    playAll(){
      this.selectPlay({
        list:this.songs,
        index:0
      })
    },
    selectListItem(song,index){
      this.$emit("selectItem",song,index)
    },
    ...mapActions({
      selectPlay: 'selectPlay'
    })
  },
  components: {
    Loading,
    ListHeader,
    ListWrapper
  }
};
</script>

<style lang="scss" scoped>
.song-list {
  position: relative;
  background-color: #f2f3f4;
}
.loading {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 450px;
}
</style>
