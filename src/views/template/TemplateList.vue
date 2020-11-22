<template>
  <div class="columns">
    <div class="column">
      <PaginatedTable
              action="template/list"
      >
        <b-table-column field="uuid" label="UUID" v-slot="props">
          {{ props.row.uuid }}
        </b-table-column>

        <b-table-column field="name" label="Name" v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="actions" label="Actions" v-slot="props">
          <b-button tag="router-link" type="is-primary" :to="{ name: 'devices-view', params: { uuid: props.row.uuid } }">
            <b-icon icon="magnify"></b-icon>
          </b-button>
        </b-table-column>
      </PaginatedTable>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TemplateList"
  }
</script>

<style scoped>

</style>
