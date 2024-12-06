<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav>
      <ul>
        <li><router-link to="/register">Register</router-link></li>
        <li><button @click="showLogin = true" class="nav-button">Login</button></li>
        <li v-if="loggedInUser">
          Welcome, {{ loggedInUser }}!
          <button @click="logout" class="nav-button">Logout</button>
        </li>
      </ul>
    </nav>

    <!-- 路由页面 -->
    <router-view />

    <!-- 绑定游戏角色按钮 -->
    <div class="bind-button" v-if="loggedInUser">
      <button @click="showBindPlayer = true">Bind Player Account</button>
    </div>

    <!-- 绑定游戏角色表单 -->
    <div v-if="showBindPlayer" class="bind-container">
      <BindPlayer @close="showBindPlayer = false" />
    </div>

    <!-- Team Merit Rank Button -->
    <div class="team-rank-button" v-if="loggedInUser">
      <button @click="showTeamMeritRank = true">Team Merit Rank</button>
    </div>

    <!-- Team Merit Rank -->
    <div v-if="showTeamMeritRank" class="team-rank-container">
      <TeamMeritRank @close="showTeamMeritRank = false" />
    </div>

    <!-- Personal Troop Configuration Button -->
    <div class="personal-troop-button" v-if="loggedInUser">
      <button @click="showPersonalTroops = true">Personal Troop Configuration</button>
    </div>

    <!-- Personal Troop Configuration -->
    <div v-if="showPersonalTroops" class="personal-troop-container">
      <PersonalTroops @close="showPersonalTroops = false" />
    </div>

    <!-- Players Troop Search Button -->
    <div class="player-troop-search-button" v-if="loggedInUser">
      <button @click="showPlayerTroopSearch = true">Players Troop Search</button>
    </div>

    <!-- Players Troop Search -->
    <div v-if="showPlayerTroopSearch" class="player-troop-search-container">
      <PlayerTroopSearch @close="showPlayerTroopSearch = false" />
    </div>

    <!-- Battle Field Data Button -->
    <div class="battle-field-data-button" v-if="loggedInUser">
      <button @click="showBattleFieldData = true">Battle Field Data</button>
    </div>

    <!-- Battle Field Data -->
    <div v-if="showBattleFieldData" class="battle-field-data-container">
      <BattleFieldData @close="showBattleFieldData = false" />
    </div>

    <!-- Troop Usage Button -->
    <div class="troop-usage-button" v-if="loggedInUser">
      <button @click="showTroopUsage = true">Troop Usage</button>
    </div>

    <!-- Troop Usage -->
    <div v-if="showTroopUsage" class="troop-usage-container">
      <TroopUsage @close="showTroopUsage = false" />
    </div>

    <!-- 登录表单 -->
    <div v-if="showLogin">
      <UserLogin @close="showLogin = false" @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>





<script>
import BindPlayer from './components/BindPlayer.vue';
import UserLogin from './components/Login.vue';
import TeamMeritRank from './components/TeamMeritRank.vue'; // 导入团队战功排行榜组件
import PersonalTroops from './components/PersonalTroops.vue'; // 导入个人部队组件
import PlayerTroopSearch from './components/PlayerTroopSearch.vue'; // 导入玩家部队查询组件
import BattleFieldData from './components/BattleFieldData.vue'; // 导入战场数据考勤组件
import TroopUsage from './components/TroopUsage.vue'; // 导入部队排行榜组件

export default {
  name: 'App',
  components: {
    BindPlayer,
    UserLogin,
    TeamMeritRank, // 注册团队战功排行榜组件
    PersonalTroops, // 注册个人部队组件
    PlayerTroopSearch, // 注册玩家部队查询组件
    BattleFieldData, // 注册战场数据考勤组件
    TroopUsage, // 注册部队排行榜组件
  },
  data() {
    return {
      showBindPlayer: false, // 控制绑定角色表单的显示状态
      showLogin: false, // 控制登录表单的显示状态
      showPersonalTroops: false, // 控制个人部队信息的显示状态
      showTeamMeritRank: false, // 控制团队战功排行榜的显示状态
      showPlayerTroopSearch: false, // 控制玩家部队查询的显示状态
      showBattleFieldData: false, // 控制战场数据考勤的显示状态
      showTroopUsage: false, // 控制部队排行榜的显示状态
      loggedInUser: null, // 当前登录用户的用户名
    };
  },
  methods: {
    handleLoginSuccess(username) {
      // 登录成功后设置当前登录用户
      this.loggedInUser = username;
      this.showLogin = false; // 隐藏登录表单
      localStorage.setItem('loggedInUser', username); // 保存到本地存储
    },
    logout() {
      // 登出逻辑
      this.loggedInUser = null;
      localStorage.removeItem('loggedInUser'); // 移除本地存储的登录状态
    },
    toggleTeamMeritRank() {
      // 切换团队战功排行榜显示状态
      this.showTeamMeritRank = !this.showTeamMeritRank;
    },
    togglePersonalTroops() {
      // 切换个人部队信息显示状态
      this.showPersonalTroops = !this.showPersonalTroops;
    },
    togglePlayerTroopSearch() {
      // 切换玩家部队查询的显示状态
      this.showPlayerTroopSearch = !this.showPlayerTroopSearch;
    },
    toggleBattleFieldData() {
      // 切换战场数据考勤显示状态
      this.showBattleFieldData = !this.showBattleFieldData;
    },
    toggleTroopUsage() {
      // 切换部队排行榜显示状态
      this.showTroopUsage = !this.showTroopUsage;
    },
  },
  mounted() {
    // 页面刷新后恢复登录状态
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      this.loggedInUser = savedUser;
    }
  },
};
</script>




<style>
/* 样式 */
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
}

nav li {
  margin-right: 15px;
}

.nav-button {
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  font-weight: bold;
}

.nav-button:hover {
  color: darkblue;
}

.bind-button {
  margin-top: 20px;
  text-align: center;
}

.bind-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  width: 50%;
  margin: 0 auto;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

/* 新增团队战功排行按钮样式 */
.team-rank-button {
  margin-top: 20px;
  text-align: center;
}

.team-rank-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}

.team-rank-container ul {
  list-style: none;
  padding: 0;
}

.team-rank-container li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.team-rank-container li span {
  font-weight: bold;
}

/* Personal Troop Configuration Button */
.personal-troop-button {
  margin-top: 20px;
  text-align: center;
}

.personal-troop-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}

.personal-troop-container ul {
  list-style: none;
  padding: 0;
}

.personal-troop-container li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Players Troop Search 按钮样式 */
.player-troop-search-button {
  margin-top: 20px;
  text-align: center;
}

.player-troop-search-button button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.player-troop-search-button button:hover {
  background-color: #0056b3;
}

/* Players Troop Search 容器样式 */
.player-troop-search-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}

.player-troop-search-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.player-troop-search-container input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 14px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.player-troop-search-container button {
  margin: 10px 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.player-troop-search-container button:first-of-type {
  background-color: #28a745;
  color: white;
}

.player-troop-search-container button:first-of-type:hover {
  background-color: #218838;
}

.player-troop-search-container button:last-of-type {
  background-color: #dc3545;
  color: white;
}

.player-troop-search-container button:last-of-type:hover {
  background-color: #c82333;
}

.player-troop-search-container .error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.player-troop-search-container .troop-list ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.player-troop-search-container .troop-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player-troop-search-container .troop-list li span {
  font-weight: bold;
}

/* Battle Field Data 按钮样式 */
.battle-field-data-button {
  margin-top: 20px;
  text-align: center;
}

.battle-field-data-button button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.battle-field-data-button button:hover {
  background-color: #0056b3;
}

/* Battle Field Data 容器样式 */
.battle-field-data-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}

.battle-field-data-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.battle-field-data-container select {
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 14px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.battle-field-data-container button {
  margin: 10px 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.battle-field-data-container button:first-of-type {
  background-color: #28a745;
  color: white;
}

.battle-field-data-container button:first-of-type:hover {
  background-color: #218838;
}

.battle-field-data-container button:last-of-type {
  background-color: #dc3545;
  color: white;
}

.battle-field-data-container button:last-of-type:hover {
  background-color: #c82333;
}

/* 表格样式 */
.battle-field-data-container table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.battle-field-data-container table th,
.battle-field-data-container table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.battle-field-data-container table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.battle-field-data-container table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 错误提示信息样式 */
.battle-field-data-container .error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
/* Troop Usage 按钮样式 */
.troop-usage-button {
  margin-top: 20px;
  text-align: center;
}

.troop-usage-button button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.troop-usage-button button:hover {
  background-color: #0056b3;
}

/* Troop Usage 容器样式 */
.troop-usage-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
}

.troop-usage-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* 按钮组样式 */
.troop-usage-container .button-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.troop-usage-container .button-group button {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.troop-usage-container .button-group button:hover {
  background-color: #007bff;
  color: white;
}

/* 排行榜表格样式 */
.troop-usage-container table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.troop-usage-container table th,
.troop-usage-container table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.troop-usage-container table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.troop-usage-container table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 错误提示信息样式 */
.troop-usage-container .error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

/* Loading 状态样式 */
.troop-usage-container .loading {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #555;
}
</style>