<template lang="pug">
  v-container(fluid class="login-container" :style="setMaxWidth")
    v-layout
      v-btn(class="facebook-login pt-2 pb-2")
        v-icon(class="mr-2") fa-facebook-official
        | 페이스북으로 로그인
    v-layout(row wrap class="pt-4 pb-4")
      v-flex(xs5 class="relative")
        v-divider(class="divider center")
      v-flex(xs2 class="text-xs-center")
        span(class="text-color") 또는
      v-flex(xs5 class="relative")
        v-divider(class="divider center")

    v-layout(column)
      v-text-field(name="username" label="아이디" placeholder="ironman@labbylab.io" v-model="username" :rules="[rules.email]" required)
      v-text-field(name="password" label="비밀번호" placeholder="********" min="8" v-model="password" type="password" required)

    v-layout(class="pt-1")
      v-btn(class="login-btn") 로그인
    
    v-layout(column class="pt-5 text-xs-center")
      p(class="mb-1") 아직 회원이 아니세요?
        nuxt-link(to="/join" class="signup") 회원가입
      nuxt-link(to="/find-password" class="find-pw") 비밀번호 찾기
</template>
<script>
export default {
  name: 'login',
  data: () => ({
    username: null,
    password: null,
    rules: {
      email: (value) => {
        // eslint-disable-next-line
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '이메일 형식이 올바르지 않습니다'
      }
    }
  }),
  computed: {
    setMaxWidth () {
      let maxWidth = null
      let breakpoint = this.$vuetify.breakpoint
      if (breakpoint.sm || breakpoint.md) {
        maxWidth = '70%'
      }
      if (breakpoint.lg || breakpoint.xl) {
        maxWidth = '640px'
      }
      return {
        maxWidth
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-container
    padding-top: 120px
    padding-left: 45px
    padding-right: 45px
  .facebook-login, .login-btn
    width: 100%
    margin: 0 auto
    height: auto
    border-radius: 25px
    background-color: #365899 !important
    color: #FFF
    font-weight: bold
  .login-btn
    padding 9px 0
    background-color: #29B6F6 !important
    font-size: 1.1rem
  .relative
    position: relative
  .center
    position: absolute
    top: 50%
    transform: translateY(-50%)
    text-align: center
    display: inline-block
  .divider
    height: 2px
  .text-color
    color: #616161
  .signup, .find-pw
    font-weight: bold
    text-decoration: underline
    letter-spacing: 0.7px
  .signup
    margin-left: 5px
  .find-pw
    color: #616161
    opacity: 0.5
</style>