<template>
  <section class="post">
    <template v-if="loading">
      <div class="container d-flex justify-content-center mt-5">
        <LoaderComponent />
      </div>
    </template>

    <template v-else-if="posts.length">
      <div class="container d-flex justify-content-center mb-3 post__title">
        <h1>Posts</h1>
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

      <div class="container post__container">
        <div class="row">
          <div 
            v-for="post in lists"
            :key="post.id" 
            class="d-flex col-lg-6"
          >
            <div class="col-lg-12 post__content">
              <div class="d-flex">
                <div class="post__image col-6"></div>
                <div class="col-6">
                  <div><h2 class="post__content-title">{{post.title}}</h2></div>
                  <div><p class="post__content-description">{{truncate(post.body, 100)}}</p></div>
                </div>
              </div>
              <router-link :to="`/post/${post.id}`">Read more..</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center mt-2">
        <b-pagination
          :total-rows="totalRows" 
          v-model="currentPage"
          :per-page="perPage"
        /> 
      </div>
    </template>

    <template v-else-if="!posts.length">
      <div class="errorMessage">{{errorMessage}}</div>
    </template>

    <template v-else>
      <div class="errorMessage"><p>No posts</p></div>
    </template>
  </section>
</template>

<script>
import LoaderComponent from '../../loader/LoaderComponent.vue';

const axios = require('axios');

import './posts.scss';

export default {
  name: 'PostsComponent',
  components: {
    LoaderComponent,
  },
  computed: {
    filteredPosts() {
      if (!this.filterInputText) {
        return this.posts
      } else {
        return this.posts.filter(item => item.body.includes(this.filterInputText) || item.title.includes(this.filterInputText))
      }
    },
    lists () {
      return this.filteredPosts.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    totalRows () {
      return this.filteredPosts.length
    }
  },
  data() {
    return {
      filterInputText: '',
      posts: [],
      errorMessage: '',
      currentPage: 1,
      perPage: 2,
      loading: true,

    }
  },
  mounted() {
    this.getPosts(); 
  },
  methods: {
    async getPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        if (response.data) {
          this.posts = response.data;
        }
        this.loading = false;
      } catch(error) {
        console.error(error)
        this.errorMessage = error.message
        this.loading = false;
      }
    },
    truncate(str, maxlength) {
      return (str.length > maxlength) ?
        str.slice(0, maxlength - 1) + '…' : str;
    },
  },
}
</script>