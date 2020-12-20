<template>
  <div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Queued Tasks
      </p>
      <div class="card-header-icon" aria-label="more options">
        <b-button
          size="is-small"
          @click="addDialog = true"
        >
          <b-icon
                  icon="plus"
                  size="is-small"
          >

          </b-icon>
          Add
        </b-button>
      </div>
    </header>
    <div class="content">
      <a v-for="task in tasks" :key="task.id" class="panel-block is-active">
        <span class="panel-icon">
          <b-tooltip
                  v-if="task.infinite"
                  label="Infinite task"
          >
            <b-icon

                    icon="infinity"
                    size="is-small"
            ></b-icon>
          </b-tooltip>

        </span>
        {{ task.task }}
        <span class="script-description has-text-grey-light">{{task.script}}</span>
      </a>
    </div>
  </div>
    <AddTask v-model="addDialog" is-new @onSave="saveTask"></AddTask>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import AddTask from "./tasks/AddTask";

  export default {
    name: "DeviceQueuedTasks",
    components: {AddTask},
    data() {
      return {
        addDialog: false,
      }
    },
    computed: {
      ...mapGetters({
        device: 'device/getDevice',
        tasks: 'device/getQueuedTasks',
      }),
    },
    methods: {
      async fetchTasks() {
        this.$store.dispatch('device/fetchQueuedTasks', this.device.uuid)
      },
      async saveTask(task) {
        task.cpe_uuid = this.device.uuid
        try {
          await this.$store.dispatch('device/addTask', task)
          this.fetchTasks()
          this.addDialog = false;
        } catch (e) {
          this.$buefy.toast.open({
            duration: 5000,
            message: `Error. Cannot add task: ${e.response.data.message}`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      }
    },
    async mounted() {
      await this.fetchTasks()
    },
    beforeDestroy() {
      this.$store.commit('device/setQueuedTasks', [])
    }
  }
</script>

<style scoped>
  .script-description {
    margin-left: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
  }
</style>
