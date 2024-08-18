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
    <div v-if="surveys.loading" class="flex justify-center"> Loading...</div>
    <div v-else>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem v-for="(survey, index) in surveys.data" :key="survey.id" :survey="survey" @delete="deleteSurvey(survey)" class="opacity-0 animate-fade-in-down" :style="{animationDelay: `${index * 0.1}s`}" />
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm" aria-label="Pagination">
        <a v-for="(link, i) in surveys.links" :key="i" :disabled="!link.url" href="#" aria-currrent="page" @click="getForPage($event,link)" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap" v-html="link.label" :class="[ link.active ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-wgite border-gray-300 text-grey-500 hover:bg-gray-50', i === 0 ?'rounded-l-md' :'', i === surveys.links.length -1 ? 'rounded-r-md' : '', ]"></a>

      </nav>

    </div>
  </PageComponent>
</template>

<script setup>
  import SurveyListItem from './../components/SurveyListItem.vue'
  import PageComponent from './PageComponent.vue';
  import store from './../store';
  import {computed} from 'vue';


  const surveys = computed(()=>{
    return store.state.surveys
  });
  store.dispatch('getSurveys');
  function deleteSurvey(survey){
    if (confirm('Are you sure you want to delete this survey?')) {
      store.dispatch('deleteSurvey', survey.id).then(()=>{
        store.dispatch('getSurveys');
      })
    }
  }
  function getForPage(ev, link) {
    ev.preventDefault();
    if(!link.url || link.active){
      return;
    }
  store.dispatch('getSurveys', { url: link.url });
  }

  
</script>