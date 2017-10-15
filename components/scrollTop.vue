<template lang="pug">
  div(class="button--to--top" @click="scrollToTop" v-if="show")
    v-icon(class="button--to--top--icon") fa-chevron-up
</template>
<script>
export default {
  name: 'scrollToTop',
  data: () => ({
    show: false
  }),
  mounted () {
    this.$eventBus.$on('scrollToTop-on', this.showBtn)
    this.$eventBus.$on('scrollToTop-off', this.hideBtn)
  },
  methods: {
    scrollToTop () {
      this.$SmoothScroll(0)
    },
    showBtn () {
      this.show = true
    },
    hideBtn () {
      this.show = false
    }
  }
}
</script>
<style lang="stylus" scoped>

  @keyframes scroll--to--top
   from
      transform: translateY(0%)
   to
      transform-origin: center center
      transform: translateY(-6.3%)

  .button--to--top
    display: flex
    cursor: pointer
    position: fixed
    justify-content: center
    border-radius: 50%
    align-items: center
    bottom: 10px
    right: 10px
    width: 50px
    height: 50px
    background: rgba(#1565C0, 0.65)
    z-index: 99
    &:hover
      animation: scroll--to--top 0.2s ease-in-out 0.1s infinite alternate
  .button--to--top--icon
    color: #FFF

</style>
