import { Book } from "../models/bookModel.js"
import { HTTP_MESSAGE } from "../constant/bookConstant.js"
import type { Request, Response } from "express"

const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find()

        res.json(books)

    } catch (error) {
        res.status(500).json({
            message: HTTP_MESSAGE.SERVER_ERROR
        })
    }
}

const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)

        if (!book) {
            return res.status(404).json({message: HTTP_MESSAGE.BOOK_NOT_FOUND})
        }

        res.json(book)

    } catch (error) {
        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const postBooks = async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body)

        res.status(201).json({message: HTTP_MESSAGE.BOOK_CREATED, book})

    } catch (error) {
        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const patchBooks = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const book = await Book.findByIdAndUpdate(id, req.body, {new: true})

        if (!book) {
           return res.status(404).json({message: HTTP_MESSAGE.BOOK_NOT_FOUND})
        }

        res.json({message: HTTP_MESSAGE.BOOK_UPDATED, book})
        
    } catch (error) {
        res.status(500).json({message: HTTP_MESSAGE.SERVER_ERROR})
    }
}

const deleteBooks = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
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