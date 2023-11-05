require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models/models")

const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routers/index")

const errorMiddleware = require("./middleWare/ErrorMiddleWare")
const path = require("path")

const PORT = process.env.PORT || 7000

const webserver =express()

webserver.use(cors())
webserver.use(express.json())
webserver.use(express.static(path.resolve(__dirname, "static", )))
webserver.use(fileUpload({}))
webserver.use("/api", router)
webserver.use(errorMiddleware) // замыкающий



const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        webserver.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
