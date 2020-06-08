<template>
    <v-app
      v-cloak
    >
        <v-content>
            <v-container
                fluid
                full-height
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="12"
                            md="8"
                            lg="6"
                    >
                        <router-view :key="$route.path"></router-view>
                    </v-col>
                </v-row>

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "LoginBase"
    }
</script>

<style scoped>

</style>
