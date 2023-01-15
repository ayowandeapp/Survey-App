import {createStore} from 'vuex';

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
			return fetch('http://127.0.0.1:8000/api/register',{
				headers:{
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				method:"POST",
				body: JSON.stringify(user),
			}).then((response)=> response.json())
				.then((response) =>{
				commit('setUser', response);
				console.log(response);
				return response;
			});

		},
		
	}
})
export default store;