import axios from "axios";
import store from './store';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000/api'
})
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = 'Bearer ' + store.state.user.token
    //console.log('Bearer ' + store.state.user.token );
    return config;
  }, function (error) {
    // Do something with request error
    //return Promise.reject(error);
  });


export default axiosClient;