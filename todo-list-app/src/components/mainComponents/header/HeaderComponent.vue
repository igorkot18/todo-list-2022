<template>
    <header class='header'>
      <div class='d-flex justify-content-between w100'>
        <span class="header__nav-bar">Todo List App</span>
        <template v-if="getLoginData.isAuth">
          <NavBar />
          <b-button @click=logoutClick() variant="warning">Log out</b-button>
        </template>
      </div>
    </header>
</template>

<script>
import './header.scss';
import NavBar from '../../navBar/NavBar.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "HeaderComponent",
    components: { NavBar },
    methods: mapActions({
        logoutClick: 'userLogout'
    }),
    computed: mapGetters(['getLoginData']),
}
</script>