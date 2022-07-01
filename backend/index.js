const express = require("express")
const cors = require('cors')
const { logger } = require('./middlewares')

const app = express()
const port = 3000
app.use(logger)
app.use(cors())

app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routes/user')
const reportRouter = require('./routes/report')
const test_executeRouter = require('./routes/test_execute')

app.use(userRouter)
app.use(reportRouter)
app.use(test_executeRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
