<template>
  <div>
    <b-table
            :data="items"
            :loading="loading"
            paginated
            backend-pagination
            :total="total"
            :per-page="options.itemsPerPage"
            :current-page="options.page"
            @page-change="pageChanged"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"

            backend-sorting>
      <slot></slot>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "PaginatedTable",
  props: {
    dense: {
      default: () => false
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
        page: 1,
      },
      loading: false,
    };
  },
  methods: {
    pageChanged(pageNumber) {
      this.options.page = pageNumber
      this.fetchItems();
    },
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
  // watch: {
  //   options: {
  //     deep: true,
  //     handler() {
  //       this.fetchItems()
  //     }
  //   },
  // },
  mounted() {
  this.fetchItems()
  }
}
</script>

<style scoped>

</style>
