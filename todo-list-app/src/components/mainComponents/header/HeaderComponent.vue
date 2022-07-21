<template>
    <header class='header'>
      <div class='d-flex justify-content-between w100'>
        <span class="header__nav-bar">Todo List App</span>
        <template v-if="getLoginData.isAuth">
          <NavBar />
        </template>
      </div>
    </header>
</template>

<script>
import './header.scss';
import NavBar from '../../navBar/NavBar.vue';
import {mapGetters} from 'vuex';

export default {
    name: "HeaderComponent",
    components: { NavBar },
    computed: mapGetters(['getLoginData']),
}
</script>