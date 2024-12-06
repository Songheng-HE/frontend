<template>
  <div class="battle-field-data">
    <h2>Battle Field Data Attendance</h2>

    <!-- 工会选择 -->
    <div class="input-group">
      <label>Select Guilds:</label>
      <select v-model="selectedGuilds" multiple @change="fetchTeams">
        <option v-for="guild in guilds" :key="guild.GuildID" :value="guild.GuildID">{{ guild.GuildName }}</option>
      </select>
    </div>

    <!-- 团队选择 -->
    <div class="input-group">
      <label>Select Teams:</label>
      <select v-model="selectedTeams" multiple>
        <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
      </select>
    </div>

    <!-- 时间范围选择 -->
    <div class="input-group">
      <label>Select Time Range:</label>
      <select v-model="timeRange">
        <option value="past 12h">Past 12 Hours</option>
        <option value="past 24h">Past 24 Hours</option>
        <option value="past week">Past Week</option>
      </select>
    </div>

    <!-- 提交按钮 -->
    <button @click="submitAttendanceRequest">Submit</button>

    <!-- 考勤结果 -->
    <div v-if="attendance.length" class="attendance-results">
      <h3>Attendance Results</h3>
      <ul>
        <li v-for="(player, index) in attendance" :key="index">
          {{ index + 1 }}. {{ player.nickname }} - 
          Battles: {{ player.battle_count }}, 
          Lands Occupied: {{ player.lands_occupied }}, 
          Buildings Destroyed: {{ player.buildings_destroyed }}, 
          Casualty Ratio: {{ player.average_casualty_ratio.toFixed(2) }}, 
          Win Rate: {{ player.win_rate.toFixed(2) }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BattleFieldData',
  data() {
    return {
      guilds: [], // 工会列表
      teams: [], // 团队列表
      selectedGuilds: [], // 选中的工会
      selectedTeams: [], // 选中的团队
      timeRange: 'past 24h', // 时间范围
      attendance: [], // 考勤结果
      errorMessage: '', // 错误信息
    };
  },
  methods: {
    async fetchGuilds() {
      try {
        const response = await axios.get('http://localhost:5000/api/guilds');
        this.guilds = response.data.guilds;
      } catch (error) {
        this.errorMessage = 'Failed to fetch guilds.';
        console.error(error);
      }
    },
    async fetchTeams() {
      if (this.selectedGuilds.length > 0) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/teams/${this.selectedGuilds[0]}`
          );
          this.teams = response.data.teams;
        } catch (error) {
          this.errorMessage = 'Failed to fetch teams.';
          console.error(error);
        }
      } else {
        this.teams = [];
      }
    },
    async submitAttendanceRequest() {
      try {
        const response = await axios.post('http://localhost:5000/api/battle-attendance', {
          teams: this.selectedTeams,
          time_range: this.timeRange,
        });
        this.attendance = response.data.attendance;
        this.errorMessage = '';
      } catch (error) {
        this.attendance = []; // 错误时也确保它是数组
        this.errorMessage = 'Failed to fetch attendance data.';
        console.error(error.response?.data || error);
      }
    },
  },
  mounted() {
    this.fetchGuilds(); // 页面加载时获取工会列表
  },
};
</script>

<style scoped>
.battle-field-data {
  margin: 20px;
}
.input-group {
  margin: 10px 0;
}
select {
  width: 300px;
  margin: 10px 0;
  padding: 5px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
.attendance-results ul {
  list-style: none;
  padding: 0;
}
.attendance-results li {
  margin: 5px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.error-message {
  color: rgb(255, 0, 0);
  font-weight: bold;
}
</style>
