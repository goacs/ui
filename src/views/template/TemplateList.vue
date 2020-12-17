<template>
  <div class="columns">
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Templates
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
              New
            </b-button>
          </div>
        </header>
        <div class="card-content">
          <PaginatedTable
                  action="template/list"
                  :autoload="false"
                  :dense="true"
                  ref="table"
          >
            <b-table-column field="uuid" label="ID" v-slot="props">
              {{ props.row.id }}
            </b-table-column>

            <b-table-column field="name" label="Name" v-slot="props">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="parameter_count" label="Parameter count" v-slot="props">
              {{ props.row.parameter_count }}
            </b-table-column>

            <b-table-column field="actions" label="Actions" v-slot="props">
              <b-button tag="router-link" type="is-primary" :to="{ name: 'template-view', params: { id: props.row.id } }">
                <b-icon icon="magnify"></b-icon>
              </b-button>
            </b-table-column>
          </PaginatedTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PaginatedTable from "../../components/PaginatedTable";
  export default {
    name: "TemplateList",
    components: {PaginatedTable}
  }
</script>

<style scoped>

</style>
