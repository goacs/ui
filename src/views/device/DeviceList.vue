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
          action="device/list"
        >
          <b-table-column field="uuid" label="UUID" v-slot="props">
            {{ props.row.uuid }}
          </b-table-column>

          <b-table-column field="serial_number" label="Serial Number" v-slot="props">
            {{ props.row.serial_number }}
          </b-table-column>

          <b-table-column field="software_version" label="Software Version" v-slot="props">
            {{ props.row.software_version }}
          </b-table-column>

          <b-table-column field="updated_at" label="Last connection time" v-slot="props">
            {{ props.row.updated_at }}
          </b-table-column>

          <b-table-column field="actions" label="Actions" v-slot="props">
            <b-button tag="router-link" type="is-primary" :to="{ name: 'devices-view', params: { uuid: props.row.uuid } }">
              <b-icon icon="magnify"></b-icon>
            </b-button>
          </b-table-column>
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
