<template lang="pug">
  v-app(v-scroll="onScroll")
    Loading
    ScrollToTop
    Toolbar(app)
    main
      v-content
        nuxt
    //- Here goes Footer
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import Loading from '~/components/Loading.vue'
  import ScrollToTop from '~/components/ScrollToTop.vue'

  export default {
    components: {
      Toolbar,
      Loading,
      ScrollToTop
    },
    beforeDestroy () {
      this.$eventBus.$off()
    },
    methods: {
      onScroll () {
        if (window.scrollY < 75) {
          this.$eventBus.$emit('toolbar-absolute')
        }
        if (window.scrollY >= 75) {
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
