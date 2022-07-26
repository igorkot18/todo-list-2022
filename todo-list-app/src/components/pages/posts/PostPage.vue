<template>
    <section class="container post-page">
      <template v-if="loading">
        <div class="container d-flex justify-content-center mt-5">
          <LoaderComponent />
        </div>
      </template>

      <template v-else>
        <div class="row">
          <div class="col-lg-8 post-page__table">
            <div><h1>{{post.title}}</h1></div>
            <div><p>{{post.body}}</p></div>
          </div>
          <div class="col-lg-4"><img class="post-page__image" src='../../../images/lionel-messi.jpg'/></div>
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