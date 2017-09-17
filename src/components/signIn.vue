<template>
  <el-dialog title="登录" :visible.sync="dialogFormVisible" :show-close="showClose">
    <el-form :model="form" class="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.pwd" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="check">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'

export default {
  methods: {
    check () {
      const fd = new FormData();
      fd.append('username', this.form.name);
      fd.append('pwd', this.form.pwd);

      fetch('http://localhost:3000/', {
        method: 'POST',
        body: fd,
        credentials: 'include', // allow sending cookies to other domains
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        if(data.login === 'success') {
          const self = this;

          Message({
            message: data.msg,
            type: 'success',
            duration: 2000,
            onClose () {
              self.$router.push('/home'); // redirect to homepage
            },
          });
        } else {
          Message({
            message: data.msg,
            type: 'warning'
          });
        }
      });
    },
  },
  data () {
    return {
      dialogFormVisible: true,
      showClose: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        pwd: '',
      }
    }
  }
}
</script>

<style>
.form {
  width: 400px;
}
</style>
