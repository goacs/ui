<template>
  <div v-if="device">
    <div class="columns">
      <div class="column">
        <DeviceInfo></DeviceInfo>
      </div>
      <div class="column">
        <DeviceLogs></DeviceLogs>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <DeviceParameterList></DeviceParameterList>
      </div>
    </div>
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
      device: 'device/getDevice',
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
