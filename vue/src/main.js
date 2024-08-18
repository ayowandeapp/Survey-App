import { createApp } from 'vue'
import './style.css'
import store from './store'
import router from './router'
import './index.css'
import App from './App.vue'


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

window.Pusher = Pusher;

console.log(import.meta.env.VITE_WEBSOCKETS_KEY); // For Vite
// or
// console.log(process.env.VUE_APP_WEBSOCKETS_KEY); // For Vue CLI (Webpack)
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    wsHost: '127.0.0.1',
	wsPort: 6001,
	cluster: 'mt1',
	forceTLS: false,
	disableStats: true,
	authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
	auth:{
		headers:{
			Authorization : 'Bearer ' + store.state.user.token
		}

	}
});

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
