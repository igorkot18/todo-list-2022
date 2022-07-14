<template>
  <div id="root">
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from '../components/header/HeaderComponent.vue'
import FooterComponent from '../components/footer/FooterComponent.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #d1cac5;
  }
</style>