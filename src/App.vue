<template>
  <div id="app">
      <kore-header v-if="$store.state.user"></kore-header>
      <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import traccar from './kore/traccarConnector/index.js'
import VueRouter from 'vue-router';
import routes from './routes.js';
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)/
Vue.use(VueRouter);

let router = new VueRouter({routes})

router.beforeEach((to,from,next)=>{
  if (to.name !== 'Login' && !store.state.user){
    next({ name: 'Login' })
  } else if (to.name === 'Login' && store.state.user){
    next({ name: 'Dashboard' })
  } else {
    next()
  }
});

Vue.use(Vuex)
Vue.use(traccar,'http://central.kore.geo.br/api');

const store = new Vuex.Store({
  state: {
    user: false,
    devices: [],
    positions: [],
    geofence: [],
  },
  mutations: {
    setAuth (state,payload) {
      state.user = payload;
      if(payload===false){
        router.push('/login');
      }
    },
    setDevices(state,payload){
      state.devices = payload;
    },
    setPositions(state,payload){
      state.positions = payload;
    }
  }
})

export default {
  store,
  router,
  traccar,
  name: 'App',
  data: function(){
    return {
      email: '',
      password: '',
    }
  },
  watch: {
    '$store.state.user': function(u){
        if(u){
          this.getDevices();
          this.getPositions();
        }
    }
  },
  methods: {
    getDevices: function(){
      this.$traccar.getDevices().then((d)=>{
        this.$store.commit('setDevices',d.data);
      });
    },
    getPositions: function(){
      this.$traccar.getPositions().then((d)=>{
        this.$store.commit('setPositions',d.data);
      });
    },

  },
  components: {
    'kore-header': ()=>import('@/components/kore-header.vue')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
