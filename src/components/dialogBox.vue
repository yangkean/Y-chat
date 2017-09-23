<template>
  <div>
    <div class="message" :class="classObj">
      <span v-if="isDisplay" class="nickname">{{ username }}</span>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-box',
  props: ['message', 'type', 'username', 'isPlayground'],
  computed: {
    classObj () {
      return {
        left: this.type === 'left',
        right: this.type === 'right',
      }
    },
    isDisplay () {
      return this.isPlayground && this.username
    }
  }
}
</script>

<style>
.message {
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  max-width: 350px;
  border: 1px solid #D3DCE6;
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  position: relative;
  word-break: break-all;
}
.nickname {
  position: absolute;
  top: -25px;
  left: 0;
  font-size: 1em;
  color: #737373;
}
.left {
  background-color: #F9FAFC;
  float: left;
  clear: both;
}
.right {
  background-color: #35BD27;
  float: right;
  clear: both;
}
</style>
