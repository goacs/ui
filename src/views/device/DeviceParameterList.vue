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

          <b-table-column field="flag" label="Flag">
<!--            <template-->
<!--                    slot="searchable"-->
<!--                    slot-scope="props">-->
<!--                <CheckboxSelection-->
<!--                        v-model="props.filters[props.column.field]"-->
<!--                        :items="flagSelection"-->
<!--                        field="name"-->
<!--                        placeholder="Filter flag"-->
<!--                        size="is-small">-->
<!--                </CheckboxSelection>-->
<!--            </template>-->
            <template v-slot="props">
              {{ parseFlag(props.row.flag) }}
            </template>
          </b-table-column>

          <b-table-column field="actions" label="Actions" v-slot="props">
            <section class="b-tooltips">
              <b-tooltip label="New instance" type="is-dark" v-if="props.row.flag.add_object === true">
                <b-button type="is-primary" size='is-small' @click="addObject(props.row)">
                  <b-icon icon="plus" size="is-small"></b-icon>
                </b-button>
              </b-tooltip>
              <b-tooltip label="Edit parameter" type="is-dark">
              <b-button type="is-primary" size='is-small' @click="editItem(props.row)">
                <b-icon icon="pencil" size="is-small"></b-icon>
              </b-button>
              </b-tooltip>
            </section>
          </b-table-column>

        </PaginatedTable>
      </div>
    </div>
    <b-modal
          v-model="dialog"
    >
    <form>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit parameter</p>
        </header>
        <section class="modal-card-body">
          <b-field :label="editedItem.name">
            <b-input
                    :disabled="editedItem.flag && editedItem.flag.write === false"
                    type="text"
                    v-model="editedItem.value"
                    placeholder="Item Value">
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button type="button" @click="dialog = false">Close</b-button>
          <b-button class="is-primary" @click="save" :loading="saving">Save</b-button>
        </footer>
      </div>
    </form>
    </b-modal>
  </div>
</template>

<script>
  import PaginatedTable from "../../components/PaginatedTable";
  import {mapGetters} from "vuex";
  import {FlagParser} from "../../helpers/FlagParser";
  export default {
    name: "DeviceParameterList",
    components: { PaginatedTable },
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
            value: 'r',
            text: 'Read',
          },
          {
            value: 'w',
            text: 'Write',
          },
          {
            value: 'a',
            text: 'AddObject',
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
        saving: false,
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
      addObject(item) {
        this.$store.dispatch('device/addObject', {
          uuid: this.device.uuid,
          name: item.name,
          key: '',
        })
      },
      editItem(item) {
        this.editedIndex = this.$refs.table.items
        this.editedItem = item
        this.dialog = true
      },
      save() {
        this.saving = true
        try {
          this.$store.dispatch('device/updateParameters', {
            uuid: this.device.uuid,
            name: this.editedItem.name,
            value: this.editedItem.value,
          })
          this.dialog = false
        } catch (e) {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Error. Cannot save parameter`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        } finally {
          this.saving = false
        }
      }
    },
    beforeDestroy() {
      this.$store.commit('device/setParameters', {})
    }
  }
</script>

<style lang="scss" scoped>
  .b-tooltips {
    .b-tooltip:not(:last-child) {
      margin-right: .5em
    }

  }
</style>
