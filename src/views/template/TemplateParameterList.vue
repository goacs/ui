<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Parameters
      </p>
      <div class="card-header-icon" aria-label="more options">
        <b-button
                size="is-small"
                @click="addItem"
        >
          <b-icon
                  icon="plus"
                  size="is-small"
          >

          </b-icon>
          New
        </b-button>
      </div>
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
    <ParameterDialog v-model="addDialog" :item="addingItem" @onSave="storeParameter"></ParameterDialog>
    <ParameterDialog v-model="editDialog" :item="editedItem" :isNew="false" @onSave="updateParameter" @onDelete="deleteParameter"></ParameterDialog>
  </div>
</template>

<script>
  import PaginatedTable from "../../components/PaginatedTable";
  import {mapGetters} from "vuex";
  import {FlagParser} from "../../helpers/FlagParser";
  import ParameterDialog from "../../components/ParameterDialog";
  export default {
    name: "TemplateParameterList",
    components: {ParameterDialog, PaginatedTable },
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
        addDialog: false,
        addingItem: {
          name: "",
          value: "",
        },
        editDialog: false,
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
      addItem() {
        this.addDialog = true
        this.addingItem.template_id = this.$route.params.id
      },
      editItem(item) {
        this.editedIndex = this.$refs.table.items
        this.editedItem = item
        this.editDialog = true
      },
      async storeParameter(savedItem) {
        console.log(savedItem)
        try {
          await this.$store.dispatch('template/storeParameter', {
            templateId: savedItem.template_id,
            name: savedItem.name,
            value: savedItem.value,
          })
          await this.$refs.table.fetchItems()
        } catch (e) {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Cannot save parameter: ${e.response.data.data}`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        } finally {
          this.addDialog = false
        }
      },
      async updateParameter(savedItem) {
        try {
          await this.$store.dispatch('template/updateParameter', {
            uuid: savedItem.uuid,
            templateId: savedItem.template_id,
            name: savedItem.name,
            value: savedItem.value,
          })
          await this.$refs.table.fetchItems()
        } catch (e) {
          console.log(e)
          this.$buefy.toast.open({
            duration: 5000,
            message: `Cannot save parameter: ${e.response.data.data}`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        } finally {
          this.editDialog = false
        }
      },
      async deleteParameter(savedItem) {
        try {
          await this.$store.dispatch('template/deleteParameter', {
            uuid: savedItem.uuid,
            templateId: savedItem.template_id,
          })
          await this.$refs.table.fetchItems()
        } catch (e) {
          console.log(e)
          this.$buefy.toast.open({
            duration: 5000,
            message: `Error. Cannot delete parameter: ${e.response.data.data}`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        } finally {
          this.editDialog = false
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
