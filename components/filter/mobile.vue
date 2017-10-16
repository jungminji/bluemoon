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
          v-btn(flat class="option" @click="changeBtnStyle(0); byInstitution = true; byCategory = false; byProfessor = false") 학교별
        v-flex(xs4 class="text-xs-center")
          v-btn(flat class="option" @click="changeBtnStyle(1); byInstitution = false; byCategory = true; byProfessor = false") 연구별
        v-flex(xs4 class="text-xs-left")
          v-btn(flat class="option" @click="changeBtnStyle(2); byInstitution = false; byCategory = false; byProfessor = true") 교수님

      v-select(label="학교명" :items="items.institution" v-if="byInstitution" v-model="model.institution" :placeholder="placeholder.institution")
      v-select(label="학과명" v-if="byInstitution" v-model="model.department" :placeholder="placeholder.department")

      v-select(label="연구 대분류" :items="items.category" v-if="byCategory" v-model="model.category" :placeholder="placeholder.category")
      v-select(label="소분류" v-if="byCategory" v-model="model.subCategory" :placeholder="placeholder.subCategory")

      v-select(label="교수님" :items="items.professor" v-if="byProfessor" v-model="model.professor" :placeholder="placeholder.professor")

      v-layout(row wrap)
        v-btn(@click="reset")
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
  props: {
    items: Object
  },
  data: () => ({
    model: {
      institution: null,
      department: null,
      category: null,
      subCategory: null,
      professor: null
    },
    placeholder: {
      institution: null,
      department: null,
      category: null,
      subCategory: null,
      professor: null
    },
    isOpen: false,
    byInstitution: true,
    byCategory: false,
    byProfessor: false
  }),
  mounted () {
    this.$eventBus.$on('filter-mobile-absolute', this.filterAbs)
    this.$eventBus.$on('filter-mobile-fixed', this.filterFixed)
  },
  methods: {
    changeBtnStyle (n) {
      const btns = this.$sa('.option')
      btns.forEach((btn) => {
        btn.style.borderColor = 'transparent'
      })
      btns[n].style.borderColor = '#616161'
    },
    initValue () {
      const query = this.$route.query
      const model = this.model
      const ph = this.placeholder
      if (query.superCategory) {
        this.byCategory = true
        this.byInstitution = false
        this.byProfessor = false
        model.category = query.superCategory
        ph.category = query.superCategory
        if (query.category) {
          model.subCategory = query.category
          ph.subCategory = query.category
        }
      }
      if (query.institution) {
        this.byCategory = false
        this.byInstitution = true
        this.byProfessor = false
        model.institution = query.institution
        ph.institution = query.institution
        if (query.department) {
          model.department = query.department
          ph.department = query.department
        }
      }
      if (query.professor) {
        this.byCategory = false
        this.byInstitution = false
        this.byProfessor = true
        model.professor = query.professor
        ph.professor = query.professor
      }
    },
    open () {
      const toolbar = this.$s('.toolbar')
      const filterContainer = this.$s('.filter-container')
      filterContainer.style.position = 'fixed'
      filterContainer.style.background = 'transparent'
      filterContainer.style.top = getComputedStyle(toolbar, null).getPropertyValue('height')
      this.isOpen = true
      this.$nextTick(() => {
        const btns = this.$sa('.option')
        btns.forEach((btn) => {
          btn.style.borderRadius = '0'
          btn.style.color = '#616161'
          btn.style.borderBottom = '2px solid transparent'
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
      this.initValue()
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
    },
    reset () {
      const model = this.model
      const ph = this.placeholder
      for (let key in model) {
        if (model.hasOwnProperty(key)) {
          model[key] = null
        }
      }
      for (let key in ph) {
        if (ph.hasOwnProperty(key)) {
          ph[key] = null
        }
      }
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

