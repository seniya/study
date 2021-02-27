import { instance } from './instance'

function apiSignIn (fdata) {
  return instance({
    method: 'GET',
    url: '/sign',
    data: fdata
  })
}

export {
  apiSignIn
}
