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
      <SurveyListItem v-for="(survey, index) in surveys" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)" class="opacity-0 animate-fade-in-down" :style="{animationDelay: `${index * 0.1}s`}" />
    </div>
  </PageComponent>
</template>

<script setup>
  import SurveyListItem from './../components/SurveyListItem.vue'
  import PageComponent from './PageComponent.vue';
  import store from './../store';
  import {computed} from 'vue';


  const surveys = computed(()=>{
    return store.state.surveys.data
  });
  store.dispatch('getSurveys')
  function deleteSurvey(survey){
    if (confirm('Are you sure you want to delete this survey?')) {
      store.dispatch('deleteSurvey', survey.id).then(()=>{
        store.dispatch('getSurveys');
      })
      

    }

  }
  
</script>