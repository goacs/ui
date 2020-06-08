<template>
    <v-app>
        <v-app-bar
                app
                color="accent"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        class="shrink mr-2"
                        contain
                        src="../assets/logo.png"
                        transition="scale-transition"
                        width="130"
                />
            </div>
            <v-spacer></v-spacer>

        </v-app-bar>

        <v-content>
            <router-view :key="$route.path"></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Base"
    }
</script>

<style scoped>

</style>
