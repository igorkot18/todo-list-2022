import router from "../../router";

export default {
    actions: {
        postLoginData(ctx, userInfo) {
            ctx.commit('updateLoginData', userInfo)
            router.push('/posts')
        },

        userLogout({ commit }) {
            commit('logoutData')
        }
    },
    mutations: {
        updateLoginData(state, userInfo) {
            state.loginData.isAuth = true;
            state.loginData.userInfo = userInfo;
        },

        logoutData(state) {
            state.loginData.isAuth = false;
            state.loginData.userInfo.password = '';
            state.loginData.userInfo.email = '';
            router.push('/');
        }
    },
    state: {
        loginData: {
            isAuth: false
        }
    },
    getters: {
        getLoginData(state) {
            return state.loginData
        }
    },
}