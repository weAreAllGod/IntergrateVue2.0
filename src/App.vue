<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if='reset'></router-view>
  </div>
</template>

<script>
import { error } from 'util';
import { Promise } from 'q';
export default {
  name: 'App',
    data(){
    return{
      reset:true
    }
  },
  provide(){
    return{
      reload:this.reload}
  },

  methods:{
    reload(){
      this.reset=false
      this.$nextTick(()=>{
        this.reset=true
      })
    }
  }
}
</script>

<style>

</style>

