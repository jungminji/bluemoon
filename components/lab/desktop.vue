<template lang="pug">
  div(class="pa-0 lab__container")
    v-layout(row wrap)
      v-flex(xs9 class="headline")
        h2(class="inst-dep") {{ lab.department.institution.name }} {{ lab.department.name }}
        h1(class="lab") {{ lab.name }}
        h2(class="prof") {{ lab.professors[0].korFullName }} 교수님
      v-flex(xs3 class="tools__container")
        div(class="tools")
          p(class="views") 조회수 : {{ lab.views }} Views
          p(class="bookmark") 북마크 : {{ lab.numLikers }}
            v-btn(icon class="icon__bookmark")
              v-icon(color="error") {{ lab.liked ? 'fa-heart' : 'fa-heart-o' }}
          v-btn(@click.stop="contact = true" color="primary" round class="btn__contact") 컨택하기
          v-dialog(v-model="contact")
            v-card
              v-card-title
                h2(class="contact__dialog__heading") 컨택하기
              v-card-text
                h5(class="contact__dialog__subheading") 교수님 이메일
                template(v-for="prof in lab.professors")
                  a(:href="`mailto:${prof.email}`") {{ prof.email || '정보가 존재하지 않습니다' }}
                h5(class="contact__dialog__subheading mt-2") 랩 홈페이지
                a(:href="lab.website" target="_blank") {{ lab.website || '정보가 존재하지 않습니다' }}
              v-card-actions
                v-spacer
                v-btn(round color="error" @click="contact = false" class="contact__dialog__btn__close") 닫기
    v-layout(row wrap)
      v-flex(xs9 class="contents")
        h1(class="contents-header") 랩 간단 요약
        p(class="contents-p") {{ lab.description || '해당 정보가 존재하지 않습니다.' }}
        template(v-for="n in interview")
          h1(class="contents-header") {{ n.question }}
          p(class="contents-p") {{ n.answer }}
        template(v-if="!interview.length")
          p(class="contents-p") 인터뷰 정보가 없습니다.
      v-flex(xs3 class="categories")
        div(class="categories__item")
          h2(class="categories__heading") 분류
          template(v-for="n in getCategories")
            div
              span(class="categories__item__category") {{ n.superCategory.name }}
              span(class="categories__item__subcat") {{ n.name }}
        template(v-if="!getCategories")
          div(class="categories__item")
            p(class="contents-p no__result") 분류 정보가 없습니다.
</template>
<script>
export default {
  name: 'lab-desktop',
  props: ['lab', 'interview'],
  data: () => ({
    contact: false
  }),
  computed: {
    getCategories () {
      return this.lab.categories.length ? this.lab.categories : false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .lab__container
    margin: 64px + 20px auto 220px auto
    @media (min-width: 1265px) and (max-width: 1904px)
      max-width: 1120px !important
    @media (min-width: 1905px)
      max-width: 1440px !important
    & .headline, & .tools
      min-height: 180px
    & .headline
      display: flex
      justify-content: center
      flex-direction: column
      padding-left: 20px
      color: #FFF
      background: #29B6F6
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.26)
      letter-spacing: 0.7px
      & .inst-dep
        font-size: 1.15rem
        margin-bottom: 5px
      & .lab
        font-size: 1.75rem
        font-weight: bold
        margin-bottom: 30px
      & .prof
        font-size: 1.15rem
        margin-bottom: 0
    & .tools__container
      padding-left: 20px
      & .tools
        display: flex
        flex-direction: column
        justify-content: center
        padding: 30px
        background: #FFF
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
        & .views, & .bookmark
          font-weight: bold
          color: #616161
          letter-spacing: 0.8px
          margin: 0
        & .views
          margin-bottom: 2px
        & .icon__bookmark
          margin-left: 10px
        & .btn__contact
          width: 80%
          margin: 40px auto 0 auto
          font-weight: bold

  .contents
    min-height: 920px
    color: #616161
    padding: 50px 20px
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    & .contents-header
      font-size: 1.2rem
      font-weight: bold
      letter-spacing: 0.5px
    & .contents-p
      line-height: 2.0
      letter-spacing: 0.7px
      font-size: 0.95rem

  .categories
    max-height: 200px
    padding-top: 20px
    padding-left: 20px
    & .no__result
      margin: 10px auto
      color: #616161
    & .categories__item
      padding: 20px
      display: flex
      flex-wrap: wrap
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
      background: #FFF
      & .categories__heading
        color: #616161
        font-size: 1.2rem
        font-weight: bold
        letter-spacing: 0.5px
        flex-basis: 100%
      & .categories__item__category, .categories__item__subcat
        font-weight: bold
        display: inline-block
        font-size: 0.87rem
        padding: 2px 6px
        border: 1px solid #01579b
      & .categories__item__category
        color: #FFF
        background: #01579b
        border-top-left-radius: 20px
        border-bottom-left-radius: 20px
        margin-bottom: 5px
      & .categories__item__subcat
        color: #01579b
        border-top-right-radius: 20px
        border-bottom-right-radius: 20px
        margin-right: 5px

.contact__dialog__heading
  color: #616161
  font-size: 1.45rem
  margin: 0
.contact__dialog__subheading
  color: #616161
  margin: 0
  font-size: 1.15rem
.contact__dialog__btn__close
  font-weight: bold
  </style>


