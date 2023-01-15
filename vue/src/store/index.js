import {createStore} from 'vuex';
import axiosClient from './../axios';

const store = createStore({
	modules:{

	},
	getters:{

	},
	state:{
		user: {
			data:{},
			token: sessionStorage.getItem('TOKEN'),
		}

	},
	mutations:{
		logout(state){
			state.user.data = {};
			state.user.token = null;
			sessionStorage.removeItem('TOKEN');
		},
		setUser(state, userData){
			state.user.token = userData.token;
			state.user.data = userData.user;
			sessionStorage.setItem('TOKEN', userData.token);

		}

	},
	actions:{
		register({commit}, user){
			return axiosClient.post('/register',user)
				.then(({data}) =>{
					commit('setUser', data);
					console.log(data);
					return data;
			});

		},
		login({commit}, user){
			return axiosClient.post('/login',user)
				.then(({data}) =>{
					commit('setUser', data);
					console.log(data);
					return data;
			});

		},
		logout({commit}){
			return axiosClient.post('/logout')
				.then((response) =>{
					commit('logout');
					console.log(response);
					return response;
			});

		},
		
	}
})
export default store;