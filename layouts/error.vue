<template lang="pug">
  v-container
    v-layout(style="padding-top: 200px")
      h1 {{error.statusCode}}
</template>
<script>
export default {
  props: ['error']
}
</script>

