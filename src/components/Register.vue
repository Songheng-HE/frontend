<template>
  <div>
    <h1>register</h1>
    <input v-model="username" placeholder="username" />
    <input v-model="password" type="password" placeholder="password" />
    <select v-model="membership">
      <option value="1">1 month</option>
      <option value="3">3 month</option>
      <option value="12">1 year</option>
    </select>
    <button @click="register">Submit</button>
    <button @click="cancel">Cancel</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      password: '',
      membership: '1',
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/register/', {
          username: this.username,
          password: this.password,
          membership: this.membership
        });
        this.message = response.data.message || 'Success!';
        // 注册成功后，跳转到首页
        if (response.status === 201) {
          setTimeout(() => {
            this.$router.push('/'); // 使用 Vue Router 跳转到首页
          }, 5000); // 延迟 1 秒，显示成功信息
        }
      } catch (error) {
        this.message = error.response?.data?.message || 'Fail! The same username!';
      }
    },
    cancel() {
      this.$router.push('/'); // 取消后跳转到首页
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
}
</style>
