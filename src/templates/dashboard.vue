<template>
    <div>
      <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="width: 100vw;height: calc(100vh - 70px);"
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />

        <kore-car v-for="(d,k) in $store.state.devices" :key="k" :car="d" :position="getPosition(d)"></kore-car>

      </l-map>

    </div>
</template>

<script>

import _ from 'lodash';

import { latLng } from "leaflet";
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default{
    name: 'Dashboard',
  components: {
      'kore-car': ()=>import('@/components/kore-car.vue'),
    LMap,
    LTileLayer,
  },
  methods: {
      getPosition: function(d){
          let pos = _.find(this.$store.state.positions,{deviceId: d.id});

          if(pos) {
            return {lat: pos.latitude, lng: pos.longitude};
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
      showMap: true
    };
  },
}
</script>