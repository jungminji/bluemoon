<template lang="pug">
  v-container(fluid class="filter__container pa-0" v-scroll="onScroll")
    v-layout(justify-center class="pt-3 pb-3" v-if="!isOpen" @click="open" transition="fade-transition")
      v-icon search
      span 검색
    v-layout(column class="filter pa-4" align-center v-if="isOpen" transition="fade-transition")
      v-btn(icon @click.stop="close")
        v-icon fa-times
      v-layout(row wrap)
        v-flex(xs4 class="text-xs-right")
          v-btn(flat class="btn__option" @click="changeBtnStyle(0); byInstitution = true; byCategory = false; byProfessor = false") 학교별
        v-flex(xs4 class="text-xs-center")
          v-btn(flat class="btn__option" @click="changeBtnStyle(1); byInstitution = false; byCategory = true; byProfessor = false") 연구별
        v-flex(xs4 class="text-xs-left")
          v-btn(flat class="btn__option" @click="changeBtnStyle(2); byInstitution = false; byCategory = false; byProfessor = true") 교수님

      v-select(label="학교명" :items="items.institution" v-if="byInstitution" v-model="model.institution" :placeholder="placeholder.institution")
      v-select(label="학과명" :items="subItems.department" v-if="byInstitution" v-model="model.department" :placeholder="placeholder.department" :disabled="disableDepartment")

      v-select(label="연구 대분류" :items="items.category" v-if="byCategory" v-model="model.category" :placeholder="placeholder.category")
      v-select(label="소분류" :items="subItems.subCategory" v-if="byCategory" v-model="model.subCategory" :placeholder="placeholder.subCategory" :disabled="disableSubCategory")

      v-select(label="교수님" :items="items.professor" v-if="byProfessor" v-model="model.professor" :placeholder="placeholder.professor")

      v-layout(row wrap)
        v-btn(@click="reset")
          v-icon refresh
          span 초기화
        v-btn(@click="submit" color="primary")
          v-icon search
          span 지금 찾기
    v-layout(class="cover-result" v-if="isOpen")        
</template>
<script>
import request from '~/assets/request.js'
import queryString from 'querystring'

export default {
  name: 'filter-mobile',
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
    subItems: {
      subCategory: [],
      department: []
    },
    isOpen: false,
    byInstitution: true,
    byCategory: false,
    byProfessor: false
  }),
  mounted () {
    this.$vuetify.load(this.init)
  },
  computed: {
    disableSubCategory () {
      if (!this.model.category) {
        this.placeholder.subCategory = '대분류를 선택해주세요.'
        return true
      } else {
        return false
      }
    },
    disableDepartment () {
      if (!this.model.institution) {
        this.placeholder.department = '학교명을 선택해주세요.'
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    async 'model.institution' (newValue, oldValue) {
      const model = this.model
      const ph = this.placeholder
      if (newValue) {
        for (let key in model) {
          if (model.hasOwnProperty(key) && key !== 'institution') {
            model[key] = null
          }
        }
        for (let key in ph) {
          if (ph.hasOwnProperty(key) && key !== 'institution') {
            ph[key] = null
          }
        }
        await this.requestDepartment(newValue)
        this.$set(this.subItems, 'subCategory', [])
      }
    },
    async 'model.category' (newValue, oldValue) {
      const model = this.model
      const ph = this.placeholder
      if (newValue) {
        for (let key in model) {
          if (model.hasOwnProperty(key) && key !== 'category') {
            model[key] = null
          }
        }
        for (let key in ph) {
          if (ph.hasOwnProperty(key) && key !== 'category') {
            ph[key] = null
          }
        }
        await this.requestSubCategory(newValue)
        this.$set(this.subItems, 'department', [])
      }
    },
    'model.professor' (newValue, oldValue) {
      const model = this.model
      const ph = this.placeholder
      if (newValue) {
        for (let key in model) {
          if (model.hasOwnProperty(key) && key !== 'professor') {
            model[key] = null
          }
        }
        for (let key in ph) {
          if (ph.hasOwnProperty(key) && key !== 'professor') {
            ph[key] = null
          }
        }
      }
    }
  },
  methods: {
    init () {
      if (window.scrollY >= 100) {
        this.filterFixed()
      }
      this.$removeClass(this.$s('.result__container'), 'desktop__filter__abs')
    },
    onScroll () {
      if (window.scrollY < 100) {
        this.filterAbs()
      }
      if (window.scrollY >= 100) {
        this.filterFixed()
      }
    },
    changeBtnStyle (n) {
      this.$sa('.btn__option').forEach((el) => {
        this.$removeClass(el, 'active')
      })
      this.$addClass(this.$sa('.btn__option')[n], 'active')
    },
    async initValue () {
      const query = this.$route.query
      const model = this.model
      const ph = this.placeholder
      if (query.superCategory) {
        this.byCategory = true
        this.byInstitution = false
        this.byProfessor = false
        model.category = query.superCategory
        ph.category = query.superCategory
        await this.requestSubCategory(query.superCategory)
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
        await this.requestDepartment(query.institution)
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
    async requestDepartment (institution) {
      this.$set(this.subItems, 'department', [])
      let { data } = await request({path: `institutions/${encodeURIComponent(institution)}/departments`})
      data.departments.forEach((dep) => {
        this.subItems.department.push(dep.name)
      })
    },
    async requestSubCategory (category) {
      this.$set(this.subItems, 'subCategory', [])
      let { data } = await request({path: `super-categories/${encodeURIComponent(category)}/categories`})
      data.categories.forEach((cat) => {
        this.subItems.subCategory.push(cat.name)
      })
    },
    open () {
      this.isOpen = true
      this.$nextTick(() => {
        const query = this.$route.query
        this.$addClass(this.$s('.filter__container'), 'active')
        if (query.superCategory) {
          this.$addClass(this.$sa('.btn__option')[1], 'active')
        }
        if (query.institution || Object.keys(query).length === 0) {
          this.$addClass(this.$sa('.btn__option')[0], 'active')
        }
        if (query.professor) {
          this.$addClass(this.$sa('.btn__option')[2], 'active')
        }
      })
      this.initValue()
    },
    close () {
      this.isOpen = false
      this.$removeClass(this.$s('.filter__container'), 'active')
      if (window.scrollY >= 75) {
        this.filterFixed()
        return
      }
      this.filterAbs()
    },
    filterAbs () {
      this.$removeClass(this.$s('.filter__container'), 'fixed')
    },
    filterFixed () {
      this.$addClass(this.$s('.filter__container'), 'fixed')
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
    },
    submit () {
      const model = this.model
      const data = {
        superCategory: model.category,
        category: model.subCategory,
        institution: model.institution,
        department: model.department,
        professor: model.professor
      }
      if (data.superCategory || data.institution || data.professor) {
        this.$router.push(`/result?${queryString.stringify(data)}`)
      } else {
        alert('검색 조건을 선택해주세요!')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .filter__container
    cursor: pointer
    background: #FFF
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.26)
    z-index: 20
    &.fixed
      position: fixed
    &.active
      position: fixed
      background: transparent
      top: 57px
  .filter
    background: #FFF
  .cover-result
    height: 100vh
    background: rgba(#000, 0.7)
  .btn__option
    color: #616161
    border-radius: 0
    border-bottom: 2px solid transparent
    &.active
      border-color: #616161
</style>

