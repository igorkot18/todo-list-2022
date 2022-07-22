<template>
  <section class="post">
    <template v-if="loading">
      <div class="container d-flex justify-content-center mt-5">
        <LoaderComponent />
      </div>
    </template>

    <template v-else-if="posts.length">
      <div class="container d-flex justify-content-center mt-1">
        <h1>Posts</h1>
      </div>
      <div class="d-flex justify-content-center">
        <input
          class="post__input container"
          type="text" 
          id="filterInput"
          placeholder="Write search params"
          v-model="filterInputText"
        >
      </div>
      <div
        class="container post__container"
        v-for="post in lists"
        :key="post.id"
      >
        <div class="row">
          <div class="col-lg-4"><h2>{{post.title}}</h2></div>
          <div class="col-lg-6"><p>{{truncate(post.body, 100)}}</p></div>
          <router-link :to="`/post/${post.id}`">Read more</router-link>
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
      perPage: 4,
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
        const data = await response.data;
        this.posts = data;
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