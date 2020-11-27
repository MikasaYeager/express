const express = require('./express')
const app = express()

// vue 路由next（）方法可以传递参数
app.use(function (req, res, next) {
  console.log('1')
  next('111') // 只要传递参数了 就表示执行出错
  console.log('2')
})
app.use(function (req, res, next) {
  // 如果不写路径默认就是/
  console.log('3')
  setTimeout(() => {
    next()
  }, 1000)
  console.log('4')
})
app.use((err, req, res, next) => {
  next(err + '111')
})
app.use((err, req, res, next) => {
  res.end(err + '111')
})
app.use(function (req, res, next) {
  // 如果不写路径默认就是/
  console.log('5')
  next()
  console.log('6')
})
app.get('/', function (req, res, next) {
  next('ok')
})

//1. 参数路由 :id  2.二级路由

app.listen(3000)
