<template>
  <div class="columns">
    <section class="column is-12">
      <!--          <nav class="breadcrumb" aria-label="breadcrumbs">-->
      <!--            <ul>-->
      <!--              <li><a href="../">Bulma</a></li>-->
      <!--              <li><a href="../">Templates</a></li>-->
      <!--              <li><a href="../">Examples</a></li>-->
      <!--              <li class="is-active"><a href="#" aria-current="page">Admin</a></li>-->
      <!--            </ul>-->
      <!--          </nav>-->
      <section class="hero is-info welcome is-small">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Hello, {{username}}.
            </h1>
            <h2 class="subtitle">
              I hope you are having a great day!
            </h2>
          </div>
        </div>
      </section>
      <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">{{ dashboard.devices_count }}</p>
              <p class="subtitle">Devices</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">{{ dashboard.informs_count }}</p>
              <p class="subtitle">Informs last hour</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">{{ dashboard.exceptions_count  }}</p>
              <p class="subtitle">Exceptions last 24 hours</p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <Events :events="dashboard.faults"></Events>
      </section>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Events from "./Events";
  export default {
    name: "Dashboard",
    components: {Events},
    computed: {
      ...mapGetters({
        dashboard: "dashboard/getDashboard"
      }),
      username() {
        return this.$auth.user().username || "UKNNOWN"
      }
    },
    mounted() {
      this.$store.dispatch("dashboard/fetchDashboard")
    }
  }
</script>

<style scoped>

</style>
