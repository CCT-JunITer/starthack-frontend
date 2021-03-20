<template>
  <div class="map-container">
    <dialog-form @add-report="createNewReport"></dialog-form>
    <l-map
      ref="map"
      :center="startCoordinates"
      :zoom="15"
      @ready="mapReady"
      @click="printCoordinates"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="currentUserLocation"></l-marker>

      <l-marker
        v-for="(report, index) in currentReports"
        :key="index"
        :lat-lng="report.location"
        :icon="redMarkerIcon"
      ></l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import L, { LeafletMouseEvent } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import DialogForm from '@/components/map/DialogFormButton.vue';
import { Report } from '../interfaces/Report';

interface MapElement {
  mapObject: L.Map;
}

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    DialogForm,
  },
})
export default class Map extends Vue {
  $refs!: {
    map: MapElement & HTMLElement,
  };

  protected url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  protected attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  protected startCoordinates = [47.42508857319259, -350.62349537853163];

  protected zoom = 15;

  protected mapObject!: L.Map;

  protected currentUserLocation: number[] = this.startCoordinates;

  protected currentReports: Report[] = [];

  protected redMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  mapReady(): void {
    this.mapObject = this.$refs.map.mapObject;
    this.mapObject.on('locationfound', (e: L.LocationEvent) => {
      this.currentUserLocation = [e.latlng.lat, e.latlng.lng];
    });

    this.mapObject.locate({ setView: true });
    setInterval(() => this.mapObject.locate(), 2500);
  }

  createNewReport(report: Report): void {
    const newReport = { ...report, location: this.currentUserLocation };
    this.currentReports.push(newReport);
  }

  printCoordinates = (event: LeafletMouseEvent): void => {
    console.log(event.latlng);
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;

  .vue2leaflet-map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
