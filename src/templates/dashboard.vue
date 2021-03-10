<template>
    <div>
      <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="width: 100vw;height: 100vh;"
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />

        <template v-for="(d,k) in $store.state.devices">
          <l-marker v-if="getPosition(d)"  :key="k"  :lat-lng="getPosition(d)">
            <l-icon :icon-size="[60,60]" :icon-anchor="[30,30]">
              <img width="100%" src="/__img/car.png">
            </l-icon>
          </l-marker>
        </template>

      </l-map>

    </div>
</template>

<script>

import _ from 'lodash';

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker,LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default{
    name: 'Dashboard',
  components: {
    LIcon,
    LMap,
    LTileLayer,
    LMarker
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