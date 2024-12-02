<template>
    <div>
      <h1>Bind Game Character</h1>
      <input v-model="nickname" placeholder="Enter Nickname" />
      <button @click="bindPlayer">Bind</button>
      <button @click="$emit('close')">Close</button>
      <p v-if="bindMessage">{{ bindMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BindPlayer',
    data() {
      return {
        nickname: '', // 用户输入的游戏昵称
        bindMessage: '', // 绑定结果的反馈信息
        loggedInUser: localStorage.getItem('loggedInUser') // 从 localStorage 获取已登录用户的用户名
      };
    },
    methods: {
      async bindPlayer() {
        try {
          if (!this.loggedInUser) {
            this.bindMessage = 'You must be logged in to bind a player.';
            return;
          }
          const response = await axios.post(
            'http://localhost:5000/bind/',
            { nickname: this.nickname },
            {
              headers: {
                username: this.loggedInUser // 将用户名添加到请求头
              }
            }
          );
          this.bindMessage = response.data.message || 'Character bound successfully!';
        } catch (error) {
          this.bindMessage = error.response?.data?.message || 'Binding failed. Please try again.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  
  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    font-size: 14px;
    width: 100%;
  }
  
  p {
    color: red;
  }
  </style>
  