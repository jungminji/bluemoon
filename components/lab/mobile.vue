<template lang="pug">
  div(class="pa-0" v-scroll="onScroll")
    v-layout(column justify-center class="color-primary")
      h2(class="inst-dep") {{ lab.department.institution.name }} {{ lab.department.name }}
      h1(class="lab-name") {{ lab.name }}
      h2(class="lab-professor") {{ lab.professors[0].korFullName }} 교수님
    v-layout(row wrap class="tools")
      v-flex(xs7 class="flex-center")
        span(class="views") {{ lab.views }} Views
        span 북마크 {{ lab.numLikers }}
        v-icon(@click="bookmark" color="error" class="bookmark") {{ lab.liked ? 'fa-heart' : 'fa-heart-o' }}
        v-dialog(v-model="requireLogin")
          v-card
            v-card-title 로그인을 해주세요!
      v-flex(xs5 class="text-xs-right")
        v-btn(@click.stop="contact = true" color="primary" class="contact-btn") 컨택하기
        v-dialog(v-model="contact")
          v-card
            v-card-title 컨택하기 dialog
    v-layout(column class="contents")
      h1(class="contents-header") 랩 간단 요약
      p(class="contents-p") {{ lab.description || '해당 정보가 존재하지 않습니다.' }}
    v-layout(column class="contents")
      template(v-for="n in interview")
        h1(class="contents-header") {{ n.question }}
        p(class="contents-p") {{ n.answer }}
      template(v-if="!interview.length")
        p(class="contents-p") 인터뷰 정보가 없습니다.
    v-layout(column class="categories__header")
      h1(class="heading") 분류
    v-layout(row wrap class="categories")
      div(v-for="n in getCategories" class="categories__item")
        span(class="categories__item__category") {{ n.superCategory.name }}
        span(class="categories__item__subcat") {{ n.name }}
      template(v-if="!getCategories")
        p(class="contents-p") 분류 정보가 없습니다.
</template>
<script>
export default {
  name: 'lab-mobile',
  props: ['lab', 'interview'],
  data: () => ({
    requireLogin: false,
    contact: false
  }),
  mounted () {
    this.$vuetify.load(this.init)
  },
  computed: {
    getCategories () {
      return this.lab.categories.length ? this.lab.categories : false
    },
    getUserLoggedIn () {
      return false
    }
  },
  methods: {
    init () {
      if (window.scrollY >= 100) {
        this.toolsFixed()
      }
    },
    onScroll () {
      if (window.scrollY < 100) {
        this.toolsAbs()
      }
      if (window.scrollY >= 100) {
        this.toolsFixed()
      }
    },
    toolsAbs () {
      this.$removeClass(this.$s('.tools'), 'fixed')
    },
    toolsFixed () {
      this.$addClass(this.$s('.tools'), 'fixed')
    },
    bookmark () {
      if (this.getUserLoggedIn) {
        console.log('execute when user is logged in')
      } else {
        this.requireLogin = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .color-primary
    background: #29b6f6
    color: #FFF
    padding: 30px 20px 70px 20px
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
    padding: 5px 0
    margin-bottom: 40px
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.26)
    &.fixed
      position: fixed
      left: 0
      right: 0
      top: 57px
    & .flex-center
      display: flex
      justify-content: flex-start
      align-items: center
    & .views
      padding-left: 20px
      margin-right: 15px
    & .bookmark
      margin-left: 6px
    & .contact-btn
      margin-right: 15px
      border-radius: 20px
      font-weight: bold
      height: auto
      padding: 5px 10px
      font-size: 1.05rem
  .contents
    color: #616161
    padding: 0 20px
    margin-top: 20px
    & .contents-header
      font-size: 1.2rem
      font-weight: bold
      letter-spacing: 0.5px
      line-height: 1.3
    & .contents-p
      line-height: 2.0
      letter-spacing: 0.7px
      font-size: 0.95rem


.categories__header
  color: #616161
  padding: 0 20px
  margin-top: 30px
  & .heading
    font-size: 1.2rem
    font-weight: bold
    letter-spacing: 0.5px
.categories
  padding-left: 20px
  padding-bottom: 40px
  & .categories__item
    display: flex
    margin-right: 10px
    margin-bottom: 7px
    & .categories__item__category, .categories__item__subcat
      font-weight: bold
      font-size: 1rem
      display: block
      padding: 3px 8px
      border: 1px solid #01579b
    & .categories__item__category
      color: #FFF
      background: #01579b
      border-top-left-radius: 20px
      border-bottom-left-radius: 20px
    & .categories__item__subcat
      color: #01579b
      border-top-right-radius: 20px
      border-bottom-right-radius: 20px

</style>
