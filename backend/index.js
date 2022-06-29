const express = require("express")
const app = express()
const port = 3000

// app.use(express.static("static"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const userRouter = require("./routes/user")
app.use(userRouter.router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
