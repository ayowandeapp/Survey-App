<template>
	<fieldset class="mb-4">
		<div>
			<legend class="text-base font-medium text-gray-900">
				{{ index + 1 }}. {{ question.question }}
			</legend>
			<p class="text-gray-500 text-sm">
				{{ question.description }}
			</p>
		</div>
		<div class="mt-3">
			<div v-if="question.type === 'select'">
				<select :value="modelValue" @change="emits('update:modelValue', $event.target.value)" class="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focusL:border-indigo-500">
					<option value="">Please Select</option>
					<option v-for="option in question.data.options" :value="option.text" :key="option.uuid">{{ option.text }}</option>
					
				</select>
				
			</div>
			<div v-else-if="question.type === 'radio'">
				<div v-for="(option, ind) of question.data.options" :key="option.uuid" class="flex items-center">
					<input :id="option.uuid" :name="'question'+question.id" :value="option.text" @change="emits('update:modelValue', $event.target.value)" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
					<label :for="option.uuid" class="ml-3 block text-sm font-medium text-gray-700">
						{{ option.text }}
					</label>
					
				</div>
				
			</div>
			<div v-else-if="question.type === 'checkbox'">
				{{model}}
				<div v-for="(option, ind) of question.data.options" :key="option.uuid" class="flex items-center">
					<input :id="option.uuid" v-model="model[option.text]" :value="option.text" @change="onCheckboxChange" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
					<label :for="option.uuid" class="ml-3 block text-sm font-medium text-gray-700">
						{{ option.text }}
					</label>

				</div>
				
			</div>
			<div v-else-if="question.type === 'text'">
				<input :value="modelValue" @input="emits('update:modelValue', $event.target.value)" type="text" class="focus:ring-indigo-500 h-10 text-indigo-600 border-gray-300 rounded-md"  />
				
			</div>
			<div v-else-if="question.type === 'textarea'">
				<textarea :value="modelValue" @input="emits('update:modelValue', $event.target.value)" type="text" class="focus:ring-indigo-500 text-indigo-600 border-gray-300 rounded-md"> </textarea> 
			</div>
			
		</div>
	</fieldset>
	<hr>
</template>

<script setup>
	import {ref} from "vue";
	const {question, index, modelValue } = defineProps({
		question: Object,
		index: Number,
		modelValue: [String, Array],
	});
	const emits = defineEmits(["update:modelValue"]);

	let model;
	if(question.type === "checkbox"){
		model = ref({});
	}
	function onCheckboxChange($event){
		const selectedOptions = [];
		for (let text in model.value) {
			if(model.value[text]) {
				selectedOptions.push(text);
			}
		}
		emits("update:modelValue", selectedOptions);

	}
	
</script>