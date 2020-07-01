<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="text-h5">Devices List</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <PaginatedTable
          :headers="headers"
          action="device/list"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
                    elevation="0"
                    fab
                    small
                    color="secondary"
                    :to="{ name: 'devices-view', params: { uuid: item.uuid } }"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </PaginatedTable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PaginatedTable from "../../components/PaginatedTable";
export default {
  name: "DeviceList",
  components: {PaginatedTable},
  data() {
    return {
      headers: [
        {
          text: 'UUID',
          align: 'start',
          value: 'uuid',
        },
        {
          text: 'Serial Number',
          value: 'serial_number',
        },
        {
          text: 'Software Version',
          value: 'software_version',
        },
        {
          text: 'Last connection time',
          value: 'updated_at',
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ]
    };
  },
  methods: {
  },
  mounted() {
  }

}
</script>

<style scoped>

</style>
