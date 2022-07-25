<template>
  <section class="users">
    <template v-if="loading">
      <div class="container d-flex justify-content-center mt-5">
        <LoaderComponent />
      </div>
    </template>

    <template v-else-if="users.length">
      <div class="container d-flex justify-content-center mt-1">
        <h1>Users</h1>
      </div>

      <div class="d-flex justify-content-center container p-0">
        <div class="input-group p-0">
          <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
          </div>
          <input 
            v-model="filterInputText"
            type="text" 
            class="form-control" 
            placeholder="Enter username or company..." 
            aria-label="Username" 
            aria-describedby="basic-addon1"
          >
        </div>
      </div>

      <table class="container table table-hover table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">№</th>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Show more</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="user.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{user.name}}</td>
            <td>{{user.company.name}}</td>
            <td><i class="bi bi-aspect-ratio" @click=showUserInfoById(user.id)></i></td>
            <b-modal centered v-model="isModalShow">
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
          </tr>
        </tbody>

      </table>

      <div class="d-flex justify-content-center mt-2">
        <b-pagination
          :total-rows="totalRows" 
          v-model="currentPage"
          :per-page="perPage"
        />
      </div>

    </template>
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
      filterInputText: '',
      users: [],
      foundUserById: {},
      isModalShow: false,
      loading: true,
      currentPage: 1,
      perPage: 10,
    }
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    filteredUsers() {
      if (!this.filterInputText) {
        return this.users
      } else {
        return this.users.filter(item => item.name.includes(this.filterInputText) || item.company.name.includes(this.filterInputText))
      }
    },
    paginatedUsers () {
      return this.filteredUsers.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    totalRows () {
        return this.filteredUsers.length
    }
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
      this.isModalShow = !this.isModalShow
    } 
  },
}
</script>