import axios from 'axios'
import decode from 'jwt-decode'

function logout() {
  localStorage.removeItem('iods_token')
  localStorage.removeItem('user_profile')
  localStorage.removeItem('token')
}

function loggedIn() {
  const token = getToken()
  setAuthorizationHeader(token)
  return !!token && !isTokenExpired(token)
}

function getProfile() {
  if (loggedIn()) {
    const tokenData = decode(getToken())
    return tokenData.UserInfo || {}
  } else return {}
}

function hasAuthorizationHeader() {
  return !!axios.defaults.headers.common['Authorization']
}

function setAuthorizationHeader(idToken) {
  if (!hasAuthorizationHeader() && !!idToken && !isTokenExpired(idToken)) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
  }
}

function getToken() {
  return localStorage.getItem('iods_token') || '5'
}

function isTokenExpired(token) {
  try {
    const decoded = decode(token)
    return decoded.exp < Date.now() / 1000
  } catch (err) {
    return true
  }
}

function isAdmin() {
  if (loggedIn()) {
    const profile = getProfile()
    return profile.IsAdmin
  }
}

export { loggedIn, getProfile, logout, isAdmin }
