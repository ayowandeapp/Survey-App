<template>
  <PageComponent title="Survey">
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-bold text-gray-900">Surveys</h3>
        <router-link :to="{name: 'SurveyCreate'}" class="py-1 px-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
           + Add new Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="survey in surveys" :key="survey.id" class="flex flex-col py-4 px6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img :src="survey.image" alt="no image" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        <div class="flex justify-between items-center mt-3">
          <router-link :to="{name:'SurveyView', params: { id: survey.id } }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover-bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit
          </router-link>
          <button v-if="survey.id"  type="button" @click="deleteSurvey(survey)">Delete</button>
        </div> 
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
  import PageComponent from './PageComponent.vue';
  import store from './../store';
  import {computed} from 'vue';

  const surveys = computed(()=>{
    return store.state.surveys
  });
  function deleteSurvey(survey){
    if (confirm('Are you sure you want to delete this survey?')) {

    }

  }
  
</script>