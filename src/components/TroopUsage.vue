<template>
    <div class="troop-usage">
      <h2>Troop Rankings</h2>
  
      <!-- 按钮选择 -->
      <div class="button-group">
        <button @click="fetchTroopWinRateRankings">Troop Win Rate Rankings</button>
        <button @click="fetchTroopCasualtyRankings">Troop Casualty Ratio Rankings</button>
        <button @click="fetchTroopUsageRankings">Troop Usage Rankings</button>
      </div>
  
      <!-- 排行榜结果 -->
      <div v-if="rankings.length" class="ranking-results">
        <h3>{{ rankingTitle }}</h3>
        <ul>
          <li v-for="(troop, index) in rankings" :key="index">
            {{ index + 1 }}. General 1: {{ troop.general1 }}, 
            General 2: {{ troop.general2 }}, 
            General 3: {{ troop.general3 }},
            <span v-if="rankingTitle.includes('Win Rate')">Win Rate: {{ troop.winRate }}%</span>
            <span v-if="rankingTitle.includes('Casualty Ratio')">Casualty Ratio: {{ troop.casualtyRatio }}</span>
            <span v-if="rankingTitle.includes('Usage')">Usage Count: {{ troop.usageCount }}</span>
          </li>
        </ul>
      </div>
  
      <!-- 错误信息 -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TroopUsage',
    data() {
      return {
        rankings: [], // 排行榜数据
        rankingTitle: '', // 当前排行榜标题
        errorMessage: '', // 错误信息
      };
    },
    methods: {
      async fetchTroopWinRateRankings() {
        try {
          const response = await axios.get('http://localhost:5000/api/troop-win-rate-rankings');
          this.rankings = response.data.rankings;
          this.rankingTitle = 'Top 10 Troops by Win Rate';
          this.errorMessage = '';
        } catch (error) {
          this.rankings = [];
          this.errorMessage = 'Failed to fetch win rate rankings.';
          console.error(error);
        }
      },
      async fetchTroopCasualtyRankings() {
        try {
          const response = await axios.get('http://localhost:5000/api/troop-casualty-rankings');
          this.rankings = response.data.rankings;
          this.rankingTitle = 'Top 10 Troops by Casualty Ratio';
          this.errorMessage = '';
        } catch (error) {
          this.rankings = [];
          this.errorMessage = 'Failed to fetch casualty ratio rankings.';
          console.error(error);
        }
      },
      async fetchTroopUsageRankings() {
        try {
          const response = await axios.get('http://localhost:5000/api/troop-usage-rankings');
          this.rankings = response.data.rankings || [];
          this.rankingTitle = 'Top 10 Troops by Usage Count';
          this.errorMessage = '';
        } catch (error) {
          this.rankings = [];
          this.errorMessage = 'Failed to fetch usage rankings.';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .troop-usage {
    text-align: center;
    margin: 20px;
  }
  
  .button-group {
    margin: 20px 0;
  }
  
  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .ranking-results {
    margin-top: 20px;
  }
  
  .ranking-results ul {
    list-style: none;
    padding: 0;
  }
  
  .ranking-results li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
  }
  </style>
  