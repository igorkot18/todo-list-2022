<template>
  <section class="post">
    <template v-if="posts.length">
      <div class="container d-flex justify-content-between">
        <input
          type="text" 
          id="filterInput"
          placeholder="Write search params" 
          v-model="filterInputText"
        >
      </div>
      <div
        class="container post-container"
        v-for="post in lists"
        :key="post.id"
      >
        <div class="row">
          <div class="col-12">{{post.title}}</div>
        </div>
        <div class="row">
          <div class="col-12">{{truncate(post.body, 100)}}</div>
        </div>
        
        <button @click="showMoreInfo(post.id)" class="btn btn-success">Read more</button>
      </div>
      <b-pagination
          :total-rows="totalRows" 
          v-model="currentPage"
          :per-page="perPage"
        />
    </template>
    <template v-else-if="!posts.length">
      <div class="errorMessage">{{errorMessage}}</div>
    </template>
    <template v-else>
      <div class="errorMessage">No posts</div>
    </template>
  </section>
</template>

<script>
const axios = require('axios');
import './posts.scss';

export default {
  name: 'PostsComponent',
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
      } catch(error) {
        console.error(error)
        this.errorMessage = error.message
      }
    },
    truncate(str, maxlength) {
      return (str.length > maxlength) ?
        str.slice(0, maxlength - 1) + '…' : str;
    },
    showMoreInfo(id) {
      console.log(id);
    },
  },
}
</script>