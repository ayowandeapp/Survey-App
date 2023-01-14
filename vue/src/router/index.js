import {createRouter, createWebHistory} from 'vue-router';
import DefaultLayout from './../components/DefaultLayout.vue'
import DefaultGuest from './../components/DefaultGuest.vue'
import Dashboard from './../views/Dashboard.vue'
import Login from './../views/Login.vue'
import Register from './../views/Register.vue'
import Surveys from './../views/Surveys.vue'
import store from './../store'
const routes = [
	{
		path: '/',
		redirect: '/dashboard',
		component: DefaultLayout,
		meta: {requiresAuth: true},
		children: [
			{name:'Dashboard',path:'/dashboard',component: Dashboard},
			{name:'Surveys', path:'surveys', component:Surveys}
			]
	},
	{
		name: 'Guest',
		path:'/guest',
		component: DefaultGuest,
		meta: {isGuest:true},
		redirect:'/login',
		children: [{name: 'Login', path: '/login', component: Login },
				   {name: 'Register', path: '/register', component: Register}
					]

	}
	];

const router = createRouter({
	history: createWebHistory(),
	routes

})
//router navigation guide
router.beforeEach((to, from, next) => {
  if (
    // make sure the user is authenticated
    !store.state.user.token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login' && to.meta.requiresAuth
  ) {
    // redirect the user to the login page
    next({ name: 'Login' })
  }else if(store.state.user.token && (to.meta.isGuest)){
  	next({name: 'Dashboard'})

  }
  else{
  	next()
  }
})

export default router