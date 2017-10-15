<template lang="pug">
  div(class="loading" v-if="loading")
    v-progress-circular(indeterminate v-bind:size="65" :width="4")
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  mounted () {
    this.$eventBus.$on('loading-off', this.off)
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {},
    off () {
      this.loading = false
    }
  }
}
</script>
