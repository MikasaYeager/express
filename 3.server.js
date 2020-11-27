const express = require('./express')
const { pathToRegexp } = require('path-to-regexp') // 第三方
const app = express()

// /user/1/2 => {id:1,name:2}
app.get('/user/:id/:name/a', function (req, res) {
  res.end(JSON.stringify(req.params))
})
// let key = []
// console.log('pathToRegExp', pathToRegexp)
// let reg = pathToRegexp('/user/a', key)
// console.log(reg, key)
// let str = '/user/:id/:name/a'.replace(/:([^/]+)/g,function () {
//     return '([^/]+)'
// })
// console.log(str); // /user/([^/]+)/([^/]+)/a
// console.log('/user/1/2/a'.match(new RegExp(str)))

app.listen(8080)
