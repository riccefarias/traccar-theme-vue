<template>
    <div>
      <router-view></router-view>
      <l-map
          :zoom="zoom"
          :center="followCar || center"
          :options="mapOptions"
          style="width: 100vw;height: calc(100vh - 70px);"
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />

        <kore-car v-for="(d,k) in $store.state.devices" :key="k" :car="d" :position="getPosition(d)"></kore-car>

        <l-polyline
            :lat-lngs="trailCar"
        />

        <l-polyline
            :lat-lngs="pointsCpt"
        />

      </l-map>

    </div>
</template>

<script>

import _ from 'lodash';

import { latLng } from "leaflet";
import { LMap, LTileLayer,LPolyline } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default{
    name: 'Dashboard',
  components: {
      'kore-car': ()=>import('@/components/kore-car.vue'),
    LMap,
    LTileLayer,
    LPolyline
  },
  created: function(){
      this.$root.$on('follow',()=>{
          this.isFollow = !this.isFollow;
      });

      this.$root.$on('points',(p)=>{
        this.points = p;
      })
  },
  computed: {
      followCar: function(){
        if(this.$route.query.follow==='true') {
          let pos = _.findLast(this.$store.state.positions, {deviceId: parseInt(this.$route.query.deviceId)});
          return (pos)?{lat: pos.latitude,lng: pos.longitude}:false;
        }else{
          return false;
        }
      },
    trailCar: function(){

      let pos = _.chunk(_.orderBy(_.filter(this.$store.state.positions,{deviceId: parseInt(this.$route.query.deviceId)}),['id'],['desc']),10);

      let points = [];
      if(pos.length>0) {
        pos[0].map((p) => {
          points.push({lat: p.latitude, lng: p.longitude});
        });
      }

      return points;
    },
    pointsCpt: function(){

      let pos = this.points;

      let points = [];
      if(pos.length>0) {
        pos.map((p) => {
          points.push({lat: p.latitude, lng: p.longitude});
        });
      }

      return points;
    }
  },
  watch: {
      '$route.query.deviceId': function(){
            if(this.$route.query.deviceId){
                let pos = _.findLast(this.$store.state.positions,{deviceId: parseInt(this.$route.query.deviceId)});

                if(pos){
                  this.zoom = 18;
                  setTimeout(()=> {
                    this.center = {lat: pos.latitude, lng: pos.longitude};
                  },200);
                }
            }
      }
  },
  methods: {
      getPosition: function(d){
          let pos = _.findLast(this.$store.state.positions,{deviceId: d.id});

          if(pos) {
            return {lat: pos.latitude, lng: pos.longitude,course: pos.course};
          }else{
            return false;
          }
      }
  },
  data() {
    return {
      zoom: 7,
      center: latLng(this.$store.state.user.latitude, this.$store.state.user.longitude),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      points: []
    };
  },
}
</script>