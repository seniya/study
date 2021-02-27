import { instance } from './instance'

function apiPosts (gdata) {
  return instance({
    method: 'GET',
    url: '/posts',
    params: gdata
  })
}
function apiPostAdd (fdata) {
  return instance({
    method: 'POST',
    url: '/posts',
    data: fdata
  })
}
function apiPostRead (id) {
  return instance({
    method: 'GET',
    url: `/posts/${id}`
  })
}
function apiPostUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/posts/${id}`,
    data: fdata
  })
}
function apiPostRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/posts/${id}`
  })
}
export {
  apiPosts,
  apiPostAdd,
  apiPostRead,
  apiPostUpdate,
  apiPostRemove
}
