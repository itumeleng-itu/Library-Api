import {Router, Request, Response} from "express";
import {body, param , validationResult} from "express-validator"
import { getAllBooks,getBookById, addBook,   deleteBook, editBook, getBookByAuthor, getBookByYear,  } from "../controllers/books";


const router = Router()


//get all route
router.get("/",getAllBooks);


router.get("/:id", [param("id").isInt().withMessage("id must be an integer")],(req: Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    getBookById(req, res)
});

router.post("/",[body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("valid email is required")], (req: Request, res:Response)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    addBook(req,res)
})



export default router