<template>
  <el-col :span="6" class="sidebar">
    <div class="self-info">
      {{ selfName }}
    </div>
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu :index="index + ''" v-for="(group, key, index) in groups" :key="key">
        <template slot="title">{{ key }}</template>
        <el-menu-item :index="`${index}-${subindex}`" v-for="(member, subindex) in group" :key="subindex">
          <router-link :to="`/member/${member}`">{{ member }}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'side-bar',
  data () {
    return {
      groups: JSON.parse(decodeURI(document.cookie).match(/(?:^| )userInfo=(.*?)(?:;|$)/)[1]).groups,
      selfName: JSON.parse(decodeURI(document.cookie).match(/(?:^| )userInfo=(.*?)(?:;|$)/)[1]).username,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.sidebar {
  height: 100%;
  overflow: auto;
  background-color: #324057;
}
.sidebar a {
  color: #bfcbd9;
  text-decoration: none;
}
.self-info {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  background-color: #E1E4E4;
}
</style>
