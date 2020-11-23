// 默认当前版本是4.17
const express = require('./express') // let Koa = require(Koa)
const port = 8080
const app = express() // const app = new Koa()

app.get('/', function (req, res, next) {
  // koa-router koa-router参考了express 自带的路由来实现的
  res.end('home')
})
app.get('/about', function (req, res) {
  res.end('about')
})

app.listen(port, function () {
  console.log(`server start localhost:${port}/`)
})
