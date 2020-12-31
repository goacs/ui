<template>
  <div id="app">
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item brand-text" href="/">
            GoACS
          </a>
          <div class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" :to="{name: 'dashboard'}">
              Home
            </router-link>
            <router-link class="navbar-item" :to="{name: 'devices-list'}">
              Devices
            </router-link>
            <router-link class="navbar-item" :to="{name: 'template-list'}">
              Templates
            </router-link>
            <router-link class="navbar-item" :to="{name: 'file-list'}">
              Files
            </router-link>
            <router-link class="navbar-item" :to="{name: 'settings-main'}">
              Settings
            </router-link>

          </div>
          <div class="navbar-end">
            <router-link class="navbar-item" :to="{name: 'logout'}">
              Logout
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAV -->
    <div class="container ">
      <router-view></router-view>
    </div>
  </div>
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
