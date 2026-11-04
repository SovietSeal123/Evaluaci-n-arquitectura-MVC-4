import express from "express"
import cors from "cors"
import { connectMongoDB } from "./config/connectMongoDB.js"
import { bookRouter } from "./routes/bookRouter.js"

process.loadEnvFile()

const PORT = process.env.PORT
const URI_DB = process.env.URI_DB

const server = express()

server.use(express.json())
server.use(cors())

server.use("/books", bookRouter)

const startServer = async () => {
    await connectMongoDB(URI_DB as string)

    server.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

startServer()