
const path = require('path')
// node 裡面的方法，用來讀取數據
const fs = require('fs')
const jsonServer = require('json-server')
// jwt
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

const getUserDb = () => {
  return JSON.parse(
      fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8')
    )
}

const isAuthenticated = ({email, password}) => {
  return getUserDb().users.findIndex(
    user => user.email === email && user.password === password
  ) !== -1
}



// 定義密鑰
const SECRET = "21683912rekwqjfdnewf"

// 定義閒置時間上限（ 再次需要密碼的時間 ）
const expiresIn = '1h'

// 註冊 jsonwebtoken
const createToken = payload => {
  return jwt.sign(payload, SECRET, { expiresIn })
}



server.post("/auth/login", (req, res) => {
  const { email, password } = req.body

  if(isAuthenticated({email, password})){
    const user = getUserDb().users.find(
      u => u.email === email && u.password === password
    )
    const { nickname, type } = user
    // jwt
    const jwToken = createToken({ nickname, type, email })
    return res.status(200).json(jwToken)
  } else {
    const status = 401
    const message = "Incorrect email or password"
    return res.status(status).json({status, message})
  }
})

server.use(router)
server.listen(3030, () => {
  console.log('JSON Server is running')
})