<template>
    <div>
      <h1>Team Merit Rankings</h1>
      <button @click="fetchTeamMeritRank">Load Team Merit Rankings</button>
      <ul v-if="teams.length">
        <li v-for="(team, index) in teams" :key="team.TeamID">
          {{ index + 1 }}. {{ team.TeamName }} - Merit: {{ team.Merit }}
        </li>
      </ul>
      <p v-if="!teams.length && fetched">No teams found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TeamMeritRank',
    data() {
      return {
        teams: [],
        fetched: false
      };
    },
    methods: {
      async fetchTeamMeritRank() {
        try {
          const response = await axios.get('http://localhost:5000/team-merit-rank/');
          this.teams = response.data.teams;
          this.fetched = true;
        } catch (error) {
          console.error('Error fetching team merit rankings:', error);
          this.teams = [];
          this.fetched = true;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f0f0f0;
  }
  </style>
  