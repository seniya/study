import { instance } from './instance'

function apiLetters (gdata) {
  return instance({
    method: 'GET',
    url: '/letters',
    params: gdata
  })
}
function apiLetterAdd (fdata) {
  return instance({
    method: 'POST',
    url: '/letters',
    data: fdata
  })
}
function apiLetterRead (id) {
  return instance({
    method: 'GET',
    url: `/letters/${id}`
  })
}
function apiLetterUpdate (id, fdata) {
  return instance({
    method: 'PUT',
    url: `/letters/${id}`,
    data: fdata
  })
}
function apiLetterRemove (id) {
  return instance({
    method: 'DELETE',
    url: `/letters/${id}`
  })
}
export {
  apiLetters,
  apiLetterAdd,
  apiLetterRead,
  apiLetterUpdate,
  apiLetterRemove
}
