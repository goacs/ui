<template>
  <v-data-table
          :items="items"
          :headers="headers"
          :options.sync="options"
          :loading="loading"
          :server-items-length="total"
          :footer-props="footerOptions"
          :dense="dense"
  >
    <template v-for="slotName in itemSlots" #[slotName]="{item}">
      <slot
              :name="slotName"
              :item="item"
      >
      </slot>
    </template>

  </v-data-table>
</template>

<script>
export default {
  name: "PaginatedTable",
  props: {
    dense: {
      default: () => false
    },
    headers: {
      type: Array,
      required: true,
    },
    action: {
      type: [String, Object],
      required: true,
    },
    autoload: {
      type: Boolean,
      default: () => true,
    }
  },
  data() {
    return {
      items: [],
      total: 0,
      footerOptions: {itemsPerPageOptions: [25, 50, 100, 300]},
      options: {
        itemsPerPage: 25,
      },
      loading: false,
    };
  },
  methods: {
    async fetchItems() {
      try {
        this.loading = true;
        const response = await this.$store.dispatch(this.actionData.name, this.actionData.parameters)
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
    actionData() {
      if(typeof this.action === 'string') {
        return {
          name: this.action,
          parameters: {
            page: this.options.page,
            perPage: this.options.itemsPerPage,
          }
        }
      }
      return {
        name: this.action.name,
        parameters: {
          ...this.action.parameters,
          page: this.options.page,
          perPage: this.options.itemsPerPage,
        }
      }
    }
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

  }
}
</script>

<style scoped>

</style>
