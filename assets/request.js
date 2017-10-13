import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
// const prefix = '/api'
const prefix = 'https://dev.labbylab.io/api'

const getToken = ({ req, res }) => {
  if (process.server) {
    if (!req || !req.headers.cookie) return // nuxt build or no cookie
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
    if (!jwtCookie) return
    const token = jwtCookie.split('=')[1]
    if (!token) return
    const decoded = jwtDecode(token)
    if (decoded.exp < Date.now() / 1000) { // if expired
      if (res) {
        res.setHeader('Set-Cookie', ['jwt=']) // destroy cookie
      }
    } else {
      return token
    }
  } else { // if client
    const token = Cookies.get('jwt')
    if (token) {
      return token
    }
  }
}

async function request ({
  path,
  method = 'get',
  body,
  req,
  res,
  version = 2
}) {
  const headers = {}
  const token = getToken({ req, res })
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  if (path[0] === '/') {
    path = path.slice(1)
  }
  // const url = `${prefix}/${path}`
  const url = `${prefix}/v${version}/${path}`
  return axios({
    url,
    method,
    data: body,
    headers
  })
}

export default request
