<template lang="pug">
  v-container(fluid class="search__container")
    h1(class="sr-only") 연구소 검색 도구
    v-layout(row justify-center)
      h2(class="search-welcome") 다양한 방법으로&nbsp;
        span(class="bold") 연구실
        | &nbsp;을 찾아보세요!
    v-layout(row)
      v-flex(xs4 class="text-xs-right")
        v-btn(flat class="btn__option" :ripple="false" @click="searchBy(0)") 학교별
      v-flex(xs4 class="text-xs-center pl-2 pr-2")
        v-btn(flat class="btn__option" :ripple="false" @click="searchBy(1)") 분야별
      v-flex(xs4 class="btn__text-xs-left")
        v-btn(flat class="btn__option" :ripple="false" @click="searchBy(2)") 교수님

    v-layout(row wrap)
      v-flex(xs1 class="center animation animation-left" @click="toLeft")
        v-btn(icon class="arrow arrow-left")
          v-icon(class="white--text") fa-chevron-left

      v-flex(xs10 class="pa-2 slide-container")
        div(class="slide" v-if="by.institution")
          v-select(label="학교명" :items="items.institution" v-model="institution" :placeholder="placeholder.institution || '전체보기'")
          v-select(label="학과명" :items="itemsRequested.department" v-model="department" :placeholder="placeholder.department" :disabled="disabled.department")
        div(class="slide" v-if="by.category")
          v-select(label="연구 대분류" :items="items.category" v-model="category" :placeholder="placeholder.category || '전체보기'")
          v-select(label="연구 소분류" :items="itemsRequested.subCategory" v-model="subCategory" :placeholder="placeholder.subCategory" :disabled="disabled.subCategory")
        div(class="slide" v-if="by.professor")
          v-select(label="교수님" :items="items.professor" v-model="professor" :placeholder="placeholder.professor || '전체보기'")

      v-flex(xs1 class="center animation animation-right" @click="toRight")
        v-btn(icon class="arrow arrow-right")
          v-icon(class="white--text") fa-chevron-right

    v-layout(row justify-center)
      v-btn(@click="submit" class="submit")
        v-icon search
        | 지금 찾기
    v-layout(row justify-center)
      v-btn(@click="clickToReset" class="reset")
        v-icon refresh
        | 초기화


</template>
<script>
import request from '~/assets/request.js'
import queryString from 'querystring'

export default {
  props: {
    items: Object
  },
  data: () => ({
    by: {
      institution: true,
      category: false,
      professor: false
    },
    institution: null,
    department: null,
    category: null,
    subCategory: null,
    professor: null,
    itemsRequested: {
      department: [],
      subCategory: []
    },
    placeholder: {
      institution: null,
      department: '학교명을 선택해주세요',
      category: null,
      subCategory: '대분류를 선택해주세요',
      professor: null
    },
    disabled: {
      department: true,
      subCategory: true
    }
  }),
  mounted () {
    this.$vuetify.load(this.init)
  },
  watch: {
    institution (newValue, oldValue) {
      if (newValue) {
        this.placeholder.department = '전체보기'
        this.disabled.department = false
        this.requestDepartment(newValue)
      }
    },
    category (newValue, oldValue) {
      if (newValue) {
        this.placeholder.subCategory = '전체보기'
        this.disabled.subCategory = false
        this.requestSubCategory(newValue)
      }
    }
  },
  methods: {
    init () {
      this.$addClass(this.$sa('.btn__option')[0], 'white__border__bottom')
      this.$sa('.search__container label').forEach((el) => {
        this.$addClass(el, 'label__text__color')
      })
    },
    toLeft () {
      const by = this.by
      if (by.institution) {
        by.institution = false
        by.department = false
        by.professor = true
        this.searchBy(2)
      } else if (by.category) {
        by.institution = true
        by.department = false
        by.professor = false
        this.searchBy(0)
      } else {
        by.institution = false
        by.department = true
        by.professor = false
        this.searchBy(1)
      }
    },
    toRight () {
      const by = this.by
      if (by.institution) {
        by.institution = false
        by.department = true
        by.professor = false
        this.searchBy(1)
      } else if (by.category) {
        by.institution = false
        by.department = false
        by.professor = true
        this.searchBy(2)
      } else {
        by.institution = true
        by.department = false
        by.professor = false
        this.searchBy(0)
      }
    },
    searchBy (n) {
      const btns = this.$sa('.btn__option')
      const by = this.by

      this.reset()

      btns.forEach((btn) => {
        this.$removeClass(btn, 'white__border__bottom')
      })
      this.$addClass(btns[n], 'white__border__bottom')

      if (n === 0) {
        by.institution = true
        by.category = false
        by.professor = false
      }
      if (n === 1) {
        by.institution = false
        by.category = true
        by.professor = false
      }
      if (n === 2) {
        by.institution = false
        by.category = false
        by.professor = true
      }
    },
    async requestDepartment (institution) {
      let { data } = await request({path: `institutions/${encodeURIComponent(institution)}/departments`})
      data.departments.forEach((dep) => {
        this.itemsRequested.department.push(dep.name)
      })
    },
    async requestSubCategory (category) {
      let { data } = await request({path: `super-categories/${encodeURIComponent(category)}/categories`})
      data.categories.forEach((cat) => {
        this.itemsRequested.subCategory.push(cat.name)
      })
    },
    reset () {
      this.institution = null
      this.department = null
      this.category = null
      this.subCategory = null
      this.professor = null
      this.itemsRequested.department = []
      this.itemsRequested.subCategory = []

      this.placeholder.institution = null
      this.placeholder.department = '학교명을 선택해주세요'
      this.placeholder.category = null
      this.placeholder.subCategory = '대분류를 선택해주세요'
      this.placeholder.professor = null

      this.disabled.department = true
      this.disabled.subCategory = true
    },
    clickToReset () {
      this.reset()
      this.searchBy(0)
    },
    submit () {
      const data = {
        superCategory: this.category,
        category: this.subCategory,
        institution: this.institution,
        department: this.department,
        professor: this.professor
      }
      if (data.superCategory || data.institution || data.professor) {
        this.$router.push(`/result?${queryString.stringify(data)}`)
      } else {
        this.$router.push('/result')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

  @keyframes shakeLeft
    from
      transform: translateX(0px)
    to
      transform: translateX(-7.5px)

  @keyframes shakeRight
    from
      transform: translateX(0px)
    to
      transform: translateX(7.5px)

  .search__container
    padding-top: 80px
    max-width: 40%
    flex: none
    & .btn__option
      min-width: auto
      color: #FFF
      margin: 0
      font-size: 1.15rem
      font-weight: 600
      border-bottom: 1.5px solid transparent
      &.white__border__bottom
        border-color: #FFF
    @media (max-width: 600px)
      max-width: 87.5%
    @media (min-width: 601px) and (max-width: 960px)
      max-width: 55%
    & .label__text__color
      color: #616161 !important

  .search-welcome
    color: #FFF
    letter-spacing: 0.8px
    font-size: 1rem
    & .bold
      font-weight: bold

  .animation
    cursor: pointer
  .arrow-left
    text-shadow: -12px 0px 0px rgba(#FFF, 0.5)
  .animation-left
    &:hover
      animation: shakeLeft 0.15s linear 0.15s infinite alternate
  .arrow-right
    text-shadow: 12px 0px 0px rgba(#FFF, 0.5)
  .animation-right
    &:hover
      animation: shakeRight 0.15s linear 0.15s infinite alternate
  .arrow-before-hide
    &:before
      display: none

  .center
    display: flex
    align-items: center
    justify-content: center

  .slide-container
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center

  .slide
    min-height: 180px
    flex-basis: 100%
    background: #FFF
    padding: 16px
    border-radius: 10px
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    @media (max-width: 330px)
      max-width: 190px
    @media (min-width: 1905px)
      padding: 45px 20px

  .submit, .reset
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 10px 0 rgba(0, 0, 0, 0.16)
    border-radius: 20px
    height: auto
    letter-spacing: 0.8px
  .submit
    font-weight: bold
    font-size: 1.1rem
    color: #616161
    padding: 7.5px 16px
  .reset
    font-weight: bold
    color: red
    border: 1px solid red
    padding: 4px 10px
    

</style>

