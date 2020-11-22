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
            <b-button type="button" @click="dialog = false">Close</b-button>
            <b-button class="is-primary" @click="save" :loading="saving">Save</b-button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "DeviceTemplates",
    components: {
    },
    data() {
      return {
        dialog: false,
        saving: false,
        editedItem: {},
        templates: [
          {
            id: 1,
            priority: 10,
            name: 'First',
          },
          {
            id: 2,
            priority: 20,
            name: 'Second',
          },
          {
            id: 3,
            priority: 30,
            name: 'Third',
          },
          {
            id: 4,
            priority: 50,
            name: 'Fourth',
          },
        ],
      };
    },
    methods: {
      editTemplate(template) {
        this.editedItem = Object.assign({}, template); //clone item, not reference
        this.dialog = true;
      },
      save() {

      }
    }
  }
</script>

<style scoped>
  .is-clickable {
    cursor: pointer;
  }
</style>
