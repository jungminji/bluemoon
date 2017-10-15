<template lang="pug">
  v-container(fluid class="filter-container pa-0")
    v-layout(justify-center class="pt-3 pb-3" v-if="!isOpen" @click="open" transition="fade-transition")
      v-icon search
      span 검색
    v-layout(column class="filter pa-4" align-center v-if="isOpen" transition="fade-transition")
      v-btn(icon @click.stop="close")
        v-icon fa-times
      v-layout(row wrap)
        v-flex(xs4 class="text-xs-right")
          v-btn(flat class="option") 학교별
        v-flex(xs4 class="text-xs-center")
          v-btn(flat class="option") 연구별
        v-flex(xs4 class="text-xs-left")
          v-btn(flat class="option") 교수님
      v-select(label="학교명")
      v-select(label="학과명")
      v-layout(row wrap)
        v-btn
          v-icon refresh
          span 초기화
        v-btn(color="primary")
          v-icon search
          span 지금 찾기
    v-layout(class="cover-result" v-if="isOpen")        
</template>
<script>
export default {
  name: 'filter',
  data: () => ({
    isOpen: false
  }),
  mounted () {
    this.$eventBus.$on('filter-mobile-absolute', this.filterAbs)
    this.$eventBus.$on('filter-mobile-fixed', this.filterFixed)
  },
  methods: {
    open () {
      const toolbar = this.$s('.toolbar')
      const filterContainer = this.$s('.filter-container')
      filterContainer.style.position = 'fixed'
      filterContainer.style.background = 'transparent'
      filterContainer.style.top = getComputedStyle(toolbar, null).getPropertyValue('height')
      this.isOpen = true

      // Must use next tick. wait for v-if condition to render completely
      this.$nextTick(() => {
        const btns = this.$sa('.option')
        btns.forEach((btn) => {
          btn.style.borderRadius = '0'
          btn.style.color = '#616161'
        })
        const query = this.$route.query
        const style = '2px solid #616161'
        if (query.superCategory) {
          btns[1].style.borderBottom = style
        }
        if (query.institution || Object.keys(query).length === 0) {
          btns[0].style.borderBottom = style
        }
        if (query.professor) {
          btns[2].style.borderBottom = style
        }
      })
    },
    close () {
      const filterContainer = this.$s('.filter-container')
      this.isOpen = false
      filterContainer.style.background = '#FFF'
      if (window.scrollY >= 75) {
        this.filterFixed()
        return
      }
      filterContainer.style.position = 'static'
      filterContainer.style.top = 'auto'
    },
    filterAbs () {
      const filterContainer = this.$s('.filter-container')
      filterContainer.style.position = 'static'
    },
    filterFixed () {
      const toolbar = this.$s('.toolbar')
      const filterContainer = this.$s('.filter-container')
      filterContainer.style.position = 'fixed'
      filterContainer.style.top = getComputedStyle(toolbar, null).getPropertyValue('height')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .filter-container
    cursor: pointer
    background: #FFF
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.26)
    z-index: 20
  .filter
    background: #FFF
  .cover-result
    height: 100vh
    background: rgba(#000, 0.7)
</style>

