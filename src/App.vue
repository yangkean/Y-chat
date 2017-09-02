<template>
  <div id="app">
    <el-row class="tac page">
      <side-bar></side-bar>
      <main-pane></main-pane>
    </el-row>
  </div>
</template>

<script>
import sideBar from './components/sideBar'
import mainPane from './components/mainPane'

export default {
  name: 'app',
  components: {
    sideBar,
    mainPane,
  }
}
</script>

<style>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}
.page {
  height: 100%;
}
</style>
