<template>
  <div>
    <v-row>
      <v-col md="6" cols="12">
        <DeviceInfo :device="device"></DeviceInfo>
      </v-col>
      <v-col md="6" cols="12">
        <DeviceLogs></DeviceLogs>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="12" cols="12">
        <DeviceParameterList></DeviceParameterList>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeviceInfo from "./DeviceInfo";
import DeviceParameterList from "./DeviceParameterList";
import DeviceLogs from "./DeviceLogs";
export default {
  name: "DeviceView",
  components: {DeviceLogs, DeviceParameterList, DeviceInfo},
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {
    ...mapGetters({
      device: 'device/getDevice'
    }),
  },
  mounted() {
    this.$store.dispatch('device/fetchDevice',this.$route.params.uuid)
  },
  beforeDestroy() {
    this.$store.commit('device/setDevice', {})
  }

}
</script>

<style scoped>

</style>
