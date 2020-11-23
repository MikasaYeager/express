const http = require('http')
const url = require('url')
function Application () {
  this.routes = [
    {
      path: '*',
      method: 'all',
      handler: (req, res) => {
        res.end(`Cannot ${req.method} ${req.url}`)
      }
    }
  ]
}

Application.prototype.get = function (path, handler) {
  this.routes.push({
    method: 'get',
    path,
    handler
  })
}

Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url,true)
    const requestMethod = req.method.toLowerCase()
    for (let index = 1; index < this.routes.length; index++) {
      const { path, method, handler } = this.routes[index]
      if (pathname === path && method === requestMethod) {
        return handler(req, res)
      }
    }
    return this.routes[0].handler(req, res)
  })

  server.listen(...args)
}

module.exports = Application
