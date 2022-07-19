import router from "../../router";

export default {
    actions: {
        postLoginData(ctx, userInfo) {
            ctx.commit('updateLoginData', userInfo)
            router.push('/posts')
        }
    },
    mutations: {
        updateLoginData(state, userInfo) {
            state.loginData.isAuth = true;
            state.loginData.userInfo = userInfo;
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