<template lang="pug">
  v-container(fluid class="pa-0")
    v-layout(column align-center class="home-search")
      v-spacer
      Search(:items="items")
      v-btn(icon :ripple="false" class="section-arrow-down" @click="toNewLab")
        v-icon(class="white--text") fa-chevron-down
      v-spacer
    v-layout(column align-center justify-center class="home-newlab" id="newlab")
      v-btn(icon :ripple="false" class="section-arrow-up" @click="toTop")
        v-icon fa-chevron-up
      h1(class="newlab-headline") 새 연구실 등록
      p(class="newlab-text") 연구실이 등록되어 있지 않으신가요? 1분 만에 연구실을 등록해보세요. 우수한 이공계 인재들이 당신의 연구실을 볼 수 있습니다!
      v-btn(color="primary" class="newlab-btn" nuxt to="/newlab") 지금 등록하기
</template>
<script>
import request from '~/assets/request.js'
import Search from '~/components/search'

export default {
  components: {
    Search
  },
  async asyncData ({req, res}) {
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
      items
    }
  },
  mounted () {
    this.$vuetify.load(() => {
      this.$eventBus.$emit('loading-off')
    })
  },
  methods: {
    toNewLab () {
      const newlab = this.$s('#newlab')
      this.$SmoothScroll(newlab)
    },
    toTop () {
      this.$SmoothScroll(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @keyframes arrowUp
    from
      transform: translateY(0px)
    to
      transform: translateY(-5px)

  @keyframes arrowDown
    from
      transform: translateY(0px)
    to
      transform: translateY(5px)

  .home-search, .home-newlab
    height: 100vh
    background-size: cover
    background-position: center center
  .home-search
    background-image: linear-gradient(to bottom, rgba(#29B6F6, 0.8), rgba(#29B6F6, 0.75)), url('/home-search-bg.jpg')
  .home-newlab
    background-image: linear-gradient(to bottom, rgba(#FFF, 0.85), rgba(#FFF, 0.9)), url('/home-newlab-bg.jpg')
  .section-arrow-down
    &:hover
      animation: arrowDown 0.15s linear 0.15s infinite alternate
  .section-arrow-up
    margin-bottom: 26px
    &:hover
      animation: arrowUp 0.15s linear 0.15s infinite alternate
  .newlab-headline, .newlab-text
    color: #616161
    letter-spacing: 0.8px
  .newlab-headline
    font-size: 1.7rem
    font-weight: bold
    margin-bottom: 30px
  .newlab-text
    max-width: 480px
    margin-bottom: 70px
    text-align: center
    font-size: 1.15rem
    line-height: 1.88
  .newlab-btn
    height: auto
    padding: 8px 12px
    border-radius: 20px
    font-weight: 600
    font-size: 1.05rem
    letter-spacing: 0.8px
</style>

