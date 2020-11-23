function Layer (path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match = function (pathname) {
  // 如果路径能完全匹配 直接返回true
  if (this.path === pathname) return true

  // 如果路径不能完全匹配,但是当前层是一个路由中间件
  if (!this.route) {
    if (this.path === '/') return true
    return pathname.startsWith(this.path + '/')
  }
}

Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer
