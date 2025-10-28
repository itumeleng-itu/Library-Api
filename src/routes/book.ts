import {Router, Request, Response, NextFunction} from "express";
import {body, param , validationResult} from "express-validator"
import { getAllBooks,getBookById, addBook,   deleteBook, editBook, getBookByAuthor, getBookByYear,  getBookByTitle } from "../controllers/books";


const router = Router()


//get all route
router.get("/",getAllBooks);

//get book by id
router.get("/id/:id", [param("id").isInt().withMessage("id must be an integer")],(req: Request, res:Response, next: NextFunction)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    getBookById(req, res, next)
});

//delete a book
router.delete("/id/:id", [param("id").isInt().withMessage("id must be an integer")],(req: Request, res:Response, next: NextFunction)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    deleteBook(req, res, next)
});

//add a book
router.post("/",[
    body("title").notEmpty().withMessage("Title is required"), 
    body("author").notEmpty().withMessage("Author name is required"),
    body("year").isInt().withMessage("Year must be an integer")
], (req: Request, res:Response, next: NextFunction)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    addBook(req,res, next)
})

//edit a book
router.patch( "/id/:id", [param("id").isInt().withMessage("ID must be an integer"),body("title").notEmpty().withMessage("Title is required"),
      body("author").notEmpty().withMessage("Author name is required"),
      body("year").isInt().withMessage("Year must be a number"),
    ],
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      editBook(req, res, next);
    }
  );


  // get book by title
  router.get("/title/:title", (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookByTitle(req, res, next);
  });

  //get book by author
  router.get("/author/:author", (req: Request, res: Response, next: NextFunction) => {
    getBookByAuthor(req, res, next);
  });
  
  //Get book by year
  router.get("/year/:year", [param("year").isInt().withMessage("Year must be an integer")], (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookByYear(req, res, next);
  });

export default router