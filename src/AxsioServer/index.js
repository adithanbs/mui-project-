import axios from "axios";
import LocalStorageService from './services/storage/localstorageservice';
import router from './router/router';

// Custom instance defaults

const instance = axios.create({
    baseURL: 'https://api.example.com'
  });

// -------------------------------------

// LocalStorageService
const localStorageService = LocalStorageService.getService()

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    

    return config
  },
  error => {
    Promise.reject(error)
  }
);

//Add responce insterseptor
axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      router.push('/login')
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorageService.getRefreshToken()
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAccessToken()
            return axios(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  }
);