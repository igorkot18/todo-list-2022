<template>
    <section class="container post-page">
      <template v-if="loading">
        <div class="container d-flex justify-content-center mt-5">
          <LoaderComponent />
        </div>
      </template>

      <template v-else>
        <div class="container d-flex justify-content-center mt-1">
          <h1>Post</h1>
        </div>
        <div class="row post-page__table">
          <div class="col-lg-12 post-page__item"><h2>Title</h2></div>
          <div class="col-lg-12 post-page__item"><p>{{post.title}}</p></div>
          <div class="col-lg-12 post-page__item"><h2>Description</h2></div>
          <div class="col-lg-12 post-page__item"><p>{{post.body}}</p></div>
        </div>
      </template>
        
    </section>
</template>

<script>
import LoaderComponent from '../../loader/LoaderComponent.vue';

const axios = require('axios');

export default {
  name: 'PostPage',
  components: {
    LoaderComponent,
  },
  data() {
    return {
      post: {},
      errorMessage: '',
      postId: this.$route.params.id,
      loading: true,
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`);
        const data = await response.data;
        this.post = data;
        this.loading = false;
      } catch(error) {
        this.errorMessage = error.message
        this.loading = false;
      }
    },
  }
}
</script>