<template>
  <tr>
    <td>{{ task.id }}</td>
    <td>{{ task.for_name }} {{ task.for_id }}</td>
    <td>{{ task.event }}</td>
    <td>{{ task.task }}</td>
    <td>{{ stripString(task.script, 50) }}</td>
    <td>{{ task.infinite }}</td>
    <td>
      <b-button
              size="is-small"
              @click="$parent.editTask(task)"
      >
        <b-icon
                icon="magnify"
                size="is-small"
        >
        </b-icon>
      </b-button>
    </td>
  </tr>
</template>

<script>
  export default {
    name: "TaskRow",
    props: {
      task: {
        type: Object,
        required: true,
      }
    },
    methods: {
      stripString(value, len) {
        if(!value) {
          return
        }
        return value.substr(0, len);
      },
    }
  }
</script>

<style scoped>

</style>
