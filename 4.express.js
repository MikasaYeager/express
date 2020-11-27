const express = require('./express')
const app = express()
const article = require('./routes/article')
const user = require('./routes/user')

app.use('/article', article)
app.use('/user', user)

app.listen(8080)
