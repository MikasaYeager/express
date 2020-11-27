const express = require('../express')
let router = express.Router() // 既充当了类 又充当了函数

router.get('/add', function (req, res, next) {
  res.end('user add')
})

router.get('/remove', function (req, res, next) {
  res.end('user remove')
})

module.exports = router
