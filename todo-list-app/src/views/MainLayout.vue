<template>
  <div id="root">
    <HeaderComponent />
    <main>
      <router-view></router-view>
    </main>
    <FooterComponent />
</div>
</template>

<script>
import HeaderComponent from '../components/mainComponents/header/HeaderComponent.vue';
import FooterComponent from '../components/mainComponents/footer/FooterComponent.vue';

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
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background: url(../images/image.svg) no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>