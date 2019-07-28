import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    // 存储token
    token: '',
    usern: '',
    namen: ''
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    del_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    set_user (state, usern) {
      state.usern = usern
      sessionStorage.usern = usern
    },
    set_name (state, namen) {
      state.namen = namen
      sessionStorage.namen = namen
    }
  }
})
