const url = require('url')
const methods = require('methods')
const Route = require('./route')
const Layer = require('./layer')
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

Router.prototype.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  // layer的handler是它身上route的dispatch
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handelrs) {
    const route = this.route(path)
    route[method](handelrs)
  }
})

Router.prototype.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()
  let idx = 0
  const next = () => {
    if (idx >= this.stack.length) {
      return out()
    }
    const layer = this.stack[idx++]
    if (layer.match(pathname) && layer.route.match(requestMethod)) {
      layer.handle(req, res, next)
    } else {
      next()
    }
  }
  next()
}

module.exports = Router
