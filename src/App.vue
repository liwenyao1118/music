<template>
  <div id="app">
    <top-bar></top-bar>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import TopBar from 'components/top-bar/TopBar'
import Player from 'components/player/Player'
export default {
    components: {
        TopBar,
        Player
    }
}
</script>