<template>
  <div class="action" :class="{show: car!=null}">
    <ul v-if="car">
      <li v-b-tooltip.right title="Seguir">
        <a href="" @click.prevent="$router.push({query: {deviceId: $route.query.deviceId,follow: ($route.query.follow==='true')?'false':'true'}})">
          <img :src="($route.query.follow==='true')?'__img/mapOn.png':'__img/mapOff.png'"><br>
        </a>
      </li>

      <li v-b-tooltip.right title="Bloquear">
        <a  @click.prevent="doStopEngine()">
          <img :src="(pos.attributes.block)?'__img/blockOn.png':'__img/blockOff.png'"><br>
        </a>
      </li>

      <li v-b-tooltip.right title="Histórico de Rota">
        <router-link :to="{path: ($route.path.match('routes'))?'/dashboard':'/dashboard/routes',query: $route.query}">
          <img :src="($route.path.match('routes'))?'__img/routeOn.png':'__img/routeOff.png'"><br>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>

import _ from 'lodash'

export default{
  computed:{
    car: function(){
      return _.find(this.$store.state.devices,{id: parseInt(this.$route.query.deviceId)});
    },
    pos: function(){
      return _.findLast(this.$store.state.positions,{deviceId: parseInt(this.$route.query.deviceId)});
    }
  },
  methods: {
    doStopEngine: function(){
      this.$bvModal.msgBoxConfirm('Deseja realmente bloquear este veiculo?',{title: 'Tem certeza?',centered: true}).then((response)=>{
          if(response){
            // eslint-disable-next-line no-unused-vars
            this.$traccar.sendStopEngine(parseInt(this.$route.query.deviceId)).then((r)=>{
                  this.$bvModal.msgBoxOk('Seu veiculo será bloqueado em alguns segundos...',{title: 'Suceso',centered: true});
            });
          }
      });
    }
  }
}
</script>

<style scoped>
.action{
  background: #007dff;
  width: 80px;
  position: absolute;
  left: -100px;
  top: 70px;
  z-index: 9999;
  height: calc(100vh - 70px);
  transition: all 0.3s;
}

.action.show{
  left: 0px;
}


ul{
  list-style: none;
  margin: 0px;
  padding: 0px;
}

ul li{
  margin-top: 10px;
}

ul li a{
  color: white;
  font-size: 12px;
}

ul li img{
  width: 60px;
  margin-bottom: 5px;
}

</style>