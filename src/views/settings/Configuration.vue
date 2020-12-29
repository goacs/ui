<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Configuration
      </p>
    </header>
    <div class="card-content">
      <b-field label="Periodic Inform Interval Spread">
        <b-input type="text"></b-input>
      </b-field>
      <b-field>
        <p class="control">
          <button class="button is-primary">
            Save
          </button>
        </p>
      </b-field>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Configuration"
  }
</script>

<style scoped>

</style>
