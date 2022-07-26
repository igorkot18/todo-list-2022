<template>
    <header class='header'>
      <div class='d-flex justify-content-between w100 header__content'>
        <img class="header__logo" src="../../../images/logo.png">
        <template v-if="getLoginData.isAuth">
        <div class="d-flex header__nav">
          <NavBar />
            <div class="d-flex align-items-center">
              <button @click=logoutClick type="button" class="btn btn-outline-dark">Log out</button>
            </div>
          </div>
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