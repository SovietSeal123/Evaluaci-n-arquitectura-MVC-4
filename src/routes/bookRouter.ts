import { Router } from "express"
import { getBooks, getBookById, postBooks, patchBooks, deleteBooks } from "../controllers/bookController.js"

const bookRouter = Router()

bookRouter.get("/", getBooks)
bookRouter.get("/:id", getBookById)
bookRouter.post("/", postBooks)
bookRouter.patch("/:id", patchBooks)
bookRouter.delete("/:id", deleteBooks)

export { bookRouter }