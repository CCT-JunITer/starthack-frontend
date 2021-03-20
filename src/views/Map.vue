<template>
  <div class="map-container">
    <dialog-form @add-proposal="createNewProposal"></dialog-form>
    <l-map
      ref="map"
      :center="startCoordinates"
      :zoom="15"
      @ready="mapReady"
      @click="printCoordinates"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-control class="map-container__current-location-icon" :position="'topleft'">
        <v-icon dense @click="goToCurrentLocation">mdi-crosshairs-gps</v-icon>
      </l-control>

      <l-marker :lat-lng="currentUserLocation"></l-marker>

      <l-marker
        v-for="(proposal, index) in currentProposals"
        :key="index"
        :lat-lng="proposal.location"
        :icon="proposal.selected ? getMarkerIcon('green') : getMarkerIcon('red')"
        :draggable="proposal.draggable"
      >
        <l-popup>
          <h2>Title</h2>
          <p class="mt-1">{{ proposal.title }}</p>
          <h2>Description</h2>
          <p class="mt-1">{{ proposal.description }}</p>
          <h2>Votes</h2>
          <p class="mt-1">{{ proposal.votes }}</p>
          <v-btn elevation="2" @click="goToProposals">Go to proposals</v-btn>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import L, { LeafletMouseEvent } from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LControl, LPopup,
} from 'vue2-leaflet';
import DialogForm from '@/components/map/DialogFormButton.vue';
import { Proposal } from '../interfaces/Proposal';

interface MapElement {
  mapObject: L.Map;
}

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LPopup,
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

  protected userLocation: number[] = [];

  protected currentProposals: Proposal[] = [];

  getMarkerIcon = (color: string): L.Icon => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  mapReady(): void {
    this.mapObject = this.$refs.map.mapObject;
    this.mapObject.on('locationfound', (e: L.LocationEvent) => {
      if (this.currentUserLocation === this.startCoordinates) {
        // this.mapObject.locate({ setView: true });
      }

      this.userLocation = [e.latlng.lat, e.latlng.lng];
    });

    setInterval(() => this.mapObject.locate(), 2500);

    this.$store.state.proposals.forEach((proposal: Proposal) => {
      this.currentProposals.push(proposal);
      if (proposal.selected) {
        this.mapObject.panTo({ lat: proposal.location[0], lng: proposal.location[1] });
      }
    });
  }

  createNewProposal(proposal: Proposal): void {
    const newProposal: Proposal = {
      ...proposal,
      location: this.currentUserLocation,
      /* eslint-disable-next-line */
      image: require('@/assets/schlagloch1.jpg'),
      votes: 0,
      type: 'Test',
    };
    this.currentProposals.push(newProposal);

    this.$store.commit('addNewProposal', newProposal);
  }

  goToCurrentLocation(): void {
    this.mapObject.panTo({ lat: this.currentUserLocation[0], lng: this.currentUserLocation[1] });
  }

  get currentUserLocation(): number[] {
    return this.userLocation.length === 2 ? this.userLocation : this.startCoordinates;
  }

  goToProposals(): void {
    this.$router.push('/vote');
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

  .map-container__current-location-icon {
    background-color: #fff;
    width: 34px;
    height: 34px;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 100ms ease-in-out;

    &:hover {
      background-color: #eee;
    }
  }

  .vue2leaflet-map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
