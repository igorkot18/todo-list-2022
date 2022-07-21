<template>
  <section class="users">
    <template v-if="loading">
      <div class="container d-flex justify-content-center mt-5">
        <LoaderComponent />
      </div>
    </template>

    <template v-else-if="users.length">
      <div class="container user-card" v-for="user in users" :key="user.id">
        <div class="row">
          <div class="col-xxl-4">{{`Name: ${user.name}`}}</div>
          <div class="col-xxl-5">{{`Company: ${user.company.name}`}}</div>
          <div class="col-xxl-3" >
            <b-button @click=showUserInfoById(user.id) class="w-100" variant="info">Show more info</b-button>
            <b-modal v-model="modalShow">
              <div class="container modal-block">
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
      </div>
    </template>

    <template v-else><p>No users</p></template>
  </section>
</template>

<script>
import LoaderComponent from '../../loader/LoaderComponent.vue';

const axios = require('axios');

import './users.scss';

export default {
  name: 'PostsComponent',
  components: {
    LoaderComponent,
  },
  data() {
    return {
      users: [],
      foundUserById: {},
      modalShow: false,
      loading: true,
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
        this.loading = false;
      } catch(error) {
        console.error(error)
        this.errorMessage = error.message
        this.loading = false;
      }
    },
    showUserInfoById(id) {
      this.foundUserById = this.users.find(item => item.id === id)
      this.modalShow = !this.modalShow
    } 
  },
}
</script>