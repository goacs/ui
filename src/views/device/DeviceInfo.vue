<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Device Info
      </p>
    </header>
    <div class="card-content">
      <table class="table is-fullwidth is-striped">
        <tbody>
        <tr>
          <th>UUID</th>
          <td>{{ device.uuid }}</td>
        </tr>
        <tr>
          <th>Manufacturer</th>
          <td>{{ device.manufacturer }}</td>
        </tr>
        <tr>
          <th>OUT</th>
          <td>{{ device.oui }}</td>
        </tr>
        <tr>
          <th>Serial</th>
          <td>{{ device.serial_number }}</td>
        </tr>
        <tr>
          <th>Hardware version</th>
          <td>{{ device.hardware_version }}</td>
        </tr>
        <tr>
          <th>Software version</th>
          <td>{{ device.software_version }}</td>
        </tr>
        <tr>
          <th>Last connection time</th>
          <td>{{ device.updated_at | moment }}</td>
        </tr>
        </tbody>
      </table>
      <div>
        <b-button
        @click="kick"
        >
          Kick
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "DeviceInfo",
    computed: {
      ...mapGetters({
        device: 'device/getDevice',
      }),
    },
    methods: {
      kick() {
        this.$store.dispatch('device/kickDevice', this.device.uuid)
      }
    }
  }
</script>

<style scoped>

</style>
