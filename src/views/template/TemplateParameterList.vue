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
                detailed
                detail-key="name"
                :show-detail-icon="false"
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
              <template v-if="props.row.value.length > 100">
                {{ stripString(props, 100) }}
                <b-button
                @click="$refs.table.$refs.basetable.toggleDetails(props.row)"
                size="is-small"
                type="is-primary"
                >
                  ...
                </b-button>
              </template>
              <template v-else>
                {{ props.row.value }}
              </template>
            </template>
          </b-table-column>

          <b-table-column field="flag" label="Flag">

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
          <template slot="detail"  slot-scope="props">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <pre>{{ props.row.value }}</pre>
                </div>
              </div>
            </article>
          </template>
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
    name: "TemplateParameterList",
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
          name: 'template/listParameters',
          parameters: {
            templateId: this.$route.params.id
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
        template: 'template/getTemplate',
        parameters: 'template/getParameters'
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
        this.saving = true
        try {
          // this.$store.dispatch('device/updateParameters', {
          //   uuid: this.device.uuid,
          //   name: this.editedItem.name,
          //   value: this.editedItem.value,
          // })
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
      },
      stripString(value, len) {
        return value.row.value.substr(0, len);
      },
    },
    beforeDestroy() {
      this.$store.commit('template/setParameters', {})
    },
  }
</script>

<style lang="scss" scoped>
  .b-tooltips {
    .b-tooltip:not(:last-child) {
      margin-right: .5em
    }

  }
</style>