import mongoose from "mongoose"
import { HTTP_MESSAGE } from "../constant/bookConstant.js"

const connectMongoDB = async (uri: string) => {
    try {
        await mongoose.connect(uri)
        console.log(HTTP_MESSAGE.MONGODB_CONNECTED)
    } catch (error) {
        console.log(HTTP_MESSAGE.MONGODB_ERROR)
        console.log(error)
    }
}

export { connectMongoDB }