const http = require('http')
const url = require('url')
const Router = require('./router')
function Application () {
  this.router = new Router()
}

Application.prototype.get = function (path, handler) {
  // 应用层只做转发
  this.router.get(path, handler)
}

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
