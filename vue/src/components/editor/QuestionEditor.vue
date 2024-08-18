<template>
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-bold">
			{{ index + 1 }}. {{ model.question}}

		</h3>

		<div class="flex items-center">

			<button type="button" @click="addQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
				+ Add
			</button>
			<button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:bg-gray-700">
				- Delete
			</button>
		</div>

	</div>
	<div class=" flex grid gap-3 grid-cols-12">

		<div class="mt-3 col-span-9">
			<label :for="'question_text_'+ model.data" class="block text-sm font-medium text-gray-700">Question Text</label>
			<input type="text" :name="'question_text_'+model.data" v-model="model.question" @change="dataChange" :id="'question_text_'+model.data" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
		</div>
		<div class="mt-3 col-span-3">
			<label for="question_type" class="block text-sm font-medium text-gray-700">select Question Type</label>
			<select id="question_type" name="question_type" v-model="model.type" @change="typeChange()" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
				<option v-for="type in questionTypes" :key="type" :value="type">{{ upperCaseFirst(type) }}</option>
			</select>
		</div>
	</div>
	<div class="mt-3 col-span-9">
		<label :for="'question_description_'+ model.id" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea :name="'question_description_'+model.id" v-model="model.description" @change="dataChange" :id="'question_description_'+model.id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>

	</div>

	<div>
		<div v-if="shouldHaveOptions()" class="mt-2">
			<h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
				options
				<button type="button" @click="addOption()" class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">+ Add Option
				</button>
			</h4>
			<div v-if="!model.data.options" class="text-xs text-gray-600 text-center py-3">
				you don't have any options defined
			</div>
			<div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
				<span class="w-6 text-sm">{{ index +1 }}.</span>
				<input type="text" v-model="option.text" @change="dataChange" class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500" />
				<button type="button" @click="removeOption(option)" class="flex items-center h-6 w-6 py-1 px-3 mr-2 rounded-sm transition-colors hover:border-red-100">
					Del
				</button>
				
			</div>
			
		</div>
		



	</div>
	<hr class="my-4" />

	

</template>

<script setup>
	import {ref, computed} from 'vue';
	import {v4 as uuidv4 } from 'uuid';
	import store from './../../store';
	const props = defineProps({
		question: Object,
		index: Number,

	});
	//recreate the whole question data to avoid unintentional reference change
	const model = ref(JSON.parse(JSON.stringify(props.question)));
	console.log(model.value);
	//get questionType from vuex
	const questionTypes = computed(()=>{
		return store.state.questionTypes;
	});
	//convert the type to upper case first
	function upperCaseFirst(type){
		return type.charAt(0).toUpperCase() + type.slice(1);
	}
	//check if the question should have options
	function shouldHaveOptions(){
		//check if the question type is one of those 'checkbox','radio', 'select' returns true or false
		return ['checkbox','radio', 'select'].includes(model.value.type);
	}
	function getOptions(){
		return model.value.data.options;
	}
	function setOptions(options){
		console.log(options);
		model.value.data.options = options;
	}
	//add option
	function addOption(){
		setOptions([
			...getOptions(),
			{ uuid: uuidv4(), text:''},
			]);
		dataChange();
	}
	//remove option
	function removeOption(opt){
		console.log(opt);
		//take out which is the option, and then for the rest, make it model.value.data.options our options display ie update the option display 
		setOptions(getOptions().filter((option)=> option !== opt));
		dataChange();
	}
	//when you change question type, if the type you change too is one of those 'checkbox','radio', 'select'
	function typeChange(){
		if(shouldHaveOptions()){
			//if options exist or true run the getOptions function and assign it to setOptions, else assign it to an empty array
			setOptions(getOptions() || []);
		}
		dataChange();
	}
	//emit data
	function dataChange(){
		const data = JSON.parse(JSON.stringify(model.value));
		console.log(data);
		//it should not have options i.e text or textarea, delete options
		if(!shouldHaveOptions){
			delete data.data.options;
		}
		emit('change', data);
	}
	//add question
	function addQuestion(){
		emit('addQuestion', props.index+1 )
	}
	function deleteQuestion(){
		emit('deleteQuestion', props.question)
	}

	const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

	
</script>