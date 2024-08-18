import {createStore} from 'vuex';
import axiosClient from './../axios';

// const tmpSurveys = [
// 	{
// 		id: 100,
// 		title: 'simple title',
// 		slug: 'simple slug',
// 		status: 'draft',
// 		image: '',
// 		description: 'my name is ayowande .<br> i am a web developer with 3+ years of experience',
// 		created_at: '2023-01-15 13:00:00',
// 		updated_at: '2023-01-15 13:00:00',
// 		expire_date: '2023-01-15 13:00:00',
// 		questions:[
// 			{
// 				id:1,
// 				type: "select",
// 				question:"from which country are you?",
// 				description: null,
// 				data: {
// 					options: [
// 						{uuid:"DC8F892D-2EBD-447C-A4C8-T03058436FF4", text:"Nigeria"},
// 						{uuid:"RT7890PU-9HED-907C-N4C8-U03058436FF4", text:"USA"},
// 						{uuid:"DC8F892D-6EBD-4789C-R4C8-A03058436FF4", text:"Poland"},
// 						{uuid:"T7J6892D-T56BD-447C-A4C8-O73058435T44", text:"India"},
// 					]
// 				},

// 			},
// 			{
// 				id:2,
// 				type: "checkbox",
// 				question:"which language do you code in?",
// 				description: "When you add request interceptors, they are presumed to be asynchronous by default. This can cause a delay in the execution of your axios request when the main thread is blocked (a promise is created under the hood for the interceptor and your request gets put on the bottom of the call stack).",
// 				data: {
// 					options: [
// 						{uuid:"DC8F892D-2EBD-447C-A4C8-T03058436FF4", text:"Java"},
// 						{uuid:"RT7890PU-9HED-907C-N4C8-U03058436FF4", text:"PHP"},
// 						{uuid:"DC8F892D-6EBD-4789C-R4C8-A03058436FF4", text:"Python"},
// 						{uuid:"T7J6892D-T56BD-447C-A4C8-O73058435T44", text:"C#"},
// 					]
// 				},

// 			},
// 			{
// 				id:3,
// 				type: "checkbox",
// 				question:"which PHP framework do you prefer?",
// 				description: "When you add request interceptors, they are presumed to be asynchronous by default. This can cause a delay in the execution of your axios request when the main thread is blocked (a promise is created under the hood for the interceptor and your request gets put on the bottom of the call stack).",
// 				data: {
// 					options: [
// 						{uuid:"DC8F892D-2EBD-447C-A4C8-T03058436FF4", text:"Codeigniter"},
// 						{uuid:"RT7890PU-9HED-907C-N4C8-U03058436FF4", text:"Symfony"},
// 						{uuid:"DC8F892D-6EBD-4789C-R4C8-A03058436FF4", text:"Laravel"},
// 						{uuid:"T7J6892D-T56BD-447C-A4C8-O73058435T44", text:"Vii2"},
// 					]
// 				},

// 			},
// 			{
// 				id:4,
// 				type: "radio",
// 				question:"which Laravel framwork do you work with",
// 				description: "When you add request interceptors, they are presumed to be asynchronous by default. This can cause a delay in the execution of your axios request when the main thread is blocked (a promise is created under the hood for the interceptor and your request gets put on the bottom of the call stack).",
// 				data: {
// 					options: [
// 						{uuid:"DC8F892D-2EBD-447C-A4C8-T03058436FF4", text:"Laravel 5.8"},
// 						{uuid:"RT7890PU-9HED-907C-N4C8-U03058436FF4", text:"Laravel 6"},
// 						{uuid:"DC8F892D-6EBD-4789C-R4C8-A03058436FF4", text:"Laravel 7"},
// 						{uuid:"T7J6892D-T56BD-447C-A4C8-O73058435T44", text:"Laravel 8"},
// 					]
// 				},

// 			},
// 			{
// 				id:5,
// 				type: "checkbox",
// 				question:"your favorite Api development?",
// 				description: "When you add request interceptors, they are presumed to be asynchronous by default. This can cause a delay in the execution of your axios request when the main thread is blocked (a promise is created under the hood for the interceptor and your request gets put on the bottom of the call stack).",
// 				data: {
// 					options: [
// 						{uuid:"DC8F892D-2EBD-447C-A4C8-T03058436FF4", text:"Rest API"},
// 						{uuid:"RT7890PU-9HED-907C-N4C8-U03058436FF4", text:"TDD"},
// 						{uuid:"DC8F892D-6EBD-4789C-R4C8-A03058436FF4", text:"DDD"},
// 						{uuid:"T7J6892D-T56BD-447C-A4C8-O73058435T44", text:"All of the above"},
// 					]
// 				},

// 			},

// 			{
// 				id:6,
// 				type: "text",
// 				question:"what's your favorite youtube channel?",
// 				description: null,
// 				data: {},
// 			},

// 			{
// 				id:7,
// 				type: "textarea",
// 				question:"what do you think about this channel?",
// 				description: "write your honest opinion.",
// 				data: {},
// 			},

// 		]
// 	},
// 	{
// 		id: 200,
// 		title: 'Vue 3 title',
// 		slug: 'vue-3',
// 		status: 'active',
// 		image: '',
// 		description: 'random content .<br> i am a web developer with 3+ years of experience',
// 		created_at: '2023-05-15 13:00:00',
// 		updated_at: '2023-05-15 13:00:00',
// 		expire_date: '2023-05-15 13:00:00',
// 		questions:[],
// 	},

// 	{
// 		id: 300,
// 		title: 'Laravel 8 title',
// 		slug: 'Laravel-8',
// 		status: 'active',
// 		image: '',
// 		description: 'laravel-mix content .<br> i am a web developer with 3+ years of experience',
// 		created_at: '2023-08-15 13:00:00',
// 		updated_at: '2023-08-15 13:00:00',
// 		expire_date: '2023-08-15 13:00:00',
// 		questions:[],
// 	},
// 	{
// 		id: 400,
// 		title: 'Tailwind 3 title',
// 		slug: 'tailwind-3',
// 		status: 'active',
// 		image: '',
// 		description: 'tailwind css content .<br> i am a web developer with 3+ years of experience',
// 		created_at: '2023-04-15 13:00:00',
// 		updated_at: '2023-04-15 13:00:00',
// 		expire_date: '2023-04-15 13:00:00',
// 		questions:[],
// 	},
// ]

const store = createStore({
	modules:{

	},
	getters:{

	},
	state:{
		user: {
			data:{},
			token: sessionStorage.getItem('TOKEN'),
		},
		dashboard:{
			loading: false,
			data:{}
		},
		surveys: {
			loading: false,
			links: [],
			data: {}
		},
		questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
		currentSurvey: {
			loading: false,
			data: {}
		},
		notification: {
			show: false,
			message: null,
			type: null
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
		},
		setCurrentSurvey(state, survey){
			state.currentSurvey.data = survey.data;

		},
		dashboardLoading(state, loading){
			state.dashboard.loading = loading;
		},
		setDashboardData(state, data){
			state.dashboard.data = data

		},
		setCurrentSurveyLoading(state, loading){
			state.currentSurvey.loading = loading;
		},
		setSurveys(state, surveys){
			state.surveys.data = surveys.data;
			state.surveys.links = surveys.meta.links;

		},
		setSurveysLoading(state, loading){
			state.surveys.loading = loading;
		},
		notify(state, {type, message}){
			state.notification.show = true;
			state.notification.type = type;
			state.notification.message = message;
			setTimeout(()=>{
				state.notification.show = false;
			}, 3000)
			
		},
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
		getDashboardData({commit}){
			commit('dashboardLoading', true);
			return axiosClient.get('/dashboard').then((res)=>{
				console.log(res.data);
				commit('setDashboardData', res.data);
				commit('dashboardLoading', false);
				return res.data;
			}).catch((err)=>{
				commit('dashboardLoading', false);
				throw err;
			});

		},
		getSurveys({commit}, {url = null} = {}){
			url = url || '/survey';
			commit('setSurveysLoading', true);
			return axiosClient.get(url).then((res)=>{
				console.log(res.data);
				commit('setSurveys', res.data);
				commit('setSurveysLoading', false);
				return res.data;
			}).catch((err)=>{
				commit('setSurveysLoading', false);
				throw err;
			});

		},
		getSurvey({commit}, id){
			commit('setCurrentSurveyLoading', true);
			return axiosClient.get('/survey/'+id).then((res)=>{
				console.log(res.data);
				commit('setCurrentSurvey', res.data);
				commit('setCurrentSurveyLoading', false);
				return res.data;
			}).catch((err)=>{
				commit('setCurrentSurveyLoading', false);
				throw err;
			});
		},
		saveSurveyAnswer({commit}, {surveyId, answers}){
			return axiosClient.post(`/survey/${surveyId}/answer`, {answers});

		},
		saveSurvey({commit}, survey){
			delete survey.image_url;
			let response;
			//if the survey had id it means we are makingv an update .i.e a put request
			if(survey.id){
				response = axiosClient.put('/survey/'+survey.id, survey).then((res)=>{
					console.log(res.data);
					commit('setCurrentSurvey', res.data);
					return res;
				});
			} else {
				response = axiosClient.post('/survey', survey).then((res)=>{
					console.log(res.data);
					commit('setCurrentSurvey', res.data);
					return res;
				});
			}
			return response;
		},
		deleteSurvey({commit}, id){
			return axiosClient.delete('/survey/'+id);

		},
		getSurveyBySlug({commit}, slug) {
			commit('setCurrentSurveyLoading', true);
			return axiosClient.get('/survey-by-slug/'+slug).then((res)=>{
				commit('setCurrentSurvey', res.data);
				commit('setCurrentSurveyLoading', false);
				console.log(res.data.data);
				return res
			}).catch((err)=>{
				commit('setCurrentSurveyLoading', false);
				throw err;
			})

		}
	}
})
export default store;