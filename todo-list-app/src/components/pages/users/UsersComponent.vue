<template>
  <section class="users">
    <template>
      <div class="container user-card" v-for="user in users" :key="user.id">
        <div class="row">
          <div class="col-4">{{`Name: ${user.name}`}}</div>
          <div class="col-4">{{`Company: ${user.company.name}`}}</div>
          <b-button class="col-4" v-b-modal=user.id>Show more</b-button>

          <b-modal :id=user.id title="BootstrapVue">
            <p class="my-4">{{user.name}}</p>
            <p class="my-4">{{user.email}}</p>
          </b-modal>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
const axios = require('axios');
import './users.scss';

export default {
  name: 'PostsComponent',
  computed: {
    
  },
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    this.getUsers(); 
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = await response.data;
        this.users = data;
      } catch(error) {
        console.error(error)
        this.errorMessage = error.message
      }
    },  
  },
}
</script>