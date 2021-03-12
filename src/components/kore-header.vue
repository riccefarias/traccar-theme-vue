<template>
  <b-container id="header" fluid>
      <b-row align-h="between">
        <b-col style="text-align: left;padding: 10px;">
          <img src="__img/logoblack.png" height="55px">
        </b-col>
        <b-col class="selector">
              <div v-if="isSearch" style="position: relative;">
                <div class="searchbox">
                  <div class="search"><input ref="busca" type="text" @blur="doSearch(false)" v-model="q" placeholder="Buscar"></div>
                  <div class="carlist">
                      <div v-for="(v,vk) in deviceFilter" :key="vk" @click="$router.push({query: {deviceId: v.id}})">
                        {{v.name}}
                      </div>
                  </div>
                </div>
              </div>


              <div @click="doSearch(true)">
                <div v-if="!$route.query.deviceId">
                    -- SELECIONE UM VEICULO --
                </div>
                <div v-else>
                    {{selected.name}}
                </div>
              </div>


        </b-col>
        <b-col style="text-align: right;font-size: 22px;padding: 20px;">
          {{$store.state.user.name}} <input type="button" @click="$store.commit('setAuth',false)" value="Sair" class="btn btn-danger">
        </b-col>
      </b-row>

  </b-container>
</template>

<script>
import _ from 'lodash';

export default{
  data: function(){
    return{
      q: '',
      isSearch: false
    }
  },
  computed: {
    deviceFilter: function(){
      return _.filter(this.$store.state.devices,(d)=>{
          return d.name.toLowerCase().match(this.q.toLowerCase());
      });
    },
    selected: function(){
        return _.find(this.$store.state.devices,{id: parseInt(this.$route.query.deviceId)});
    }
  },
  methods: {
    doSearch: function(v){
      if(v) {
        this.isSearch = true;
        setTimeout(() => {
          this.$refs['busca'].focus();
        }, 400);
      }else{
        setTimeout(() => {
          this.isSearch = false;
        }, 300);
      }
    }
  }
}
</script>


<style>
#header{
  background: white;
  height: 70px;
  width: 100vw;
  border-bottom: silver 1px solid;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999999;
}

.selector{
  background: #007dff;
  height: 70px;
  line-height: 70px;
  font-size: 22px;
  color: white;
  user-select: none;
  cursor: pointer;
}

.searchbox{
  position: absolute;
  width: calc(100% + 30px);
  left: -15px;
  top: 0px;
  color: black;
  background: white;
  min-height: 50%;
  z-index: 9999;
}

.search input{
  height: 70px;
  width: 100%;
  border: silver 1px solid;
  outline: none;
  padding: 10px;
}
</style>