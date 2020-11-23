const Layer = require('./layer')
const methods = require('methods')

function Route () {
  this.stack = []
  this.methods = {}
}

Route.prototype.dispatch = function (req, res, out) {
  // route里面的执行下一次需受控制,所以不能直接用for循环
  let index = 0
  const length = this.stack.length
  const next = () => {
    if (index >= length) {
      return out()
    }
    const layer = this.stack[index++]
    const method = req.method.toLowerCase()
    // 这个method的作用是app.route('/).get(fn1).post(fn2)...
    // 不过这个功能用的很少
    if (layer.match_method(method)) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}

Route.prototype.match_method = function (method) {
  return !!this.methods[method]
}

methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach(handler => {
      const layer = new Layer('', handler)
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    })
  }
})

module.exports = Route
