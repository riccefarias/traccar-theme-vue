<template>
  <div>
    <l-marker v-if="position"  :key="k"  :lat-lng="position">
      <l-icon :icon-size="[60,60]" :icon-anchor="[30,30]">
        <div class="car" style="position: relative;width: 60px;height: 60px;">
          <div class="info">
              {{car.name}}
          </div>

          <img width="100%" src="/__img/car.png" :style="'position: absolute;left: 0px;top: 0px;transform: rotate('+position.course+'deg)'">
        </div>
      </l-icon>
    </l-marker>
  </div>
</template>


<script>
import {LIcon, LMarker} from "vue2-leaflet";

export default{
  props: ['car','position'],
  components: {
    LIcon,
    LMarker
  }
}
</script>


<style scoped>
.info{
  display: none;
  position: absolute;
  left: 50%;
  bottom: 0px;
  padding: 5px;
  background: white;
  border: silver 1px solid;
  border-radius: 5px;
  transform: translate(-50%,-100%);
}

.car:hover .info{
  display: block;
}
</style>