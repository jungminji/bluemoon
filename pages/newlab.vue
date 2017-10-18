<template lang="pug">
  v-container(fluid class="pa-0 newlab-container")
    iframe(:style="frameStyle" src="https://docs.google.com/forms/d/e/1FAIpQLSd211VKEg8Af7SlvpzQUzO7egiVg1L0zRRRbU6b_VG9by4Jdw/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0")
</template>
<script>
export default {
  data: () => ({
    frameStyle: {
      width: '100%',
      height: '100%'
    }
  }),
  mounted () {
    const iframe = this.$s('iframe')
    iframe.onload = () => {
      this.$eventBus.$emit('loading-off')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .newlab-container
    height: 100vh
</style>

