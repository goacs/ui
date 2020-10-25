<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Parameters
      </p>
    </header>
    <div class="card-content">
      <div>
        <PaginatedTable
                :action="action"
                :headers="headers"
                :autoload="false"
                :dense="true"
                ref="table"
        >
          <b-table-column field="name" label="Name" searchable>
            <template
                    slot="searchable"
                    slot-scope="props">
              <b-input
                      v-model="props.filters[props.column.field]"
                      placeholder="Search..."
                      icon="magnify"
                      size="is-small" />
            </template>
            <template v-slot="props">
            {{ props.row.name }}
            </template>
          </b-table-column>

          <b-table-column field="value" label="Value" searchable>
            <template
                    slot="searchable"
                    slot-scope="props">
              <b-input
                      v-model="props.filters[props.column.field]"
                      placeholder="Search..."
                      icon="magnify"
                      size="is-small" />
            </template>
            <template v-slot="props">
              {{ props.row.value }}
            </template>
          </b-table-column>

          <b-table-column field="flag" label="Flag" searchable>
            <template
                    slot="searchable"
                    slot-scope="props">
                <b-taginput
                        v-model="props.filters[props.column.field]"
                        :data="flagSelection"
                        autocomplete
                        :allow-new="false"
                        :open-on-focus="true"
                        field="name"
                        placeholder="Filter flag"
                        size="is-small">
                </b-taginput>
            </template>
            <template v-slot="props">
              {{ parseFlag(props.row.flag) }}
            </template>
          </b-table-column>

          <b-table-column field="actions" label="Actions" v-slot="props">
            <b-button type="is-primary" size='is-small' @click="editItem(props.row)">
              <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
          </b-table-column>

        </PaginatedTable>
      </div>
    </div>
  </div>
</template>

<script>
  import PaginatedTable from "../../components/PaginatedTable";
  import {mapGetters} from "vuex";
  import {FlagParser} from "../../helpers/FlagParser";
  export default {
    name: "DeviceParameterList",
    components: {PaginatedTable},
    data() {
      return {
        headers: [
          {
            text: 'Name',
            value: 'name',
            searchable: true,
          },
          {
            text: 'Value',
            value: 'value'
          },
          {
            text: 'Flag',
            value: 'flag',
          },
          {
            text: 'Actions',
            value: 'actions'
          }
        ],
        flagSelection: [
          {
            type: 'r',
            name: 'Read',
          },
          {
            type: 'w',
            name: 'Write',
          },
          {
            type: 'a',
            name: 'AddObject',
          }
        ],
        action: {
          name: 'device/fetchParameters',
          parameters: {
            uuid: this.$route.params.uuid
          }
        },
        dialog: false,
        editedItem: {},
        editedIndex: -1,
      }
    },
    computed: {
      ...mapGetters({
        device: 'device/getDevice',
        parameters: 'device/getParameters'
      }),
    },
    methods: {
      parseFlag(flag) {
        const parser = new FlagParser(flag)
        return parser.toString()
      },
      saveParameter(params) {
        console.log(params)
      },
      editItem(item) {
        this.editedIndex = this.$refs.table.items
        this.editedItem = item
        this.dialog = true
      },
      save() {
        this.$store.dispatch('device/updateParameters', {
          uuid: this.device.uuid,
          name: this.editedItem.name,
          value: this.editedItem.value,
        })
        this.dialog = false
      }
    },
    beforeDestroy() {
      this.$store.commit('device/setParameters', {})
    }
  }
</script>

<style scoped>

</style>
