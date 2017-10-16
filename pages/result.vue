<template lang="pug">
  v-container(fluid class="result-container")
    div(class="loading" v-if="isLoadMore")
      v-progress-circular(indeterminate v-bind:size="65" :width="4")
    MobileFilter(v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" :items="filterItems")
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
  async mounted () {
    await this.$vuetify.load(this.init)
  },
  beforeDestroy () {
    const toolbar = this.$s('.toolbar')
    toolbar.style.boxShadow = '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)'
    toolbar.style.border = '0 none'
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
    init () {
      const toolbar = this.$s('.toolbar')
      const result = this.$s('.result-container')
      toolbar.style.boxShadow = 'none'
      toolbar.style.borderBottom = '1px solid #e6e6e6'
      result.style.padding = '0'
      result.style.paddingTop = getComputedStyle(toolbar, null).getPropertyValue('height')
      this.$eventBus.$emit('loading-off')
    },
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
