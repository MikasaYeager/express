// layer层只匹配路径
function Layer (path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match = function (pathname) {
  return this.path === pathname
}

Layer.prototype.handle = function (req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer
