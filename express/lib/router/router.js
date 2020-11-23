const url = require('url')

function Router () {
  this.stack = []
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    method: 'get',
    handler
  })
}

Router.prototype.handle = function (req, res, done) {
  const { pathname } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()
  for (let index = 0; index < this.stack.length; index++) {
    const { method, path, handler } = this.stack[index]
    if (method.toLowerCase() === requestMethod && pathname === path) {
      return handler(req, res)
    }
  }
  done()
}

module.exports = Router
