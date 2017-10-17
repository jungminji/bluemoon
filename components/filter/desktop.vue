<template lang="pug">
  v-container(fluid class="filter__desktop__container pa-0" v-scroll="onScroll")
    v-layout(row wrap align-center class="option__container")
      v-flex(class="search__by")
        v-select(label="검색 방법" placeholder="학교별" :items="['학교별', '연구별', '교수님']" v-model="by")
      
      v-flex(class="search__option" v-if="by === '학교별'")
        v-select(label="학교명" :placeholder="placeholder.institution" :items="items.institution" v-model="model.institution")
      v-flex(class="search__sub-option" v-if="by === '학교별'")
        v-select(label="학과명" :placeholder="placeholder.department" v-model="model.department" :items="subItems.department")
      
      v-flex(class="search__option" v-if="by === '연구별'")
        v-select(label="연구 대분류" :placeholder="placeholder.category" :items="items.category" v-model="model.category")
      v-flex(class="search__sub-option" v-if="by === '연구별'")
        v-select(label="소분류" :placeholder="placeholder.subCategory" v-model="model.subCategory" :items="subItems.subCategory")

      v-flex(class="search__option" v-if="by === '교수님'")
        v-select(label="교수님" :placeholder="placeholder.professor" :items="items.professor" v-model="model.professor")
      
      v-flex(class="btn__container")
        v-btn(@click="reset" class="btn__reset")
          v-icon(color="error") refresh
          span 초기화
        v-btn(@click="submit" class="btn__submit" color="primary")
          v-icon search
          span 지금 찾기 
</template>
<script>
import queryString from 'querystring'
import request from '~/assets/request.js'

export default {
  name: 'filter-desktop',
  props: {
    items: Object
  },
  data: () => ({
    by: null,
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
      department: [],
      subCategory: []
    }
  }),
  mounted () {
    this.$vuetify.load(this.init)
  },
  watch: {
    by () {
      this.$nextTick(() => {
        this.$sa('.list__tile--disabled .list__tile__title').forEach((el) => {
          el.innerHTML = '<div>검색 결과가 없습니다.</div>'
        })
      })
    },
    async 'model.institution' (nVal, oVal) {
      const model = this.model
      const ph = this.placeholder
      if (nVal) {
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
        await this.requestDepartment(nVal)
        this.$set(this.subItems, 'subCategory', [])
      }
    },
    async 'model.category' (nVal, oVal) {
      const model = this.model
      const ph = this.placeholder
      if (nVal) {
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
        await this.requestSubCategory(nVal)
        this.$set(this.subItems, 'department', [])
      }
    },
    'model.professor' (nVal, oVal) {
      const model = this.model
      const ph = this.placeholder
      if (nVal) {
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
      } else {
        this.filterAbs()
      }
      this.initValue()
    },
    async initValue () {
      const query = this.$route.query
      const model = this.model
      const ph = this.placeholder
      if (query.superCategory) {
        this.by = '연구별'
        model.category = query.superCategory
        ph.category = query.superCategory
        await this.requestSubCategory(query.superCategory)
        if (query.category) {
          model.subCategory = query.category
          ph.subCategory = query.category
        }
        return
      }
      if (query.institution) {
        this.by = '학교별'
        model.institution = query.institution
        ph.institution = query.institution
        await this.requestDepartment(query.institution)
        if (query.department) {
          model.department = query.department
          ph.department = query.department
        }
        return
      }
      if (query.professor) {
        this.by = '교수님'
        model.professor = query.professor
        ph.professor = query.professor
        return
      }
      // if above condition all fails
      this.by = '학교별'
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
  & .btn__reset, & .btn__submit
    font-weight: 600
    border-radius: 20px
  & .btn__reset
    background: #FFF !important
    color: #F66A29
    border: 1px solid #F66A29
</style>