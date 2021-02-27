import { instance } from './instance'

function apiArticles (gdata) {
  return instance({
    method: 'GET',
    url: '/articles',
    params: gdata
  })
}
function apiArticleAdd (fdata) {
  return instance({
    method: 'POST',
    url: '/articles',
    data: fdata
  })
}
function apiArticleRead (id) {
  return instance({
    method: 'GET',
    url: `/articles/${id}`
  })
}
function apiArticleUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/articles/${id}`,
    data: fdata
  })
}
function apiArticleRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/articles/${id}`
  })
}
export {
  apiArticles,
  apiArticleAdd,
  apiArticleRead,
  apiArticleUpdate,
  apiArticleRemove
}
