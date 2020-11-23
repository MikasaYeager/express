// layer层只匹配路径
function Layer (path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match_path = function (pathname) {
  return this.path === pathname
}

Layer.prototype.match_method = function (method) {
  return this.method === method
}

Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length === 4) {
    return this.handler(err, req, res, next)
  }
  return next(err)
}

Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer
