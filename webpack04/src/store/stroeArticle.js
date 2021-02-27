import {
  apiArticles,
  apiArticleAdd,
  apiArticleRead,
  apiArticleUpdate,
  apiArticleRemove
} from '@/api/apiAticle'

const state = {}
const getters = {}
const mutations = {}

const actions = {
  async ARTICLE_ITEMS (context, payload) {
    try {
      const { data } = await apiArticles(payload.gdata)
      return data
    } catch (error) {
      return error
    }
  },
  async ARTICLE_ADD (context, payload) {
    try {
      const { data } = await apiArticleAdd(payload.fdata)
      return data
    } catch (error) {
      return error
    }
  },
  async ARTICLE_READ (context, payload) {
    try {
      const { data } = await apiArticleRead(payload.id)
      return data
    } catch (error) {
      return error
    }
  },
  async ARTICLE_UPDATE (context, payload) {
    try {
      const { data } = await apiArticleUpdate(payload.id, payload.fdata)
      return data
    } catch (error) {
      return error
    }
  },
  async ARTICLE_REMOVE (context, payload) {
    try {
      const { data } = await apiArticleRemove(payload.id)
      return data
    } catch (error) {
      return error
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
