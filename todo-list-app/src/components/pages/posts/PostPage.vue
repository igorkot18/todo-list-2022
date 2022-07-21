<template>
    <div class="container post-page">
        <div class="row post-page__table">
            <div class="col-xxl-12 post-page__item">ID</div>
            <div class="col-xxl-12 post-page__item">{{post.id}}</div>
            <div class="col-xxl-12 post-page__item">Title</div>
            <div class="col-xxl-12 post-page__item">{{post.title}}</div>
            <div class="col-xxl-12 post-page__item">Description</div>
            <div class="col-xxl-12 post-page__item">{{post.body}}</div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'PostPage',
  data() {
    return {
      post: {},
      errorMessage: '',
      postId: this.$route.params.id
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
        console.log(data);
      } catch(error) {
        this.errorMessage = error.message
      }
    },
  }
}
</script>