<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
      <tr>
        <td>UUID</td>
        <td>{{ device.uuid }}</td>
      </tr>
      <tr>
        <td>Serial</td>
        <td>{{ device.serial_number }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "DeviceView",
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
