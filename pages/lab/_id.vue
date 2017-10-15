<template lang="pug">
  v-container(v-cloak fluid class="lab-container")
    pre {{ getLab }}
    pre {{ getInterview }}
</template>
<script>
import request from '~/assets/request.js'

export default {
  name: 'lab',
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
  .lab-container
    padding: 0
    padding-top: 100px
</style>

