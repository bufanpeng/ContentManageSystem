// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/'
// import axios from 'axios'
import App from './App'
import router from './router'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.axios = axios;
// axios.defaults.timeout = 5000; //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
// axios.defaults.baseURL = 'http://myadmin.tjbolaimei.com/index.php/'; //配置接口地址

router.beforeEach((to, from, next) => {
	var admin = window.localStorage.getItem('admin'); //获取浏览器缓存的用户信息
	var nav_arr = window.localStorage.getItem('nav_arr'); //获取浏览器缓存的用户信息
	if(admin && nav_arr) { //如果有就直接到首页咯
		next();
	} else {
		if(to.path == '/login') { //如果是登录页面路径，就直接next()
			next();
		} else { //不然就跳转到登录；
			next('/login');
		}

	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	echarts,
	// axios,
	template: '<App/>',
	components: {
		App
	}
})