<template>
    <div>
      <h1>Personal Troop Configuration</h1>
      <button @click="fetchPersonalTroops">Load Personal Troops</button>
      <ul v-if="troops.length">
        <li v-for="(troop, index) in troops" :key="index">
          {{ index + 1 }}. Generals: {{ troop.general1 }}, {{ troop.general2 }}, {{ troop.general3 }} - Power: {{ troop.power }}
        </li>
      </ul>
      <p v-else>No personal troops found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PersonalTroops',
    data() {
      return {
        troops: []
      };
    },
    methods: {
      async fetchPersonalTroops() {
        try {
          const username = localStorage.getItem('loggedInUser'); // Get username from localStorage
          const response = await axios.get(`http://localhost:5000/api/personal-troops/${username}`);
          this.troops = response.data.troops;
        } catch (error) {
          console.error('Failed to fetch personal troops:', error);
          this.troops = [];
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
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
  }
  </style>
  