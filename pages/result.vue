<template lang="pug">
  v-container(fluid class="result-container")
    template(v-for="lab in result")
      Card(:lab="lab")
    v-btn(@click="loadMore" :disabled="isLoadable") 더 보기
</template>
<script>
import request from '~/assets/request.js'
import queryString from 'querystring'
import Card from '~/components/Card'

export default {
  name: 'result',
  components: {
    Card
  },
  data: () => ({
    result: null,
    count: 0,
    range: {
      from: 0,
      limit: 15
    }
  }),
  async mounted () {
    this.$eventBus.$emit('loading-on')
    this.result = await this.requestLabs(this.range.from, this.range.limit)
    this.updateRange(this.range.from, this.range.limit)
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
    async requestLabs (from, limit) {
      const {data} = await request({path: `labs/?${queryString.stringify(this.$route.query)}&offset=${from}&limit=${limit}`})
      this.count = data.count
      return data.labs
    },
    async loadMore () {
      const data = await this.requestLabs(this.range.from, this.range.limit)
      data.forEach((lab) => {
        this.result.push(lab)
      })
      this.updateRange(this.range.from, this.range.limit)
    },
    updateRange (from, limit) {
      this.$set(this.range, 'from', from + limit)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .result-container
    padding: 0
    padding-top: 100px
</style>

