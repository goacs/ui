<template>
  <tr>
    <td>{{ task.id }}</td>
    <td>{{ task.for_name }} {{ task.for_id }}</td>
    <td>{{ task.event }}</td>
    <td>{{ task.task }}</td>
    <td>{{ task.script }}</td>
    <td>{{ task.infinite }}</td>
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
    }
  }
</script>

<style scoped>

</style>
