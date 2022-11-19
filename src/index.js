import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import mongoose from "mongoose"
import data from "./data"
import bankRouter from "./routes/bankRouter"
import fileRouter from "./routes/fileRouter"
import notFoundRouter from "./routes/notFoundRouter"

const app = express()
app.use(cors())
app.use(fileUpload({createParentPath: true}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.Promise = global.Promise
mongoose.connect(data.connectServerDb, null, () => console.log("connected to db"))

bankRouter(app)
fileRouter(app, __dirname)
notFoundRouter(app)

app.listen(data.port, () => console.log(`server is Now Running on Port ${data.port}`))