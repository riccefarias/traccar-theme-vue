<template>
  <div class="routes">

      <div>
        <input type="date" v-model="value" style="width: 100%;height: 40px;border: silver 1px solid;margin-bottom: 10px;">
      </div>

    <b-row no-gutters>
      <b-col>
        Hora
      </b-col>
      <b-col>
        Distancia
      </b-col>
      <b-col>
        Vel. Média
      </b-col>
      <b-col>
        Vel. Max
      </b-col>
      <b-col>
        Duração
      </b-col>
    </b-row>


    <b-row v-for="(r,rk) in routes" @click="loadRoute(rk,r.startTime,r.endTime)" :key="'route-'+rk" class="trip" :class="{active: rk===openRoute}" no-gutters>
      <b-col>
        {{new Date(r.startTime).toLocaleTimeString()}}
      </b-col>
      <b-col>
        {{ (r.distance/1000).toFixed(2)}}km
      </b-col>
      <b-col>
        {{Math.round(r.averageSpeed*1.852)}} km/h
      </b-col>
      <b-col>
        {{Math.round(r.maxSpeed*1.852)}} km/h
      </b-col>
      <b-col>
        {{ Math.round(r.duration/60000)}} min
      </b-col>
    </b-row>


  </div>
</template>

<script>
export default{
  methods: {
    loadRoute: function(id,start,end){

      this.openRoute = id;


        start = new Date(start).toISOString();
        end = new Date(end).toISOString();

        this.$traccar.loadRoute(this.$route.query.deviceId,start,end).then((r)=>{
          this.points = r.data;

          this.$root.$emit('points',r.data);
        });
    },
    loadTrips: function(){
      this.openRoute = 0;
      this.points = [];
      this.routes = [];

      this.$root.$emit('points',[]);

      let now = new Date(this.value+" 00:00");
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);


      console.log(now);
      let start = now.toISOString();
      now.setDate(now.getDate()+1);
      let end = now.toISOString();


      this.$traccar.loadTrips(this.$route.query.deviceId,start,end).then((r)=>{
        this.routes = r.data;
      });
    }
  },
  watch: {
    'value': function(){
      this.loadTrips();
    }
  },
  created: function(){


    let now = new Date();

    let mm = now.getMonth()+1
    let dd = now.getDate();

    if(mm<10){
      mm='0'+mm;
    }

    if(dd<10){
      dd='0'+dd;
    }

    this.value = now.getFullYear()+'-'+mm+'-'+dd;

    this.loadTrips();
  },
  data:function(){
    return {
      value: 0,
      openRoute: 0,
      routes: [],
      points: []
    }
  }
}
</script>


<style scoped>
.routes{
  position: absolute;
  left: 80px;
  top: 70px;
  z-index: 1009;
  width: 400px;
  height: calc(100vh - 70px);
  background: white;
  box-shadow: rgba(0,0,0,0.3) 3px 0px 25px;
  font-size: 12px;
}

.trip div{
  padding: 5px;
}

.trip{
  border-bottom: silver 1px solid;
}

.trip:hover{
  background: #c9e2ff;
}

.active{
  background: #007dff !important;
  color: white;
}
</style>