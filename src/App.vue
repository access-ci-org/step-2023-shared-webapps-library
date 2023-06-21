<template>
  <div>
    <GoogleMap
      :apiKey="apiKey"
      :center="center"
      :zoom="zoom"
    >
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.position"
      />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, GoogleMapMarker } from 'vue3-google-map';

export default {
  components: {
    GoogleMap,
    GoogleMapMarker,
  },
  data() {
    return {
      apiKey: 'AIzaSyAhz8xQwJzSD3LBpW1mLFtZ204MPp8b4h4',
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      markers: [],
    };
  },
  mounted() {
    this.getMarkers();
  },
  methods: {
    async getMarkers() {
      const response = await fetch(
        'https://operations-api.access-ci.org/wh2/cider/v1/access-allocated/'
      );
      const data = await response.json();
      const results = data.results;
      this.markers = results.map((result) => ({
        id: result.id,
        position: { lat: result.latitude, lng: result.longitude },
      }));
    },
  },
};
</script>
