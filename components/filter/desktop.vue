<template lang="pug">
  v-container(fluid class="filter__desktop__container pa-0" v-scroll="onScroll")
    v-layout(row wrap align-center class="option__container")
      v-flex(class="search__by")
        v-select(label="검색 방법" placeholder="학교별")
      v-flex(class="search__option")
        v-select(label="학교명" placeholder="전체보기")
      v-flex(class="search__sub-option")
        v-select(label="학과명" placeholder="전체보기")
      v-flex(class="btn__container")
        v-btn(class="btn__reset")
          v-icon(color="error") refresh
          span 초기화
        v-btn(class="btn__submit" color="primary")
          v-icon search
          span 지금 찾기 
</template>
<script>
export default {
  name: 'filter-desktop',
  props: {
    items: Object
  },
  mounted () {
    this.$vuetify.load(this.init)
  },
  methods: {
    init () {
      this.filterAbs()
      if (window.scrollY >= 100) {
        this.filterFixed()
      }
    },
    onScroll () {
      if (window.scrollY < 100) {
        this.filterAbs()
      }
      if (window.scrollY >= 100) {
        this.filterFixed()
      }
    },
    filterAbs () {
      this.$removeClass(this.$s('.filter__desktop__container'), 'fixed')
      this.$addClass(this.$s('.result__container'), 'desktop__filter__abs')
    },
    filterFixed () {
      this.$addClass(this.$s('.filter__desktop__container'), 'fixed')
      this.$removeClass(this.$s('.result__container'), 'desktop__filter__abs')
    }
  }
}
</script>
<style lang="stylus" scoped>
.filter__desktop__container
  float: left
  position: absolute
  top: 57px
  left: 0
  right: 0
  background: #FFF
  z-index: 60
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26)
  & .option__container
    margin: 0 auto
    @media (min-width: 1265px) and (max-width: 1904px)
      max-width: 1120px !important
    @media (min-width: 1905px)
      max-width: 1440px !important
  &.fixed
    position: fixed

.search__by, .search__option, .search__sub-option
  padding-top: 12px
  padding-left: 7px
  padding-right: 7px
.search__by
  flex-basis: 16%
.search__option
  flex-basis: 25%
.search__sub-option
  flex-basis: 33%

.btn__container
  flex-basis: 21.5%
  display: flex
  justify-content: center
</style>