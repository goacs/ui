<template>
    <PaginatedTable
            action="file/list"
            :autoload="false"
            :dense="true"
            ref="table"
    >

        <b-table-column field="name" label="Name" v-slot="props">
            {{ props.row.filename }}
        </b-table-column>

        <b-table-column field="size" label="File size" v-slot="props">
            {{ props.row.size }} bytes
        </b-table-column>

        <b-table-column field="size" label="Mod time" v-slot="props">
            {{ props.row.mod_time }}
        </b-table-column>

        <b-table-column field="actions" label="Actions" v-slot="props">
            <b-button tag="a" type="is-primary" :href="generateFileUri(props.row.filename)">
                <b-icon icon="download"></b-icon>
            </b-button>
        </b-table-column>
    </PaginatedTable>
</template>

<script>
    import PaginatedTable from "../../components/PaginatedTable";
    export default {
        name: "FileList",
        components: {PaginatedTable},
        methods: {
            generateFileUri(filename) {
                return `${process.env.VUE_APP_API_URL}../file/${filename}`
            }
        }
    }
</script>

<style scoped>

</style>
