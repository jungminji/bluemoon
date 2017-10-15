<template lang="pug">
  v-container(fluid class="find-pw-container pl-0 pr-0")
    v-layout(row justify-center align-center class="title")
      h1(class="headline") 비밀번호 찾기
    v-layout(column align-center class="fields mt-5")
      p(class="desc") 새 비밀번호를 받으실 이메일 주소(본인 계정 아이디)를 입력해주세요.
      v-text-field(name="user-email" label="계정 아이디(E-mail 주소)" placeholder="abc@example.com" v-model="userEmail" :rules="[rules.email]" required)
      v-btn(class="submit-btn") 완료
</template>
<script>
export default {
  data: () => ({
    userEmail: null,
    rules: {
      email: (value) => {
        // eslint-disable-next-line
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '이메일 형식이 올바르지 않습니다'
      }
    }
  }),
  mounted () {
    const toolbar = this.$s('.toolbar')
    const container = this.$s('.find-pw-container')
    container.style.paddingTop = getComputedStyle(toolbar, null).height
    this.$vuetify.load(() => {
      this.$eventBus.$emit('loading-off')
    })
  }
}
</script>

<style lang="stylus" scoped>

  .title
    min-height: 180px
    background-position: center center
    background-size: cover
    background-image: linear-gradient(to bottom, rgba(#29B6F6, 0.8), rgba(#29B6F6, 0.75)), url('/home-search-bg.jpg')
  .headline
    color: #FFF
    font-weight: bold
    font-size: 1.7rem
    letter-spacing: 0.7px
  .fields
    margin: 0 auto
    max-width: 335px
    & .desc
      color: #616161
  .submit-btn
    width: 100%
    margin: 0 auto
    height: auto
    border-radius: 25px
    color: #FFF
    font-weight: bold
    padding 9px 0
    background-color: #29B6F6 !important
    font-size: 1.1rem
</style>

