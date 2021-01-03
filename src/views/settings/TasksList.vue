<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Tasks
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
          New
        </b-button>
      </div>
    </header>
    <div class="card-content">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>ID</th>
            <th>For</th>
            <th>Event</th>
            <th>Task</th>
            <th>Script</th>
            <th>Infinite</th>
          </tr>
        </thead>
        <tbody>
          <tr is="TaskRow" v-for="task in tasks" :key="task.id" :task="task"></tr>
        </tbody>
      </table>
    </div>
    <AddTask is-new v-model="addDialog" @onSave="saveTask"></AddTask>
  </div>
</template>

<script>
  import TaskRow from "./tasks/TaskRow";
  import {mapGetters} from "vuex";
  import AddTask from "../../components/AddTask";
  export default {
    name: "TasksList",
    components: {AddTask, TaskRow},
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks',
      }),
    },
    data() {
      return {
        addDialog: false,
      };
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await this.$store.dispatch('tasks/fetchTasks')
          this.$store.commit('tasks/setTasks', response.data.data)
        } catch (e) {
          this.$store.commit('tasks/setTasks', [])
        }
      },
      async saveTask(task) {
        try {
          console.log(task)
          await this.$store.dispatch('tasks/storeTask', task)
          await this.fetchTasks()
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
    async beforeMount() {
      await this.fetchTasks()

    }
  }
</script>

<style scoped>

</style>
