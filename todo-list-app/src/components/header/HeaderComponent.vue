<template>
    <header class='header'>
      <div class='header__info'>
        <span class="header__text">Todo List App</span>
        <NavBar />
      </div>
    </header>
</template>

<script>
import './header.scss';
import NavBar from '../navBar/NavBar.vue';

export default {
    name: "HeaderComponent",
    components: { NavBar }
}
</script>