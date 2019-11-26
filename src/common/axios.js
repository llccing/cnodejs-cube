import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1',
})

// 挂到Vue的原型上
Vue.prototype.$axios = instance