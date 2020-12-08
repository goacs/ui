<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Device templates
      </p>
      <div class="card-header-icon" aria-label="more options">
        <b-button size="is-small">
          <b-icon
                  icon="plus"
                  size="is-small"
          ></b-icon>
        </b-button>
      </div>
    </header>
    <div class="card-content">
      <div class="field is-grouped is-grouped-multiline">
        <template v-for="template in templates">
          <div class="control is-clickable" :key="template.id" @click="editTemplate(template)">
            <b-taglist attached>
                  <b-tag type="is-black" size="is-medium" ellipsis>{{ template.name }}</b-tag>
                  <b-tag type="is-info" size="is-medium">{{ template.priority }}</b-tag>
            </b-taglist>
          </div>
        </template>
      </div>

      <span class="is-small has-text-grey-light">
        Higher is better. Device has priority 100
      </span>
    </div>
    <b-modal
            v-model="dialog"
    >
      <form>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit template</p>
            <b-button type="is-danger" outlined icon-left="delete" ></b-button>

          </header>
          <section class="modal-card-body">
            <b-field :label="`Editing item ${editedItem.name}`">

            </b-field>
            <b-field label="Priority" label-position="on-border">
              <b-input
                      type="text"
                      v-model="editedItem.priority"
                      placeholder="Priority">
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button @click="dialog = false">Close</b-button>
            <b-button type="is-primary" class="is-align-content-end" @click="save" :loading="saving">Save</b-button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "DeviceTemplates",
    components: {
    },
    data() {
      return {
        dialog: false,
        saving: false,
        editedItem: {},
      };
    },
    computed:{
      ...mapGetters({
        device: 'device/getDevice',
        templates: 'device/getDeviceTemplates'
      }),
    },
    methods: {
      editTemplate(template) {
        this.editedItem = Object.assign({}, template); //clone item, not reference
        this.dialog = true;
      },
      save() {

      }
    },
    mounted() {
      this.$store.dispatch('device/fetchDeviceTemplates', this.device.uuid)
    }
  }
</script>

<style scoped>
  .is-clickable {
    cursor: pointer;
  }
</style>
