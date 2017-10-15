<template lang="pug">
  v-container(fluid class="filter-container pa-0")
    v-layout(justify-center)
      v-icon search
      span 검색
</template>
<script>
export default {
  name: 'filter'
}
</script>
<style lang="stylus" scoped>
  .filter-container
    background: #FFF
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.26)
</style>

