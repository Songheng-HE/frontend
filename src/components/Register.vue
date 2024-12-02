<template>
    <div>
      <!-- 注册按钮 -->
      <button v-if="!showForm" @click="showForm = true">注册</button>
  
      <!-- 注册表单 -->
      <div v-if="showForm">
        <h1>注册</h1>
        <input v-model="username" placeholder="用户名" />
        <input v-model="password" type="password" placeholder="密码" />
  
        <!-- 选择会员时长 -->
        <div>
          <label for="membership">选择会员时长：</label>
          <select id="membership" v-model="membership">
            <option value="1">1 个月</option>
            <option value="3">3 个月</option>
            <option value="12">1 年</option>
          </select>
        </div>
  
        <!-- 按钮区 -->
        <div>
          <button @click="register">提交</button>
          <button @click="showForm = false">取消</button>
        </div>
  
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        showForm: false, // 控制表单显示
        username: '',
        password: '',
        membership: '1', // 默认选择 1 个月
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          // 提交注册信息
          const response = await axios.post('http://localhost:5000/register', {
            username: this.username,
            password: this.password,
            membership: this.membership
          });
          this.message = response.data.message || '注册成功！';
        } catch (error) {
          this.message = error.response?.data?.message || '注册失败，请重试。';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式定义 */
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  
  input,
  select {
    display: block;
    margin: 10px 0;
    padding: 8px;
    font-size: 14px;
    width: 100%;
  }
  
  p {
    color: red;
    margin-top: 10px;
  }
  </style>
  