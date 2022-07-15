<template>
    <div class="login-form-page">
        <div class="container login-form">
            <div class="row">
                <div class="col-12 d-flex justify-content-center login-form__title">
                    <h1>Login</h1>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-6">
                    <form @submit.prevent="handleSubmit(userInfo)">
                        <div class="mb-3 login-form__username">
                            <label 
                                for="email" 
                                class="form-label"
                            >
                                Enter email
                            </label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                placeholder="Email" 
                                required
                                v-model="userInfo.email"
                            >
                        </div>
                        
                        <div class="mb-3 login-form__password">
                            <label 
                                for="password" 
                                class="form-label"
                            >
                                Enter password
                            </label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                placeholder="Password" 
                                required
                                v-model="userInfo.password"
                            >
                        </div>
                        
                        <button type="submit" class="btn btn-outline-success w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

import './loginForm.scss';

  export default {
    name: 'LoginForm',
    computed: mapGetters(['getLoginData']),
    methods: {
        handleSubmit(userInfo) {
            this.$store.dispatch('postLoginData', userInfo);
            this.$router.push('/posts')
        },
    },
    data() {
        return {
            userInfo: {
                email: '',
                password: '',
                isAuth: '',
            }
        }
    }
  }
</script>