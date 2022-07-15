export default {
    actions: {
        postLoginData(ctx, userInfo) {
            ctx.commit('updateLoginData', userInfo)
        }
    },
    mutations: {
        updateLoginData(state, userInfo) {
            userInfo.isAuth = true;
            state.loginData.push(userInfo);
        }
    },
    state: {
        loginData: []
    },
    getters: {
        getLoginData(state) {
            return state.loginData
        }
    },
}