<template>
  <el-col :span="6" class="sidebar">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu :index="index + ''" v-for="(group, index) in groupNameList" :key="group.id">
        <template slot="title">{{ group.name }}</template>
        <el-menu-item :index="`${index}-${subindex}`" v-for="(member, subindex) in group.members" :key="subindex">
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
      groupNameList: [
        {
          name: '家庭',
          id: 'home',
          members: ['小明', '小红', '小刚']
        },
        {
          name: '朋友',
          id: 'friend',
          members: ['小明', '小红', '小刚']
        },
        {
          name: '同事',
          id: 'olleague',
          members: ['小明', '小红', '小刚']
        },
        {
          name: '同学',
          id: 'classmate',
          members: ['小明', '小红', '小刚']
        },
      ]
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
</style>
