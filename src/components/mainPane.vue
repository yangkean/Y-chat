<template>
  <el-col :span="18" class="main-pane">
    <div class="content">
      <p v-for="n in 20" :key="n">{{ n }}</p>
    </div>
    <el-row class="tac input-bar">
      <el-col :span="16" :offset="6">
        <el-input v-model="input" placeholder="请输入聊天内容"></el-input>
      </el-col>
      <el-col :span="0">
        <el-button type="primary" class="send-btn">发送</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  name: 'main-pane',
  data () {
    return {
      input: ''
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
.content {
  padding-bottom: 50px;
}
.input-bar {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.send-btn {
  margin: 0 auto;
  display: block;
}
</style>
