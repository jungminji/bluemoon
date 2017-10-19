<template lang="pug">
  v-layout(column class="card--root")
    a(@click.prevent="selectLab")
      v-card(class="card--container")
        v-card-text
          span(class="card--text--org")
            | {{ `${lab.department.institution.name} ${lab.department.name}` }}
          h2(class="card--text--lab")
            | {{ lab.name }}
          template(v-for="prof in lab.professors")
            span(class="card--text--prof") {{ `${prof.korFullName} 교수님` }}
    v-expansion-panel(class="expansion--container"
    @click.native="toggleBorder" ref="expansion")
      v-expansion-panel-content(class="expansion--contents")
        div(slot="header")
          span.expansion--text--views {{ `${lab.views} views` }}
          span {{ lab.numLikers }}
          v-btn(icon @click.stop="bookmark")
            v-icon(color="error") {{ lab.liked ? 'fa-heart' : 'fa-heart-o' }}
          v-dialog(v-model="requireLogin")
            v-card
              v-card-title 로그인을 해주세요!
        v-layout(row wrap class="expansion--tag--container")
          template(v-for="tag in lab.keywords" v-if="lab.keywords.length")
            span.tag {{ `#${tag.name}` }}
          template(v-if="!lab.keywords.length")
            span.tag 키워드가 존재하지 않습니다.
</template>
<script>

export default {
  name: 'card',
  props: {
    lab: Object
  },
  data: () => ({
    requireLogin: false
  }),
  computed: {
    isUserLoggedIn () {
      return false
    }
  },
  methods: {
    selectLab () {
      this.$router.push(`lab/${this.lab.uniqueName}`)
    },
    toggleBorder () {
      const cardRoot = this.$el
      const activeClass = 'card--root--active'

      if (cardRoot.classList.contains(activeClass)) {
        cardRoot.classList.remove(activeClass)
        return
      }
      cardRoot.classList.add(activeClass)
    },
    async bookmark () {
      if (this.isUserLoggedIn) {
        console.log('execute if user loggedin')
      } else {
        this.requireLogin = true
      }
      // if(this.getUser.isLoggedIn) {
      //   this.lab.liked = !this.lab.liked

      //   if(this.lab.liked) {
      //     await request({
      //     method: 'post',
      //     path: `users/${this.getUser.id}/liked-labs`,
      //     body: {
      //       institutionName: this.lab.department.institution.name,
      //       departmentName: this.lab.department.name,
      //       labName: this.lab.name,
      //     }})
      //   } else {
      //     await request({
      //       method: 'delete',
      //       path: `users/${this.getUser.id}/liked-labs?${queryString.stringify({
      //         institution: this.lab.department.institution.name,
      //         department: this.lab.department.name,
      //         lab: this.lab.name,
      //       })}`,
      //     });
      //   }

      // } else {
      //   alert('로그인을 해주세요!')
      // }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .card--root
    padding: 0
    position: relative
    &:before
      position: absolute
      left: 0
      content: ""
      width: 4px
      height: 90%
      background: #888
      z-index: 10
      top: 50%
      transform: translateY(-50%)
      transition: all .2s ease
    &.card--root--active
      z-index: 10
      box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
      &:before
        width: 6.5px
        height: 100%
        background: #29b6f6

  .card--container
    cursor: pointer
    box-shadow: none
    border: 1px solid #e6e6e6
    border-bottom: none

  .card--text--org,
  .card--text--lab,
  .card--text--prof
    color: #616161
    font-size: 1.10rem

  .card--text--lab
    font-size: 1.35rem
    font-weight: bold
    letter-spacing: -0.4px

  .expansion--container
    box-shadow: none
    border: 1px solid #e6e6e6
    border-top: none

  .expansion--text--views
    margin-right: 18px
  .expansion--tag--container
    padding: 5px 16px
    background: #e8e8e8
    & .tag
      padding-right: 10px
      color: #616161
      letter-spacing: 0.5px
      line-height: 1.5
</style>
