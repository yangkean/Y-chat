<template>
  <el-col :span="18" class="main-pane">
    <el-row class="tac member-box">
      <el-col :span="18">
        <p class="member-name">{{ memberName }}<i class="el-icon-arrow-down el-icon--right"></i></p>
      </el-col>
    </el-row>
    <div class="content">
      <dialog-box v-for="n in 1" :key="n" :message="msg" :type="'left'"></dialog-box>
      <dialog-box v-for="n in 1" :key="n" :message="msg" :type="'right'"></dialog-box>
      <dialog-box v-for="n in 1" :key="n" :message="msg" :type="'left'"></dialog-box>
      <dialog-box v-for="n in 1" :key="n" :message="msg" :type="'right'"></dialog-box>
    </div>
    <div class="placeholder"></div>
    <el-row class="tac input-bar">
      <el-col :span="16">
        <el-input v-model="input" placeholder="请输入聊天内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" class="send-btn">发送</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import dialogBox from './dialogBox'

export default {
  name: 'main-pane',
  components: {
    dialogBox,
  },
  computed: {
    memberName () {
      return this.$route.params.name || 'Sam Yang'
    }
  },
  data () {
    return {
      input: '',
      msg: '你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊',
      type: 'right',
    }
  }
}
</script>

<style>
.main-pane {
  height: 100%;
  background-color: #EFF2F7;
  background-image: url(../assets/logo.png);
  background-size: cover;
  overflow: auto;
}
.member-box {
  width: 100%;
  position: fixed;
  top: 0;
}
.member-name {
  line-height: 40px;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  color: #48576a;
}
.member-name i {
  cursor: pointer;
}
.content {
  padding: 40px 25px 50px;
}
.placeholder {
  width: 100%;
  height: 36px;
  float: left;
}
.input-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.send-btn {
  margin: 0 auto;
  display: block;
}
</style>
