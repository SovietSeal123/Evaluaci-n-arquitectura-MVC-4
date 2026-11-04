import { Book } from "../models/bookModel.js"
import { HTTP_MESSAGE } from "../constant/bookConstant.js"
import type { Request, Response } from "express"
import { validateBookData } from "../utils/validateBookData.js"
import mongoose from "mongoose"

const getBooks = async (req: Request, res: Response) => {
    try {
        const { title, author, genre, publishedYear } = req.query
        const filters: Record<string, unknown> = {}

        if (typeof title === "string") {
            filters.title = new RegExp(title, "i")
        }

        if (typeof author === "string") {
            filters.author = new RegExp(author, "i")
        }

        if (typeof genre === "string") {
            filters.genre = genre
        }

        if (typeof publishedYear === "string") {
            const year = Number(publishedYear)
            
            if (Number.isFinite(year)) {
                filters.publishedYear = year
            }
        }

        const books = await Book.find(filters)

        res.json({message: HTTP_MESSAGE.BOOKS_FOUND, books})

    } catch (error) {
        res.status(500).json({
            message: HTTP_MESSAGE.SERVER_ERROR
        })
    }
}

const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({message: HTTP_MESSAGE.INVALID_ID})
        }

        const book = await Book.findById(id)

        if (!book) {
            return res.status(404).json({message: HTTP_MESSAGE.BOOK_NOT_FOUND})
        }

        res.json({message: HTTP_MESSAGE.BOOK_FOUND, book})


    } catch (error) {
        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const postBooks = async (req: Request, res: Response) => {
    try {
        const validationError = validateBookData(req.body)

        if (validationError) {
            return res.status(400).json({message: validationError})
        }

        const book = await Book.create(req.body)

        res.status(201).json({message: HTTP_MESSAGE.BOOK_CREATED, book})

    } catch (error) {
        if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
            return res.status(409).json({message: HTTP_MESSAGE.BOOK_ALREADY_EXISTS})
    }

    res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const patchBooks = async (req: Request, res: Response) => {
    try {
        const validationError = validateBookData(req.body, true)

        if (validationError) {
            return res.status(400).json({message: validationError})
        }

        const { id } = req.params
        
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({message: HTTP_MESSAGE.INVALID_ID})
        }
        
        const book = await Book.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})


        if (!book) {
           return res.status(404).json({message: HTTP_MESSAGE.BOOK_NOT_FOUND})
        }

        res.json({message: HTTP_MESSAGE.BOOK_UPDATED, book})
        
    } catch (error) {

        if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
            return res.status(409).json({message: HTTP_MESSAGE.BOOK_ALREADY_EXISTS})
    }

        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const deleteBooks = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({message: HTTP_MESSAGE.INVALID_ID})
        }
        
        const book = await Book.findByIdAndDelete(id)


        if (!book) {
            return res.status(404).json({message: HTTP_MESSAGE.BOOK_NOT_FOUND})
        }

        res.json({message: HTTP_MESSAGE.BOOK_DELETED, book})

    } catch (error) {
        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

export { getBooks, getBookById, postBooks, patchBooks, deleteBooks }