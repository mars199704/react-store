import decode from "jwt-decode";

const JWT = 'store_token_id'

const setToken = token => {
  localStorage.setItem(JWT, token)
}

const getToken = () => {
  return localStorage.getItem(JWT)
}

const isLogin = () => {
  const jwToken = getToken()
  return !!jwToken
}

const getUser = () => {
  const jwToken = getToken()
  if(isLogin()){
    const user = decode(jwToken)
    return user
  }else{
    return null
  }
}

const logout = () => {
  localStorage.removeItem(JWT)
}

global.auth = {
  setToken, 
  getUser,
  logout
}