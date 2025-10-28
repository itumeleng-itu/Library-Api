import {Router, Request, Response} from "express";
import {body, param , validationResult} from "express-validator"
import { getAllBooks,getBookById, addBook,   deleteBook, editBook, getBookByAuthor, getBookByYear,  getBookByTitle } from "../controllers/books";


const router = Router()


//get all route
router.get("/",getAllBooks);

//get book by id
router.get("/:id", [param("id").isInt().withMessage("id must be an integer")],(req: Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    getBookById(req, res)
});

//delete a book
router.delete("/:id", [param("id").isInt().withMessage("id must be an integer")],(req: Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    deleteBook(req, res)
});

//add a book
router.post("/",[
    body("title").notEmpty().withMessage("Title is required"), 
    body("author").notEmpty().withMessage("Author name is required"),
    body("year").isInt().withMessage("Year must be an integer")
], (req: Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    addBook(req,res)
})

//edit a book
router.patch( "/:id", [param("id").isInt().withMessage("ID must be an integer"),body("title").notEmpty().withMessage("Title is required"),
      body("author").notEmpty().withMessage("Author name is required"),
      body("year").isInt().withMessage("Year must be a number"),
    ],
    (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      editBook(req, res);
    }
  );


  // get book by title
  router.get("/:title", (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookByTitle(req, res);
  });

  //get book by author
  router.get("/:author", (req: Request, res: Response) => {
    getBookByAuthor(req, res);
  });
  
  //Get book by year
  router.get("/:year", [param("year").isInt().withMessage("Year must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getBookByYear(req, res);
  });

export default router