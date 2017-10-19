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
              v-icon(color="error") {{ lab.liked ? 'bookmark' : 'bookmark_border' }}
          v-btn(color="primary" round class="btn__contact") 컨택하기
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
    margin: 64px + 20px auto 0 auto
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
      box-shadow: 0 2px 10px 0 rgba(#000, 0.16);
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
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
  .categories
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
</style>


