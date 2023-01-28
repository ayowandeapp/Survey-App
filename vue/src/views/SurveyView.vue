<template>
	<PageComponent >
		<template v-slot:header>
			<div class="flex items-center justify-between">
				<h1 class="text-3xl font-bold text-gray-900">
					{{ route.params.id ? model.title : "create a survey" }}
				</h1>
				<button v-if="route.params.id" type="button" class="py-2 px-3 text-white bg-red-500 rounded-md hover:border-red-100" @click="deleteSurvey()"> - Delete Survey
				</button>
			</div>
		</template>
		<!-- <pre>{{model}}</pre> -->
		<div v-if="surveyLoading" class="flex">Loading...</div>
		<form v-else @submit.prevent="saveSurvey">
			<div class="shadow sm:overflow-hidden sm:rounded-md">
				<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
					<!--image -->
					<div>
		                <label class="block text-sm font-medium text-gray-700">Image</label>
		                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
		                	<img v-if="model.image_url" :src="model.image_url" :alt="model.title" class="w-64 h-48 object-cover" />
			                  <div class="space-y-1 text-center">
			                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
			                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			                    </svg>
			                    <div class="flex text-sm text-gray-600">
			                      <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
			                        <span>Upload a file</span>
			                        <input id="file-upload" @change="onImageChoose" name="file-upload" type="file" class="sr-only" />
			                      </label>
			                      <p class="pl-1">or drag and drop</p>
			                    </div>
			                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
			                  </div>
		                </div>
		              </div>
		            <div class="col-span-6">
	                  <label for="street-address" class="block text-sm font-medium text-gray-700">Title</label>
	                  <input type="text" name="title" id="title" autocomplete="survey_title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" v-model="model.title" />
	                </div>
	                <div>
		                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		                <div class="mt-1">
		                  <textarea id="description" name="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Description" v-model="model.description" />
		                </div>
		                <p class="mt-2 text-sm text-gray-500">Brief description for your survey.</p>
		            </div>
		            <div class="col-span-6">
	                  <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire date</label>
	                  <input type="date" name="expire_date" id="expire_date" autocomplete="expire_date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" v-model="model.expire_date" />
	                </div>
	                <div class="flex items-start">
	                    <div class="flex h-5 items-center">
	                      <input id="status" name="status" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" v-model="model.status" />
	                    </div>
	                    <div class="ml-3 text-sm">
	                      <label for="status" class="font-medium text-gray-700">Active</label>
	                    </div>
                  	</div>

                  	<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
						<h3 class="text-2xl font-semibold flex items-center justify-between">
							Questions
							<button type="button" class="py-1 px-2 text-white bg-emerald-500 rounded-sm hover:bg-emerald-600">
				           + Add new Question
				        </button>
						</h3>
						<div v-if="!model.questions" class="text-center text-gray-600">
							You don't have any questions created
						</div>
						<div v-for="(question, index) in model.questions" :key="question.id">

							<QuestionEditor :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion" />

						</div>
					</div>
                  	<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
		              <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{model.id ? 'Update' :'Create'}}</button>
		            </div>

				</div>

				
			</div>
		</form>

	</PageComponent>
</template>

<script setup>
	import PageComponent from './PageComponent.vue';
	import {ref, watch, computed} from 'vue';
	import store from './../store';
	import {useRoute, useRouter} from 'vue-router';
	import QuestionEditor from './../components/editor/QuestionEditor.vue';
	import {v4 as uuidv4 } from 'uuid';

	const route = useRoute();

	const router = useRouter();

	const surveyLoading = computed(()=> store.state.currentSurvey.loading);

	//create empty survey
	let model = ref({
		title:'',
		status:false,
		description: null,
		image_url: null,
		expire_date: null,
		questions:[]
	});
	//watch current survey data change and when this happens we update the model
	watch(
		()=>store.state.currentSurvey.data,
		(newVal, oldVal)=>{
			model.value = {
				...JSON.parse(JSON.stringify(newVal)),
				status: newVal.status != 'draft',

			}

		});

	if (route.params.id){
		model.value = store.dispatch('getSurvey', route.params.id);
		console.log(model.value);
	}
	function onImageChoose(ev){
		const file = ev.target.files[0];

		const reader = new FileReader();
		reader.onload = ()=>{
			//send image to backend and apply validation
			model.value.image = reader.result;
			//display image
			model.value.image_url = reader.result;
		};
		reader.readAsDataURL(file);
	}
	function saveSurvey(){
		store.dispatch('saveSurvey', model.value).then(({ data }) => {
			router.push({
				name:'SurveyView',
				params:{id: data.data.id}
			})

		});
	}

	function addQuestion(index){
		const newQuestion = {
			id: uuidv4(),
			type: 'text',
			question: '',
			description:null,
			data:{}
		}
		model.value.questions.splice(index, 0, newQuestion);
	}
	function deleteQuestion(question){
		model.value.questions = model.value.questions.filter((q)=>{
			return q !== question
		});

	}
	function questionChange(question){
		model.value.questions = model.value.questions.map((q) =>{
			if(q.id === question.id){
				return JSON.parse(JSON.stringify(question));
			}
			return q;
		});

	}
	function deleteSurvey(){
		if(confirm('Are you sure you want to delete this survey?')){
			store.dispatch('deleteSurvey', route.params.id). then(()=>{
				router.push({
					name:"Surveys",
				});
			});
		}

	}
</script>

<style></style>