<template lang="pug">
  div(class="loading" v-if="loading")
    v-progress-circular(indeterminate color="primary" v-bind:size="65" :width="4")
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
<style lang="stylus" scoped>
.loading
  position: fixed
  z-index: 99
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(#FFF, 1)
  display: flex
  justify-content: center
  align-items: center
</style>
