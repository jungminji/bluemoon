<template lang="pug">
  v-container(fluid class="result__container pa-0")
    div(class="loading" v-if="isLoadMore")
      v-progress-circular(indeterminate v-bind:size="65" :width="4")
    MobileFilter(v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" :items="filterItems")
    DesktopFilter(v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl" :items="filterItems")
    template(v-for="lab in result")
      Card(:lab="lab")
    v-btn(@click="loadMore" :disabled="isLoadable") 더 보기
</template>
<script>
import request from '~/assets/request.js'
import queryString from 'querystring'
import Card from '~/components/card'
import MobileFilter from '~/components/filter/mobile.vue'
import DesktopFilter from '~/components/filter/desktop.vue'

export default {
  name: 'result',
  components: {
    MobileFilter,
    DesktopFilter,
    Card
  },
  data: () => ({
    isLoadMore: false
  }),
  async asyncData ({req, res, query}) {
    const resp = await request({path: `labs/?${queryString.stringify(query)}&offset=0&limit=15`})
    const items = {
      institution: [],
      category: [],
      professor: null
    }

    let [resInst, resCat, resProf] = await Promise.all([
      request({path: 'institutions', req, res}),
      request({path: 'super-categories', req, res}),
      request({path: 'professors/names', req, res})
    ])

    resInst.data.institutions.forEach((inst) => {
      items.institution.push(inst.name)
    })
    resCat.data.superCategories.forEach((cat) => {
      items.category.push(cat.name)
    })
    items.professor = resProf.data.names

    return {
      count: resp.data.count,
      result: resp.data.labs,
      range: {
        from: 15,
        limit: 15
      },
      filterItems: Object.assign({}, items)
    }
  },
  mounted () {
    this.$eventBus.$emit('toolbar-noBoxShadow')
    this.$eventBus.$emit('loading-off')
  },
  computed: {
    getResult () {
      return this.result ? this.result : ''
    },
    isLoadable () {
      if (this.count && this.result) {
        if (this.count === this.result.length) {
          return true
        }
      } else {
        return false
      }
    }
  },
  methods: {
    async loadMore () {
      this.isLoadMore = true
      const resp = await request({path: `labs/?${queryString.stringify(this.$route.query)}&offset=${this.range.from}&limit=${this.range.limit}`})
      resp.data.labs.forEach((lab) => {
        this.result.push(lab)
      })
      this.updateRange(this.range.from, this.range.limit)
      this.isLoadMore = false
    },
    updateRange (from, limit) {
      this.$set(this.range, 'from', from + limit)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .toolbar__no__shadow
    box-shadow: none
    border-bottom: 1px solid #E6E6E6
  .result__container
    margin-top: 57px
    padding: auto 0 0 0
    @media (min-width: 1265px) and (max-width: 1904px)
      margin: 57px auto
      max-width: 1120px !important
    @media (min-width: 1905px)
      margin: 57px auto
      max-width: 1440px !important
    &.desktop__filter__abs
      margin: 145px auto 57px auto !important
</style>
