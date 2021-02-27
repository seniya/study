import {
  apiSignIn
} from '@/api/apiAuth'

const state = {
  user: {
    userId: '',
    name: '',
    lv: 3,
    token: sessionStorage.getItem('TOKEN')
  },
  isLoadingSignIn: false,
  doneSignIn: false,
  errorSignIn: null
}

const getters = {
  getUser: state => {
    return state.user
  }
}

const mutations = {
  setToken (state, token) {
    state.user.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  setIsLoadingSignIn (state, isLoading) {
    state.isLoadingSignIn = isLoading
  },
  setDoneSignIn (state, isDone) {
    state.doneSignIn = isDone
  },
  setErrorSignIn (state, errorMsg) {
    state.errorSignIn = errorMsg
  }
}

const actions = {

  async SIGN_IN (context, payload) {
    context.commit('setIsLoadingSignIn', true)
    context.commit('setDoneSignIn', false)
    context.commit('setErrorSignIn', null)
    try {
      const { data } = await apiSignIn(payload)
      context.commit('setIsLoadingSignIn', false)
      context.commit('setDoneSignIn', true)
      context.commit('setUser', data)
      console.log('SIGN_IN data : ', data)
      sessionStorage.setItem('TOKEN', data.token)
      return true
    } catch (error) {
      context.commit('setIsLoadingSignIn', false)
      context.commit('setErrorSignIn', error.message)
      return false
    }
  },
  async SIGN_OUT (context, payload) {
    sessionStorage.removeItem('TOKEN')
    context.commit('setToken', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
