<template lang="pug">
  div(class="pa-0 lab__container")
    v-layout(row wrap)
      v-flex(xs9 class="headline")
        h2 {{ lab.department.institution.name }} {{ lab.department.name }}
        h1 {{ lab.name }}
        h2 {{ lab.professors[0].korFullName }}
      v-flex(xs3 class="tools")
    v-layout(row wrap)
      v-flex(xs9 class="contents")
      v-flex(xs3 class="categories")
</template>
<script>
export default {
  name: 'lab-desktop',
  props: ['lab', 'interview']
}
</script>
<style lang="stylus" scoped>
  .lab__container
    margin: 0 auto
    @media (min-width: 1265px) and (max-width: 1904px)
      max-width: 1120px !important
    @media (min-width: 1905px)
      max-width: 1440px !important
    & .headline, & .tools
      min-height: 180px
    & .headline
      color: #FFF
      background: #29B6F6
      box-shadow: 0 2px 10px 0 rgba(#000, 0.16);
    & .tools
      background: #FFF
</style>


