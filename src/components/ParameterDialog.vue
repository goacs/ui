<template>
  <b-modal
          v-model="value"
  >
    <form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ isNew ? `Add` : `Edit` }} parameter</p>
          <div class="card-header-icon" aria-label="more options" v-if="isNew === false">
            <b-button
                    size="is-small"
                    @click="$emit('onDelete', item)"
            >
              <b-icon
                      type="is-danger"
                      icon="trash-can-outline"
              >

              </b-icon>
            </b-button>
          </div>
        </header>
        <section class="modal-card-body">
          <b-field label="Name" label-position="on-border">
            <b-input
                    type="text"
                    v-model.number="item.name"
                    placeholder="Name">
            </b-input>
          </b-field>
          <b-field label="Value" label-position="on-border">
            <b-input
                    type="text"
                    v-model.number="item.value"
                    placeholder="Value">
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="$emit('input', false)">Close</b-button>
          <b-button type="is-primary" class="is-align-content-end" :disabled="!canSave" @click="save" :loading="saving">Save</b-button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: "ParameterDialog",
    data() {
      return {
        saving: false,
      }
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      item: {
        type: Object,
        required: true,
      },
      isNew: {
        type: Boolean,
        default: () => true
      }
    },
    computed: {
      canSave() {
        return this.item.name !== ""
      }
    },
    methods: {
      save() {
        this.saving = true
        this.$emit('onSave', this.item)
      }
    },
    watch: {
      value() {
        this.saving = false;
      }
    }
  }
</script>

<style scoped>

</style>
