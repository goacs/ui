<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Queued Tasks
      </p>
      <div class="card-header-icon" aria-label="more options">
        <b-button
          size="is-small"
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
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "DeviceQueuedTasks",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        device: 'device/getDevice',
        tasks: 'device/getQueuedTasks',
      }),
    },
    async mounted() {
      this.$store.dispatch('device/fetchQueuedTasks', this.device.uuid)
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
