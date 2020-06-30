<template>
  <v-app>
    <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            right
            dark
            app
            v-model="drawer"
    >
      <v-list
              dense
              nav
              class="py-0"
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-face</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.email}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link :to="{ name: 'devices-list' }">
          <v-list-item-icon>
            <v-icon>mdi-access-point</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Devices list</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
                  block
                  color="secondary"
          >Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
            app
            color="accent"
            dark
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            clipped-right
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container fluid>
       <router-view :key="$route.path"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Base",
  data() {
    return {
      drawer: null,
    }
  },
    computed: {
      user() {
          return this.$auth.user();
      }
    }
}
</script>

<style scoped>

</style>
