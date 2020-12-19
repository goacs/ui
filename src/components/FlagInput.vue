<template>
  <b-taginput
    v-model="selectedFlags"
    :data="flags"
    :allow-new="false"
    :allow-duplicates="false"
    :open-on-focus="true"
    autocomplete
    field="name"
  >
  </b-taginput>
</template>

<script>
  export default {
    name: "FlagInput",
    props: {
      value: {
        type: String,
        requied: true,
      },
    },
    data() {
      return {
        selectedFlags: [],
        flags: [
          {
            value: 'R',
            name: 'Read'
          },
          {
            value: 'W',
            name: 'Write'
          },
          {
            value: 'A',
            name: 'Add Object'
          }
        ]
      }
    },
    watch: {
      selectedFlags(val) {
        const flagString = val.map(flag => flag.value).join('')
        console.log(flagString)
        this.$emit('input', flagString)
      },
      value(val) {
        const initialFlags = val.split('')
        initialFlags.forEach(initialFlag => {
          this.flags.forEach(flag => {
            if (flag.value === initialFlag) {
              this.selectedFlags.push(flag)
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    z-index: 101;
  }
</style>
