<template>
  <div id="app">
      <div v-if="isAuthed">
        <div>Usuário logado: {{user.name}} <input type="button" value="Sair" @click="isAuthed=false"></div>

        <div>
          <div>DISPOSITIVOS</div>
          <div v-for="(d,k) in devices" :key="k">
            {{d.uniqueId}} - {{d.name}} - {{d.status}}
          </div>
        </div>

      </div>
      <div v-else>
        <div>Não logado</div>
        <div><input v-model="email" type="text" placeholder="email" ></div>
        <div><input v-model="password" type="password" placeholder="senha"></div>
        <div><input type="button" value="Login" @click="ok()"></div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import traccar from './kore/traccarConnector/index.js'

Vue.use(traccar,'https://central.kore.geo.br/api');

export default {
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
  margin-top: 60px;
}
</style>
