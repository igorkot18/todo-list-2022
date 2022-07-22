import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
    reducer: (state) => ({ 
        authentication: {
            loginData: state.authentication.loginData
        }
     }),
});

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        authentication,
    },
    plugins: [vuexLocal.plugin]
})