const { pathToRegexp } = require('path-to-regexp')

// layer层只匹配路径
function Layer (path, handler) {
  this.path = path
  this.handler = handler
  this.pathReg = pathToRegexp(path, (this.keys = []), true)
}

Layer.prototype.match_path = function (pathname) {
  // 如果路由完全匹配那么就肯定能匹配
  // 如果有动态参数,先匹配动态参数.如果动态参数reg和路由匹配的话要加上params
  // 如果是普通中间件,那么只要开头匹配就可以了
  // 如果以上都不是的话那么就是不能匹配了
  if (this.path === pathname) return true

  // 说明这个中间件是有动态参数的
  if (this.keys.length > 0) {
    const matches = pathname.match(this.pathReg)
    if (matches) {
      this.params = {}
      const matchValues = matches.slice(1)
      this.keys.forEach((item, idx) => {
        this.params[item.name] = matchValues[idx]
      })
      return true
    }
  }

  // 普通中间件
  if (!this.route) {
    if (this.path === '/') {
      return true
    }
    // 排除/a匹配/aaa/b这种情况
    return pathname.startsWith(this.path + '/')
  }
  return false
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
