const express = require('./lib/express')
const Router = require('./lib/router')
express.Router = Router
module.exports = express
