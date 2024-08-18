<script>

// import HelloWorld from './components/HelloWorld.vue'
// import {mapState} from 'vuex'
export default{
  computed:{
    // ...mapState({
    //   user: (state) => state.user

    // })
  },
  components:{
    // HelloWorld
  },
  mounted(){
    window.Echo.channel(`public.survey.notification`)
    .listen('SurveyAnswered', (e) => {
      console.log('got it');
        console.log(e);
    });
  }
  

}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
