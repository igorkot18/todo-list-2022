<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div>
            <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <template v-if="navBarData">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto text-center">
                        <li 
                            v-for="item in navBarData"
                            :key="item.id"  
                            class="nav-item"
                        >
                            <router-link class="nav-link" :to="item.to">{{item.label}}</router-link>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </nav>
</template>

<script>
import './navBar.scss';

export default {
    name: 'NavBar',
    data: () => ({
        navBarData: [
            {
               id: 0,
               to: "/posts",
               label: "POSTS" 
            },
            {
               id: 1,
               to: "/todos",
               label: "TODOS" 
            },
            {
               id: 2,
               to: "/users",
               label: "USERS" 
            },
        ]
    }),
}
</script>