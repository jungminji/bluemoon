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
    mounted () {
      this.$vuetify.load(this.init)
    },
    beforeDestroy () {
      this.$eventBus.$off()
    },
    methods: {
      init () {
        if (window.scrollY >= 75) {
          this.$eventBus.$emit('toolbar-fixed')
        }
      },
      onScroll () {
        if (window.scrollY < 75) {
          this.$eventBus.$emit('toolbar-absolute')
          if (this.$route.name === 'result') {
            this.$eventBus.$emit('filter-mobile-absolute')
          }
        }
        if (window.scrollY >= 75) {
          this.$eventBus.$emit('toolbar-fixed')
          if (this.$route.name === 'result') {
            this.$eventBus.$emit('filter-mobile-fixed')
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
