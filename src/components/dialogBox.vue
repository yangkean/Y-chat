<template>
  <div class="message" :class="classObj">{{ message }}</div>
</template>

<script>
export default {
  name: 'dialog-box',
  props: ['message', 'type'],
  computed: {
    classObj () {
      return {
        left: this.type === 'left',
        right: this.type === 'right',
      }
    },
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
  margin: 10px 0;
}
.left {
  background-color: #F9FAFC;
  float: left;
  clear: right;
}
.right {
  background-color: #35BD27;
  float: right;
  clear: left;
}
</style>
