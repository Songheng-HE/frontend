<template>
    <div class="login-modal">
      <div class="login-box">
        <h2>Login</h2>
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <div class="actions">
          <button @click="login">Login</button>
          <button @click="$emit('close')">Cancel</button>
        </div>
        <p v-if="loginMessage">{{ loginMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        username: '',
        password: '',
        loginMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', {
            username: this.username,
            password: this.password,
          });
          if (response.data.success) {
            this.$emit('login-success', this.username); // 通知父组件登录成功
            this.loginMessage = '';
          } else {
            this.loginMessage = response.data.message || 'Login failed.';
          }
        } catch (error) {
          this.loginMessage = error.response?.data?.message || 'Unable to login. Please try again.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-box {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    text-align: center;
  }
  .actions button {
    margin: 10px;
  }
  </style>
  