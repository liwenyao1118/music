<template>
  <transition name="search">
    <div class="search">
    <search-box @queryChange="queryChange" ref="searchBox"></search-box>
    <search-hot :searchHots="searchHots" v-show="!query" @selectHot="selectHot"></search-hot>
    <search-history v-show="!query && searchHistory.length" @selectHistory="selectHistory"></search-history>
    <suggest :query="query"></suggest>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
  </transition>
</template>
<script>
import SearchBox from "base/search-box/SearchBox.vue"
import Suggest from "base/suggest/Suggest.vue"
import SearchHot from "base/search-hot/SearchHot.vue"
import SearchHistory from 'base/search-history/SearchHistory.vue'
import { searchHotData } from "api/home.js"
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      offset: 10,
      suggests: [],
      query: "",
      searchHots: [],
    };
  },
  methods: {
    selectHistory(item){
      this.$refs.searchBox.setQuery(item);
    },
    selectHot(item) {
      this.query = item.first;
      this.$refs.searchBox.setQuery(item.first);
    },
    queryChange(query) {
      this.query = query;
    },
    fetchSearchHot() {
      searchHotData().then(res => {
        this.searchHots = res.data.result.hots;
      });
    }
  },
  computed: {
    ...mapGetters([
      "searchHistory"
    ])
  },
  created() {
    this.fetchSearchHot();
  },
  components: {
    SearchBox,
    Suggest,
    SearchHot,
    SearchHistory
  }
};
</script>
<style lang="scss" scoped>
@import "style/varibal.scss";
.search {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f3f4;
  z-index: 3;
  .scroll {
    position: fixed;
    top: 45px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.search-enter-active, .search-leave-active {
  transition: all 0.3s;
}
.search-enter, .search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
.slider-enter-active, .slider-leave-active {
  transition: all 0.3s;
}
.slider-enter, .slider-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>
