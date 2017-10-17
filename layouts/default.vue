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
      this.$eventBus.$off()
    },
    methods: {
      onScroll () {
        if (window.scrollY < 100) {
          this.$eventBus.$emit('toolbar-absolute')
        }
        if (window.scrollY >= 100) {
          this.$eventBus.$emit('toolbar-fixed')
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
