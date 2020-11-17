<template>
  <div v-if="device.uuid">
    <div class="columns">
      <div class="column is-half">
        <DeviceInfo></DeviceInfo>
      </div>
      <div class="column is-half">
        <DeviceQueuedTasks></DeviceQueuedTasks>
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
import DeviceQueuedTasks from "./DeviceQueuedTasks";
export default {
  name: "DeviceView",
  components: {DeviceQueuedTasks, DeviceLogs, DeviceParameterList, DeviceInfo},
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
  async created() {
    await this.$store.dispatch('device/fetchDevice', this.$route.params.uuid)
  },
  beforeDestroy() {
    this.$store.commit('device/setDevice', {})
  }

}
</script>

<style scoped>

</style>
