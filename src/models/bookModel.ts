import mongoose from "mongoose"
import type { IBook } from "../interfaces/bookInterface.js"

const bookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number
    },
    genre: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
}, { versionKey: false })

const Book = mongoose.model<IBook>("Book", bookSchema)

export { Book }