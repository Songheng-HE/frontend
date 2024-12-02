<template>
    <div class="player-troop-search">
      <h2>Search Player Troops</h2>
      <input 
        v-model="nickname" 
        placeholder="Enter Player's Nickname" 
      />
      <button @click="searchPlayerTroops">Search</button>
      <button @click="$emit('close')">Cancel</button>
  
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
      <div v-if="troops.length" class="troop-list">
        <h3>Troop Configurations for {{ nickname }}</h3>
        <ul>
          <li v-for="(troop, index) in troops" :key="index">
            General 1: {{ troop.general1 }}, 
            General 2: {{ troop.general2 }}, 
            General 3: {{ troop.general3 }}, 
            Power: {{ troop.power }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PlayerTroopSearch',
    data() {
      return {
        nickname: '', // 输入的玩家昵称
        troops: [], // 查询结果
        errorMessage: '', // 错误信息
      };
    },
    methods: {
      async searchPlayerTroops() {
        if (!this.nickname) {
          this.errorMessage = "Please enter a player's nickname.";
          return;
        }
  
        try {
          // 发起请求获取玩家部队信息
          const response = await axios.get(`http://localhost:5000/api/player-troops/${this.nickname}`);
          this.troops = response.data.troops;
          this.errorMessage = ''; // 清除错误信息
        } catch (error) {
          // 错误处理
          this.troops = [];
          if (error.response && error.response.status === 404) {
            this.errorMessage = 'The player does not exist.';
          } else {
            this.errorMessage = 'Failed to fetch player troops. Please try again.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .player-troop-search {
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    border-radius: 5px;
    width: 50%;
    margin: 0 auto;
  }
  
  input {
    display: block;
    margin: 10px 0;
    padding: 8px;
    font-size: 16px;
    width: 100%;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  .troop-list ul {
    list-style: none;
    padding: 0;
  }
  
  .troop-list li {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  </style>
  