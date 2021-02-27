import axios from 'axios'
import { setInterceptors } from './common/interceptors'

const apiRootPath = process.env.VUE_APP_API_URL

function createInstance () {
  const instance = axios.create({
    baseURL: apiRootPath
  })
  return setInterceptors(instance)
}

export const instance = createInstance()
