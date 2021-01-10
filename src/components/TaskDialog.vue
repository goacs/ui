<template>
  <b-modal
          v-model="value"
          has-modal-card
          :width="1200"
          scroll="keep"
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
                      icon="delete"
              >

              </b-icon>
              Delete
            </b-button>
          </div>
        </header>
        <section class="modal-card-body">
          <b-field label="Event" horizontal>
            <b-select placeholder="Select event"
                      v-model="task.event"
            >
              <option value="inform">Inform</option>
<!--              <option value="empty">Empty</option>-->
              <option value="GetParameterValuesResponse">GetParameterValues Response</option>
            </b-select>
          </b-field>
          <b-field label="Type" horizontal>
            <b-select placeholder="Select type"
              v-model="task.task"
            >
              <option value="RunScript">Run Script</option>
              <option value="SendParameters">Send Parameters</option>
              <option value="Reboot">Reboot</option>
              <option value="UploadFirmware">Upload Firmware</option>
            </b-select>
          </b-field>
          <b-field label="Infinite" horizontal>
            <b-checkbox v-model="task.infinite">
              {{ task.infinite ? `Task will be not deleted when executed` : `` }}
            </b-checkbox>
          </b-field>
          <b-field v-if="task.task === 'RunScript'" label="Script" horizontal>
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
  import CodeEditor from "./CodeEditor";
  export default {
    name: "TaskDialog",
    components: {CodeEditor},
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      isNew: {
        type: Boolean,
        default: () => false,
      },
      task: {
        type: Object,
        default: () => {
          return {
            infinite: false,
            task: '',
            event: '',
            script: '',
          };
        }
      }
    },
    data() {
      return {
        saving: false,
      };
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
