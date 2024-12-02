<template>
  <div id="app">
    <UserRegister /> <!-- 正确使用 UserRegister 组件 -->
  </div>
</template>

<script>
import UserRegister from './components/Register.vue'; // 确保路径正确

export default {
  name: 'App',
  components: {
    UserRegister // 正确注册组件
  }
};
</script>

<style>
/* 添加样式（可选） */
</style>
