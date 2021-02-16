<template>
  <b-modal
          v-model="value"
          has-modal-card
          :can-cancel="false"
  >
    <form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Upload file</p>
        </header>
        <section class="modal-card-body">
          <b-field class="file is-primary" :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label" @input="upload" :loading="uploading" drag-drop expanded>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                            icon="upload"
                            size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button @click="$emit('input', false)">Close</b-button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
  export default {
    name: "UploadFile",
    props: {
      value: {
        type: Boolean,
      },
    },
    data() {
      return {
        file: null,
        uploading: false,
      }
    },
    methods: {
      upload(file) {
        this.uploading = true

        try {
          this.$store.dispatch('file/upload', file)
          setTimeout(() => this.$emit('uploaded', true), 500);
        } catch (e) {
          this.$buefy.toast.open({
            type: 'is-danger',
            position: 'is-bottom',
            message: "Cannot upload file"
          })
        } finally {
          this.uploading = true
          this.$emit('input', false);
        }
      }
    }
  }
</script>

<style scoped>

</style>
