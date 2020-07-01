<template>
  <v-data-table
          :items="items"
          :headers="headers"
          :options.sync="options"
          :loading="loading"
          :server-items-length="total"
  >
    <template v-for="slotName in itemSlots" #[slotName]="{item}">
      <slot
              :name="slotName"
              :item="item"
      >
      </slot>
    </template>

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
  </v-data-table>
</template>

<script>
export default {
  name: "PaginatedTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    action: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      items: [],
      total: 0,
      options: {},
      loading: false,
    };
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        const response = await this.$store.dispatch(this.action, {
          page: this.options.page,
          perPage: this.options.itemsPerPage,
        })
        this.items = response.data.data
        this.total = response.data.total
      } catch (e) {
        console.error("Cannot load table items")
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    itemSlots() {
      return Object.keys(this.$scopedSlots).filter(name => name.substr(0, 5) === 'item.');
    },
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.fetchItems()
      }
    },
  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<style scoped>

</style>
