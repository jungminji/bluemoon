<template lang="pug">
  v-container(fluid v-cloak class="lab__container pa-0")
    Mobile(:lab="getLab" :interview="getInterview" v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm")
    //- Desktop(:lab="getLab" :interview="getInterview" v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl")
</template>
<script>
import Mobile from '~/components/lab/mobile'
import Desktop from '~/components/lab/Desktop'
import request from '~/assets/request.js'

export default {
  name: 'lab',
  components: {
    Mobile,
    Desktop
  },
  async asyncData ({req, res, params, redirect}) {
    const { data } = await request({path: `labs/${params.id}`, version: 3})
    const resp = await request({path: `labs/${encodeURIComponent(data.lab.department.institution.name)}/${encodeURIComponent(data.lab.department.name)}/${encodeURIComponent(data.lab.name)}/interviews`})
    const model = []
    resp.data.interviews.forEach((interview) => {
      interview.interviewQuestions.forEach((question) => {
        const answers = []
        question.interviewAnswers.forEach((answer) => {
          answers.push(answer.text)
        })
        model.push({
          question: question.text,
          answer: answers.join('\n')
        })
      })
    })
    return {
      lab: data.lab,
      interview: model
    }
  },
  mounted () {
    this.$eventBus.$emit('toolbar-noBoxShadow')
    this.$eventBus.$emit('loading-off')
  },
  computed: {
    getLab () {
      return this.lab ? this.lab : ''
    },
    getInterview () {
      return this.interview ? this.interview : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.lab__container
  margin-top: 57px
</style>

