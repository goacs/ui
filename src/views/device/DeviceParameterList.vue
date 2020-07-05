<template>
  <v-card>
    <v-card-title>
      Parameters
    </v-card-title>
    <v-card-text>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit parameter</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  {{ editedItem.name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field v-model="editedItem.value" label="Value"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <PaginatedTable
      :action="action"
      :headers="headers"
      :autoload="false"
      :dense="true"
      ref="table"
      >
        <template v-slot:item.flag="{ item }">
          {{ parseFlag(item.flag) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            >mdi-pencil</v-icon>
        </template>
      </PaginatedTable>
    </v-card-text>
  </v-card>
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
            value: 'name'
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
        console.log(flag)
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
