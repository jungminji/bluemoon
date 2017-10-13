<template lang="pug">
  v-flex(class="loading" v-if="isLoading" transition="fade-transition")
    img(src="/loading.gif" class="loading-img")
</template>
<script>
export default {
  name: `loading`,
  data: () => ({
    isLoading: false
  }),
  mounted () {
    this.$eventBus.$on(`loading-on`, this.loadingOn)
    this.$eventBus.$on(`loading-off`, this.loadingOff)
  },
  beforeDestroy () {
    this.$eventBus.$off(`loading-on`)
    this.$eventBus.$off(`loading-off`)
  },
  methods: {
    loadingOn () {
      this.isLoading = true
    },
    loadingOff () {
      this.isLoading = false
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
    background: #FFF
    display: flex
    justify-content: center
    align-items: center
    & .loading-img
      width: 240px
      height: 240px
</style>
