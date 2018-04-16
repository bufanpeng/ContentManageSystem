import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Header from '@/components/common/header'
import Nav from '@/components/common/nav'
import Main from '@/components/common/main'
import Home from '@/components/common/home'
import Buttons from '@/pages/button'
import Radios from '@/pages/radio'
import Checkboxs from '@/pages/checkbox'
import Inputs from '@/pages/input'
import Inputnumber from '@/pages/inputnumber'
import Datepicker from '@/pages/datepicker'
import Custom from '@/pages/custom'
import Auth from '@/pages/auth'
import Role from '@/pages/role'
import Login from '@/pages/login'
import Echarts from '@/pages/echarts'
import Cancel from '@/pages/cancel'
import Student from '@/pages/student'

Vue.use(Router)

export default new Router({
	routes: [
        {
			path: '/login',
			name: '登录',
			component: Login
		},
		{
			path: '/',
			component: Home,
			children: [{
				path: '/',
				name: '首页',
				component: Main,
			}]
		},
		{
			path: '/',
			component: Home,
			children: [{
				path: '/echarts',
				name: 'ECharts',
				component: Echarts,
			}]
		},
		{
			path: '/',
			component: Home,
			children: [{
				path: '/student',
				name: '学生档案',
				component: Student,
			}]
		},
		{
			path: '/',
			component: Home,
			children: [{
				path: '/cancel',
				name: '核销管理',
				component: Cancel,
			}]
		},
		{
			path: '/',
			name: "基础组件",
			component: Home,
			children: [{
					path: '/button',
					name: 'Button 按钮',
					component: Buttons,
				},
				{
					path: '/radio',
					name: 'Radio 单选框',
					component: Radios,
				},
				{
					path: '/checkbox',
					name: 'Checkbox 多选框',
					component: Checkboxs,
				},
				{
					path: '/inputs',
					name: 'Input 输入框',
					component: Inputs,
				},
				{
					path: '/inputnumber',
					name: 'InputNumber 计数器',
					component: Inputnumber,
				},
				{
					path: '/datepicker',
					name: 'DatePicker 日期选择器',
					component: Datepicker,
				},
			],
		},
		{
			path: '/',
			name: "权限管理",
			component: Home,
			children: [{
					path: '/auth',
					name: '用户管理',
					component: Auth,
				},
				{
					path: '/role',
					name: '角色管理',
					component: Role,
				},
			],
		},
		{
			path: '/',
			component: Home,
			children: [{
				path: '/custom',
				name: '自定义主题',
				component: Custom,
			}, ],
		},
	]
});
console.log(window.localStorage.bgcolor)
// 页面刷新时，重新赋值token
if(window.localStorage.getItem('textcolor')) {
	store.commit('TEXTCOLOR', JSON.parse(window.localStorage.getItem('textcolor')));
};
if(window.localStorage.getItem('activecolor')) {
	store.commit('ACTIVECOLOR', JSON.parse(window.localStorage.getItem('activecolor')));
};
if(window.localStorage.getItem('bgcolor')) {
	store.commit('BGCOLOR', JSON.parse(window.localStorage.getItem('bgcolor')));
};
if(window.localStorage.getItem('tbgcolor')) {
	store.commit('TBGCOLOR', JSON.parse(window.localStorage.getItem('tbgcolor')));
};
if(window.localStorage.getItem('tactivecolor')) {
	store.commit('TACTIVECOLOR', JSON.parse(window.localStorage.getItem('tactivecolor')));
};
if(window.localStorage.getItem('ttextcolor')) {
	store.commit('TTEXTCOLOR', JSON.parse(window.localStorage.getItem('ttextcolor')));
};
if(window.localStorage.getItem('navlist')) {
	store.commit('NAVLIST', window.localStorage.getItem('navlist'));
};
if(window.localStorage.getItem('nav_arr')) {
	store.commit('NAV_ARR', window.localStorage.getItem('nav_arr'));
};
if(window.localStorage.getItem('admin')) {
	store.commit('ADMIN', window.localStorage.getItem('admin'));
};