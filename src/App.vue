<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import traccar from './kore/traccarConnector/index.js'
import VueRouter from 'vue-router';
import routes from './routes.js';
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)/
Vue.use(VueRouter);

let router = new VueRouter({routes})

Vue.use(traccar,'http://central.kore.geo.br/api');

export default {
  router,
  traccar,
  name: 'App',
  data: function(){
    return {
      isAuthed: false,
      email: '',
      password: '',
      user: {},
      devices: []
    }
  },
  methods: {
    loadDevices: function(){
        this.$traccar.getDevices().then((d)=>{
          this.devices = d.data;
        });
    },
    ok: function(){
      this.$traccar.login(this.email,this.password).then((r)=>{
        this.isAuthed = true;
        this.user = r.data;


        this.loadDevices();

      }).catch(()=>{
        this.isAuthed = false;
        this.user = {};
      });
    }
  },
  components: {
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
