<template>
    <section class="login-form-page">
        <div class="container login-form">
            <div class="row d-flex justify-content-end">
                <div class="col-lg-6 d-flex align-items-center login-form__data">
                    <div class="col-sm-6 d-flex justify-content-center login-form__title">
                        <h1>Welcome back</h1>
                    </div>
                    <form class="col-sm-6" @submit.prevent="isValid ? handleSubmit(userInfo) : showToast()">
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
                        
                        <button type="submit" class="btn btn-outline-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex';

import './loginForm.scss';

  export default {
    name: 'LoginForm',
    computed: {
        isValid() {
            if (this.userInfo.password.length && this.userInfo.password.length < 8) {
                return false
            }
            else if (!/[a-zа-яё]/i.test(this.userInfo.password))  {
                return false
            }
            else if(this.userInfo.password.length >= 8 && /[a-zа-яё]/i.test(this.userInfo.password)) {
                return true
            } else return true
        }
    },
    methods: {
        ...mapActions({
            handleSubmit: 'postLoginData'
        }),
        showToast() {
            if (this.userInfo.password.length && this.userInfo.password.length < 8) {
              this.$toastr.e("Password must contain at least 8 characters");
            }
            else if (!/[a-zа-яё]/i.test(this.userInfo.password))  {
                this.$toastr.e("Password must contain at least 1 letter");
            }
        }
    },
    data() {
        return {
            userInfo: {
                email: '',
                password: '',
            },
        }
    }
  }
</script>