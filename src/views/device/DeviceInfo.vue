<template>
  <v-card>
    <v-card-title>
      Device informations
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
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
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "DeviceInfo",
    props: {
      device: {
        required: true,
        type: Object,
      }
    }
  }
</script>

<style scoped>

</style>
