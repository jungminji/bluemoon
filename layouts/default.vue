<template lang="pug">
  v-app(v-scroll="onScroll")
    ScrollToTop
    Toolbar(app)
    main
      v-content
        nuxt
    //- Here goes Footer
</template>

<script>
  import Toolbar from '~/components/toolbar.vue'
  import ScrollToTop from '~/components/scrollTop.vue'

  export default {
    components: {
      Toolbar,
      ScrollToTop
    },
    beforeDestroy () {
      this.$eventBus.$off('filter-mobile-absolute')
      this.$eventBus.$off('filter-mobile-fixed')
      this.$eventBus.$off('tools-mobile-absolute')
      this.$eventBus.$off('tools-mobile-fixed')
    },
    methods: {
      onScroll () {
        if (window.scrollY < 100) {
          this.$eventBus.$emit('toolbar-absolute')
          if (this.$route.name === 'result') {
            this.$eventBus.$emit('filter-mobile-absolute')
          }
          if (this.$route.name === 'lab-id') {
            this.$eventBus.$emit('tools-mobile-absolute')
          }
        }
        if (window.scrollY >= 100) {
          this.$eventBus.$emit('toolbar-fixed')
          if (this.$route.name === 'result') {
            this.$eventBus.$emit('filter-mobile-fixed')
          }
          if (this.$route.name === 'lab-id') {
            this.$eventBus.$emit('tools-mobile-fixed')
          }
        }
        if (window.scrollY < 150) {
          this.$eventBus.$emit('scrollToTop-off')
        }
        if (window.scrollY >= 150) {
          this.$eventBus.$emit('scrollToTop-on')
        }
      }
    }
  }
</script>

