<template>
  <b-modal
          v-model="value"
  >
    <form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ isNew ? `Add` : `Edit` }} task</p>
          <div class="card-header-icon" aria-label="more options" v-if="isNew === false">
            <b-button
                    size="is-small"
                    type="is-danger"
                    @click="$emit('onDelete', item)"
            >
              <b-icon
                      size="is-small"
                      icon="trash-can-outline"
              >

              </b-icon>
              Delete
            </b-button>
          </div>
        </header>
        <section class="modal-card-body">
          <b-field label="Event">
            <b-select placeholder="Select event"
                      v-model="task.event"
            >
              <option value="inform">Inform</option>
              <option value="empty">Empty</option>
              <option value="GetParameterValuesResponse">GetParameterValues Response</option>
            </b-select>
          </b-field>
          <b-field label="Type">
            <b-select placeholder="Select type"
              v-model="task.task"
            >
              <option value="RunScript">Run Script</option>
              <option value="SendParameters">Send Parameters</option>
              <option value="Reboot">Reboot</option>
              <option value="UploadFirmware">Upload Firmware</option>
            </b-select>
          </b-field>
          <b-field v-if="task.task === 'RunScript'" label="Script">
            <CodeEditor v-model="task.script"></CodeEditor>
<!--            <b-input type="textarea" v-model="task.script"></b-input>-->
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="$emit('input', false)">Close</b-button>
          <b-button type="is-primary" class="is-align-content-end" :loading="saving" @click="save">Save</b-button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
  import CodeEditor from "../../../components/CodeEditor";
  export default {
    name: "AddTask",
    components: {CodeEditor},
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      isNew: {
        type: Boolean,
        default: () => false,
      }
    },
    data() {
      return {
        saving: false,
        task: {
          task: '',
          event: '',
          script: '',
        }
      }
    },
    methods: {
      save() {
        this.$emit('onSave', this.task)
      }
    }
  }
</script>

<style scoped>

</style>
