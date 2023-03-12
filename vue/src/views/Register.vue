<template>
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->

    <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">Sigin here</router-link>
        </p>
    </div>
    
      <alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error,ind) of errors[field] || []" :key="ind">
            
            . {{error}}
          </div>

        </div>
        <span @click="errors=''" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">X</span>

      </alert>
    <form class="mt-8 space-y-6" @submit="register">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="fullname" class="sr-only">Full name</label>
            <input id="fullname" name="name" type="text" autocomplete="name" v-model="user.name" required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Enter Fullname" />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" v-model="user.email"  required="" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password"  required="" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <label for="confirm_password" class="sr-only">Confirm Password</label>
            <input id="confirm_password" name="password_confirmation" type="password" autocomplete="current-password-confirmation" v-model="user.password_confirmation"  required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="confirm_password" />
          </div>
        </div>

        <div>
          <button :diabled="loading" type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <span v-if="loading">
              circle 
            </span>
            Sign up
          </button>
        </div>
      </form>

</template>

<script setup>
  import { LockClosedIcon } from '@heroicons/vue/20/solid';
  import store from './../store';
  import router from './../router';
  import {ref} from 'vue';
  import alert from './../components/Alert.vue';

  const user = {
    name: '',
    email: '',
    password:'',
    password_confirmation: ''
  };
  const errors = ref({});
  const loading = ref(false);
  function register(e){
    e.preventDefault();
    loading.value = true;
    store.dispatch('register', user)
      .then((response) =>{
        loading.value = false;
        router.push({ name: 'Dashboard' })
      })
      .catch(err=>{
        if (err.response.status === 422){
          loading.value = false;
          errors.value = err.response.data.errors;
        }

      })
  }
  
</script>

<style scoped></style>