<template>
  <el-col :span="18" class="main-pane">
    <el-row class="tac member-box">
      <el-col :span="18">
        <p class="member-name">{{ memberName }}<i class="el-icon-arrow-down el-icon--right" v-if="!isPlayground"></i></p>
      </el-col>
    </el-row>
    <div class="content">
      <dialog-box v-for="(value, index) in msg" :key="index" :message="value.message" :type="value.type" :isPlayground="isPlayground" :username="value.username"></dialog-box>
    </div>
    <el-row class="tac input-bar">
      <el-col :span="16">
        <el-input v-model.trim="input" placeholder="请输入聊天内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" class="send-btn" @click="send">发送</el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import dialogBox from './dialogBox'
import { Message } from 'element-ui'

export default {
  name: 'main-pane',
  components: {
    dialogBox,
  },
  computed: {
    memberName () {
      return this.$route.params.name || 
        (/playground/.test(this.$route.path) ? 'playground' : JSON.parse(decodeURI(document.cookie).match(/(?:^| )userInfo=(.*?)(?:;|$)/)[1]).username)
    },
    isPlayground () {
      return /playground/.test(this.$route.path)
    }
  },
  data () {
    return {
      input: '',
      msg: [],
      type: '',
    }
  },
  methods: {
    send () {
      if(this.input) {
        this.msg.push({
          message: this.input,
          type: 'right',
          username: '',
        });

        this.socket.emit('chat message', this.input);

        this.input = '';
      } else {
        Message({
          message: '你没有输入聊天信息哦！',
          type: 'warning'
        });
      }
    },
  },
  mounted () {
    this.socket.on('chat message', (data) => {
      this.msg.push({
        message: data.msg,
        type: 'left',
        username: data.username,
      })
    })
  },
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
