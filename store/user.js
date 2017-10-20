import request from '~/assets/request'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

const setToken = (token) => {
  if (process.SERVER_BUILD) return
  Cookies.set('jwt', token)
}

const unsetToken = () => {
  if (process.SERVER_BUILD) return
  Cookies.remove('jwt')
}

const state = () => ({
  isInitialized: false,
  id: null,
  isLoggedIn: false,
  pending: false,
  errorMessage: null,
  email: null,
  name: null,
  roles: []
})

const errorMessages = {
  NO_SUCH_EMAIL: '이메일 주소가 정확하지 않습니다.',
  PASSWORD_INCORRECT: '비밀번호가 정확하지 않습니다.'
}

export const mutations = {
  loginStart (state) {
    state.pending = true
  },
  loginSuccess (state, decodedToken) {
    state.pending = false
    state.id = decodedToken.id
    state.email = decodedToken.email
    state.name = decodedToken.name
    state.roles = decodedToken.roles
    state.errorMessage = null
    state.isLoggedIn = true
  },
  loginFailure (state, errorType) {
    state.pending = false
    state.id = null
    state.email = null
    state.name = null
    state.roles = []
    state.errorMessage = errorMessages[errorType] || '로그인 시도 중 오류가 발생했습니다.'
    state.isLoggedIn = false
  },
  logoutSuccess (state) {
    state.pending = false
    state.id = null
    state.email = null
    state.name = null
    state.roles = []
    state.errorMessage = null
    state.isLoggedIn = false
  }
}
export const actions = {
  async login ({ commit }, { email, password }) {
    try {
      commit('loginStart')
      const resp = await request({
        method: 'post',
        path: 'authentication',
        body: { email, password }
      })
      const { token } = resp.data
      const decoded = jwtDecode(token)
      setToken(token)
      commit('loginSuccess', decoded)
    } catch (err) {
      unsetToken()
      if (err.response) {
        commit('loginFailure', err.response.data.type)
      } else {
        commit('loginFailure')
      }
    }
  },
  async facebookLogin ({ commit }, { accessToken }) {
    try {
      commit('loginStart')
      const resp = await request({
        method: 'post',
        path: 'authentication/facebook',
        body: {
          accessToken
        }
      })
      const { token } = resp.data
      const decoded = jwtDecode(token)
      setToken(token)
      commit('loginSuccess', decoded)
    } catch (err) {
      if (err.response) {
        commit('loginFailure', err.response.data.type)
      } else {
        commit('loginFailure')
      }
    }
  },
  logout ({ commit }) {
    unsetToken()
    commit('logoutSuccess')
    history.go(0)
  },
  initialize ({ commit }, { req, res, isServer }) {
    try {
      if (isServer) {
        if (!req) return
        if (!req.headers.cookie) return
        const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
        if (!jwtCookie) return
        const token = jwtCookie.split('=')[1]
        if (!token) return
        const decoded = jwtDecode(token)
        if (!decoded || decoded.exp < Date.now() / 1000) { // if expired
          return
        }
        commit('loginSuccess', decoded)
      } else {
        const token = Cookies.get('jwt')
        if (!token) return
        const decoded = jwtDecode(token)
        if (!decoded) return
        if (decoded.exp < Date.now() / 1000) { // if expired
          unsetToken()
        }
        commit('loginSuccess', decoded)
      }
    } catch (e) {
      unsetToken()
      commit('logoutSuccess')
    }
  }
}

const getters = {
  getLoginStatus (state) {
    return state.isLoggedIn
  }
}

export default { state, mutations, actions, getters }
