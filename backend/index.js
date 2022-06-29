const express = require("express")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require("./routes/user")
app.use(userRouter.router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
