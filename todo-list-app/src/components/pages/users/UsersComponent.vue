<template>
  <section class="users">
    <template>
      <div class="container user-card" v-for="user in users" :key="user.id">
        <div class="row">
          <div class="col-4">{{`Name: ${user.name}`}}</div>
          <div class="col-4">{{`Company: ${user.company.name}`}}</div>

          <b-button 
            class="col-4" 
            @click=showUserInfoById(user.id)
          >
            Show more info
          </b-button>
          <b-modal v-model="modalShow">
            <div class="container">
              <div class="row">
                <h3 class="col-12">
                  {{`Name: ${foundUserById.name}`}}
                </h3>
                <h4 class="col-12">
                  {{`Username: ${foundUserById.username}`}}
                </h4>
                <h4 class="col-12">
                  {{`Email: ${foundUserById.email}`}}
                </h4>
                <h4 class="col-12">
                  {{`Phone: ${foundUserById.phone}`}}
                </h4>
                <h4 class="col-12">
                  {{`Website: ${foundUserById.website}`}}
                </h4>
              </div>
            </div>
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
  data() {
    return {
      users: [],
      foundUserById: {},
      modalShow: false,
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
    showUserInfoById(id) {
      this.foundUserById = this.users.find(item => item.id === id)
      this.modalShow = !this.modalShow
    } 
  },
}
</script>