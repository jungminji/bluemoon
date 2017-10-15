<template lang="pug">
  div(class="loading" v-if="loading")
    v-progress-circular(indeterminate v-bind:size="65" :width="4")
</template>
<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
