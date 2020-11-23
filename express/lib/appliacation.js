const http = require('http')
const url = require('url')
const Router = require('./router')
const methods = require('methods')
function Application () {
  this.router = new Router()
}

methods.forEach(method=>{
  Application.prototype[method] = function (path,...handlers) {
    this.router[method](path,handlers)
  }
})


Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    // 将请求交给路由去做处理,application只做请求的转发和请求不到时的逻辑
    function done () {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this.router.handle(req, res, done)
  })

  return server.listen(...args)
}

module.exports = Application
