// 默认当前版本是4.17
const express = require('./express')
const app = express()
app.get(
  '/',
  function (req, res, next) {
    console.log(1)
    next()
  },
  function (req, res, next) {
    console.log(11)
    next()
  },
  function (req, res, next) {
    console.log(111)
    next()
  }
)
// 执行完以上代码之后
app.get('/', function (req, res, next) {
  console.log(2)
  next()
})
app.get('/', function (req, res, next) {
  res.end('hahaha')
})
app.listen(8080, function () {
  console.log('server start at http://127.0.0.1:8080/')
})
