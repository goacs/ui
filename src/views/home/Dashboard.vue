<template>
  <div class="columns">
    <div class="column is-12">
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
      <div class="columns">
        <div class="column is-12">
          <div class="card events-card">
            <header class="card-header">
              <p class="card-header-title">
                Events
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
              </a>
            </header>
            <div class="card-table">
              <div class="content">
                <table class="table is-fullwidth is-striped">
                  <tbody>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  <tr>

                    <td>Lorum ipsum dolem aire</td>
                    <td class="level-right"><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">View All</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "Dashboard",
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
