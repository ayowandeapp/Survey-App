<template>
	<PageComponent title="Dashboard">
		<div v-if="loading" class="flex justify-center">
			loading....
		</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
			<div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2">
				<h3 class="text-2x1 font-semibold"> Total Surveys</h3>
				<div class="text-8x1 font-semibold flex-1 flex items-center justify-center">
					{{ data.totalSurveys }}
				</div>
				
			</div>
			<div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-4">
				<h3 class="text-2xl font-semibold">Total Answers</h3>
				<div class="text-8x1 font-semibold flex-1 flex items-center justify-center">
					{{ data.totalAnswers }}
				</div>
				
			</div>
			<div class="row-span order-3 lg:order-1 bg-white shadow-md p-4">
				<h3 class="text-2xl font-semibold">Latest Survey</h3>
				<div v-if="data.latestSurvey">

					<img :src="data.latestSurvey.image_url" class="w-[240px] mx-auto" alt="" />
					<h3> {{ data.latestSurvey.title }}</h3>
					<div class="flex justify-between text-sm mb-1">
						<div>Created Date:</div>
						<div>{{ data.latestSurvey.created_at }}</div>
					</div>
					<div class="flex justify-between text-sm mb-1">
						<div>Expire Date:</div>
						<div>{{ data.latestSurvey.expire_date }}</div>
					</div>
	
					<div class="flex justify-between text-sm mb-1">
						<div>Status:</div>
						<div>{{ data.latestSurvey.status ? 'Active': 'Draft'}}</div>
					</div>
					<div class="flex justify-between text-sm mb-3">
						<div> Questions:</div>
						<div>{{ data.latestSurvey.questions }}</div>
					</div>
	
					<div class="flex justify-between text-sm mb-1">
						<div> Answers:</div>
						<div>{{ data.latestSurvey.answers }}</div>		
					</div>
					<div class="flex justify-between">
						<router-link :to="{name:'SurveyView', params:{id:data.latestSurvey.id} }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit Survey</router-link>
						<button :to="{name:'SurveyView', params:{id:data.latestSurvey.id} }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">View Answer</button>
						
					</div>
				</div>
				
			</div>
			<div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-3">
				<div class="flex justify-between items-center mb-3 px-2">
					<h3 class="text-2x1 font-semibold">Latest Answers</h3>
					<a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">
						View all
					</a>
				</div>
				<a href="#" v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
					<div class="font-semibold">{{ answer.survey.title }}</div>
					<small>Answer Made at:
						<i class="font-semibold">{{ answer.end_date }}</i>
					</small>
				</a>
				
			</div>

		</div>
	</PageComponent>
</template>

<script setup>
	import PageComponent from './PageComponent.vue';
	import { useStore } from 'vuex';
	import { computed } from 'vue';

	const store = useStore();
	const loading = computed(()=> store.state.dashboard.loading);
	const data = computed(()=> store.state.dashboard.data);

	store.dispatch('getDashboardData');
</script>