<template>
  <div id="app">
      <kore-header v-if="$store.state.user"></kore-header>
      <kore-action v-if="$store.state.user"></kore-action>
      <router-view :style="($store.state.user)?'margin-top: 70px;':''"></router-view>
  </div>
</template>

<script>

import _ from 'lodash';

import Vue from 'vue';
import traccar from './kore/traccarConnector/index.js'
import VueRouter from 'vue-router';
import routes from './routes.js';
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
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
    },
    putPosition(state,payload){
      state.positions.push(payload);
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
    '$store.state.user': function(u,a){
        if(a===false && u!==false){
          this.$traccar.startWS();
        }
        if(u){
          this.getDevices();
          this.getPositions();
        }
    }
  },
  created: function(){
    this.$traccar.on('open',()=>{
      this.$bvToast.toast('WebSocket Conectado..',{title: 'Aviso',toaster:'b-toaster-bottom-right'});
    });

    this.$traccar.on('close',()=>{
      this.$bvToast.toast('WebSocket Caiu =/',{title: 'Aviso',toaster:'b-toaster-bottom-right'});
    })

    this.$traccar.on('message',(d)=>{
          if(d.positions){
            d.positions.map((p)=>{
                this.$store.commit('putPosition',p);
            })
          }
          //{"events":[{"id":87569,"attributes":{},"deviceId":10,"type":"deviceMoving","serverTime":"2021-04-09T14:06:36.835+00:00","positionId":533708,"geofenceId":0,"maintenanceId":0}]}
          if(d.events){
            d.events.map((e)=>{

                var device = _.find(this.$store.state.devices,{id: e.deviceId});

                console.log(device);

                var title = device.name;
                var message = '';

                switch(e.type) {
                  case "deviceOnline":
                      message = 'Dispositivo Conectado';
                    break;
                  default:
                    message = e.type;
                }

                this.$bvToast.toast(message,{title: title,toaster:'b-toaster-bottom-right',autoHideDelay: 15000});

            })
          }
    });
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
    'kore-header': ()=>import('@/components/kore-header.vue'),
    'kore-action': ()=>import('@/components/kore-action.vue')
  }
}
</script>

<style>

body{
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
