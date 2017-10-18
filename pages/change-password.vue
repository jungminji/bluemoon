<template lang="pug">
  v-container(fluid class="find-change-container pl-0 pr-0")
    v-layout(row justify-center align-center class="title")
      h1(class="headline") 비밀번호 변경
    v-layout(column align-center class="fields mt-5")
      v-text-field(name="password" label="기존 비밀번호" placeholder="기존의 비밀번호를 입력하세요." v-model="password" type="password" required)
      v-text-field(name="new-password" label="새 비밀번호" placeholder="숫자, 영어 포함 8자 이상." v-model="newPassword" type="password" required :rules="[rules.password]")
      v-text-field(name="new-password-confirm" label="새 비밀번호 확인" placeholder="새 비밀번호 확인" v-model="newPasswordConfirm" type="password" required :rules="[rules.password]")
      v-btn(class="submit-btn" :disabled="disabled") 변경하기
</template>
<script>
export default {
  data: () => ({
    password: null,
    newPassword: null,
    newPasswordConfirm: null,
    disabled: true,
    rules: {
      password: (value) => {
        // eslint-disable-next-line
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return pattern.test(value) || '비밀번호 형식이 올바르지 않습니다.'
      }
    }
  }),
  mounted () {
    const toolbar = this.$s('.toolbar')
    const container = this.$s('.find-change-container')
    container.style.paddingTop = getComputedStyle(toolbar, null).height
    this.$vuetify.load(() => {
      this.$eventBus.$emit('loading-off')
    })
  },
  watch: {
    password () {
      this.validation()
    },
    newPassword () {
      this.validation()
    },
    newPasswordConfirm () {
      this.validation()
    }
  },
  methods: {
    validation () {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (pattern.test(this.newPassword) && pattern.test(this.newPasswordConfirm) && this.password !== null && (this.newPassword === this.newPasswordConfirm)) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
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
