const http = require('http')
const url = require('url')
const Router = require('./router')
const methods = require('methods')
function Application () {}

Application.prototype.lazy_router = function () {
  if (!this.router) {
    this.router = new Router()
  }
}

Application.prototype.use = function (path, handler) {
  // application只负责转发,尽量不处理参数
  this.lazy_router()
  this.router.use(path, handler)
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_router()
    this.router[method](path, handlers)
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
