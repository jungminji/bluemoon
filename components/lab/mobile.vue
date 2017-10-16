<template lang="pug">
  div(class="pa-0")
    v-layout(column justify-center class="color-primary")
      h2(class="inst-dep") {{ lab.department.institution.name }} {{ lab.department.name }}
      h1(class="lab-name") {{ lab.name }}
      h2(class="lab-professor") {{ lab.professors[0].korFullName }} 교수님
    v-layout(row wrap class="tools")
      v-flex(xs7 class="flex-center")
        span {{ lab.views }} Views
        span 북마크 {{ lab.numLikers }}
        v-icon(color="error") bookmark_border
      v-flex(xs5 class="text-xs-right")
        v-btn(color="primary") 컨택하기
    v-layout(column class="contents")
      h1(class="contents-header") 랩 간단 요약
      p(class="contents-p") {{ lab.description || '해당 정보가 존재하지 않습니다.' }}
    v-layout(column class="contents")
      template(v-for="n in interview")
        h1(class="contents-header") {{ n.question }}
        p(class="contents-p") {{ n.answer }}
      template(v-if="!interview.length")
        p(class="contents-p") 인터뷰 정보가 없습니다.
    v-layout(row wrap)
      template(v-for="n in getCategories")
        span {{ n.superCategory.name }}
        span {{ n.name }}
      template(v-if="!getCategories")
        p(class="contents-p") 분류 정보가 없습니다.
</template>
<script>
export default {
  name: 'lab-mobile-view',
  props: ['lab', 'interview'],
  mounted () {
    this.$eventBus.$on('tools-mobile-absolute', this.toolsAbs)
    this.$eventBus.$on('tools-mobile-fixed', this.toolsFixed)
  },
  computed: {
    getCategories () {
      return this.lab.categories.length ? this.lab.categories : false
    }
  },
  methods: {
    toolsAbs () {
      const tools = this.$s('.tools')
      tools.style.position = 'static'
      tools.style.top = 'auto'
      tools.style.left = 'auto'
      tools.style.right = 'auto'
    },
    toolsFixed () {
      const tools = this.$s('.tools')
      const toolbar = this.$s('.toolbar')
      tools.style.position = 'fixed'
      tools.style.top = getComputedStyle(toolbar, null).getPropertyValue('height')
      tools.style.left = '0'
      tools.style.right = '0'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .color-primary
    background: #29b6f6
    color: #FFF
    padding: 30px 0 70px 20px
    & .inst-dep, & .lab-professor
      font-size: 0.95rem
      letter-spacing: 0.6px
      padding: 0
      margin: 0
    & .lab-name
      font-size: 1.45rem
      font-weight: bold
      letter-spacing: 0.6px
      padding-bottom: 5px
      margin: 0
    & .inst-dep
      padding-bottom: 5px
  .tools
    background: #FFF
    margin-bottom: 40px
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.26)
    & .flex-center
      display: flex
      justify-content: flex-start
      align-items: center
  .contents
    color: #616161
    padding: 0 20px
    & .contents-header
      font-size: 1.2rem
      font-weight: bold
      letter-spacing: 0.5px
    & .contents-p
      line-height: 2.0
      letter-spacing: 0.7px
      font-size: 0.95rem
</style>
