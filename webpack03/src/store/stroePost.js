import {
  apiPosts,
  apiPostAdd,
  apiPostRead,
  apiPostUpdate,
  apiPostRemove
} from '@/api/apiPost'

import router from '@/router'

const state = {

  items: [],
  item: {
    id: '',
    title: '',
    content: '',
    image: '',
    author: '',
    createAt: 1609498726028
  },

  isLoadingPostItems: false,
  isLoadingPostAdd: false,
  isLoadingPostRead: false,
  isLoadingPostUpdate: false,
  isLoadingPostRemove: false,

  errorPostItems: null,
  errorPostAdd: null,
  errorPostRead: null,
  errorPostUpdate: null,
  errorPostRemove: null,

  donePostItems: false,
  donePostAdd: false,
  donePostRead: false,
  donePostUpdate: false,
  donePostRemove: false
}

const getters = {
  getItemsLength () {
    return state.items.length
  }
}

const mutations = {

  setItems (state, items_) {
    state.items = items_
  },
  reSetItems (state) {
    state.items = []
  },
  setItem (state, item_) {
    state.item = item_
  },
  reSetItem (state) {
    state.item = {
      id: '',
      title: '',
      content: '',
      image: '',
      author: '',
      createAt: 0
    }
  },

  setIsLoadingPostItems (state, isLoading) {
    state.isLoadingPostItems = isLoading
  },
  setIsLoadingPostAdd (state, isLoading) {
    state.isLoadingPostAdd = isLoading
  },
  setIsLoadingPostRead (state, isLoading) {
    state.isLoadingPostRead = isLoading
  },
  setIsLoadingPostUpdate (state, isLoading) {
    state.isLoadingPostUpdate = isLoading
  },
  setIsLoadingPostRemove (state, isLoading) {
    state.isLoadingPostRemove = isLoading
  },

  setErrorPostItems (state, errorMsg) {
    state.errorPostItems = errorMsg
  },
  setErrorPostAdd (state, errorMsg) {
    state.errorPostAdd = errorMsg
  },
  setErrorPostRead (state, errorMsg) {
    state.errorPostRead = errorMsg
  },
  setErrorPostUpdate (state, errorMsg) {
    state.errorPostUpdate = errorMsg
  },
  setErrorPostRemove (state, errorMsg) {
    state.errorPostRemove = errorMsg
  },

  setDonePostItems (state, isDone) {
    state.donePostItems = isDone
  },
  setDonePostAdd (state, isDone) {
    state.donePostAdd = isDone
  },
  setDonePostRead (state, isDone) {
    state.donePostRead = isDone
  },
  setDonePostUpdate (state, isDone) {
    state.donePostUpdate = isDone
  },
  setDonePostRemove (state, isDone) {
    state.donePostRemove = isDone
  }
}

const actions = {
  async POST_ITEMS (context, payload) {
    context.commit('setIsLoadingPostItems', true)
    context.commit('setDonePostItems', false)
    context.commit('setErrorPostItems', null)
    try {
      const { data } = await apiPosts(payload.gdata)
      context.commit('setIsLoadingPostItems', false)
      context.commit('setDonePostItems', true)
      const newItems = [...state.items, ...data]
      context.commit('setItems', newItems)
      return true
    } catch (error) {
      context.commit('setIsLoadingPostItems', false)
      context.commit('setErrorPostItems', error.message)
      return false
    }
  },
  async POST_READ (context, payload) {
    context.commit('setIsLoadingPostRead', true)
    context.commit('setDonePostRead', false)
    context.commit('setErrorPostRead', null)
    try {
      const { data } = await apiPostRead(payload.id)
      context.commit('setIsLoadingPostRead', false)
      context.commit('setDonePostRead', true)
      context.commit('setItem', data)
      return true
    } catch (error) {
      context.commit('setIsLoadingPostRead', false)
      context.commit('setErrorPostRead', error.message)
      return false
    }
  },
  async POST_ADD (context, payload) {
    context.commit('setIsLoadingPostAdd', true)
    context.commit('setDonePostAdd', false)
    context.commit('setErrorPostAdd', null)
    try {
      await apiPostAdd(payload.fdata)
      context.commit('setIsLoadingPostAdd', false)
      context.commit('setDonePostAdd', true)
      const newItems = [payload.fdata, ...state.items]
      // console.log('POST_ADD payload.fdata : ', payload.fdata)
      // console.log('POST_ADD state.items : ', state.items)
      // console.log('POST_ADD newItems : ', newItems)
      context.commit('setItems', newItems)
      router.push('/posts/list')
      return true
    } catch (error) {
      context.commit('setIsLoadingPostAdd', false)
      context.commit('setErrorPostAdd', error.message)
      return false
    }
  },
  async POST_UPDATE (context, payload) {
    context.commit('setIsLoadingPostUpdate', true)
    context.commit('setDonePostUpdate', false)
    context.commit('setErrorPostUpdate', null)
    try {
      await apiPostUpdate(payload.id, payload.fdata)
      context.commit('setIsLoadingPostUpdate', false)
      context.commit('setDonePostUpdate', true)
      context.commit('reSetItems')
      router.push('/posts/list')
      return true
    } catch (error) {
      context.commit('setIsLoadingPostUpdate', false)
      context.commit('setErrorPostUpdate', error.message)
      return false
    }
  },
  async POST_REMOVE (context, payload) {
    context.commit('setIsLoadingPostRemove', true)
    context.commit('setDonePostRemove', false)
    context.commit('setErrorPostRemove', null)
    try {
      await apiPostRemove(payload.id)
      context.commit('setIsLoadingPostRemove', false)
      context.commit('setDonePostRemove', true)
      const newItems = state.items.filter((v) => v.id !== payload.id)
      context.commit('setItems', newItems)
      router.push('/posts/list')
      return true
    } catch (error) {
      context.commit('setIsLoadingPostRemove', false)
      context.commit('setErrorPostRemove', error.message)
      return false
    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
