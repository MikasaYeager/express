const url = require('url')
const methods = require('methods')
const Route = require('./route')
const Layer = require('./layer')
function Router () {
  const router = function (req, res, next) {
    router.handle(req, res, next)
  }
  router.stack = []
  Object.setPrototypeOf(router, proto)
  return router
}

const proto = {}

proto.use = function (path, handler) {
  if (!handler) {
    if (typeof path === 'function') {
      handler = path
      path = '/'
    } else {
      return
    }
  }
  const layer = new Layer(path, handler)
  this.stack.push(layer)
}

proto.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  // layer的handler是它身上route的dispatch
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach(method => {
  proto[method] = function (path, handelrs) {
    const route = this.route(path)
    route[method](handelrs)
  }
})

proto.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url)
  const originalUrl = req.url
  const requestMethod = req.method.toLowerCase()
  let idx = 0
  const next = err => {
    // handle方法是迭代stack中的layer层来判断请求是否由当前中间件来处理
    // 中间件的类型分为三种:错误处理中间件,请求处理中间件,路由处理中间件
    // 1. 先通过err来判断是否有错误,如果有错误还需要判断路由是否为错误处理中间件,若是则处理
    // 2. 然后再判断layer的路径是否和pathname匹配,如果匹配的话还需要区分普通中间件和路由处理中间件
    // 3. 如果是普通中间件,还要排除掉错误处理中间件
    // 4. 如果是路由中间件还需要判断方法是否存在
    if (idx >= this.stack.length) {
      return out()
    }
    req.url = originalUrl
    const layer = this.stack[idx++]
    if (err) {
      // 如果有错,那么就找错误处理中间件
      if (!layer.route) {
        layer.handle_error(err, res, req, next)
      } else {
        // 跳过
        next()
      }
    } else {
      if (layer.match_path(pathname)) {
        // 如果layer有route的话那么就是路由中间件
        req.params = layer.params
        if (layer.route) {
          if (layer.route.match_method(requestMethod)) {
            layer.handle_request(req, res, next)
          } else {
            next()
          }
        } else {
          // 没有route的话那就是普通中间件,不过也需要排除错误处理中间件
          // 普通中间件注册的有可能是子路由,所以需要将url截取
          if (layer.handler.length !== 4) {
            req.url = pathname.slice(layer.path.length)
            layer.handle_request(req, res, next)
          } else {
            next()
          }
        }
      } else {
        // 路径不匹配
        next()
      }
    }
  }
  next()
}

module.exports = Router
