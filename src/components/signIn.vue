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
      <el-button type="primary" @click="redirect">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  methods: {
    redirect () {
      const fd = new FormData();
      fd.append('username', this.form.name);
      fd.append('pwd', this.form.pwd);

      fetch('http://localhost:3000/', {
        method: 'POST',
        body: fd,
        credentials: 'include', // allow sending cookies to other domains
      })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);

        //location.replace(`${location.pathname}#/home`)
      });
    }
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
