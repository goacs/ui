<template>
    <v-row>
      <v-col cols="12">
      <v-data-table
        :items="items"
        :headers="headers"
        :options.sync="options"
        :loading="loading"
        :server-items-length="total"
      ></v-data-table>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "DeviceList",
  data() {
    return {
      items: [],
      total: 0,
      options: {},
      loading: false,
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
      ]
    };
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        const response = await this.$store.dispatch('device/list', {
          page: this.options.page,
          perPage: this.options.itemsPerPage,
        })
        this.items = response.data.data
        this.total = response.data.total
      } catch (e) {
        console.error("Cannot fetch devices")
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchItems();
  }

}
</script>

<style scoped>

</style>
