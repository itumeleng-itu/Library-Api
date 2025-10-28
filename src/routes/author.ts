import { Router, Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { getAllAuthors, getAuthorById, addAuthor, editAuthor, deleteAuthor, getBooksByAuthor } from "../controllers/authors";

const router = Router();

//get all authors
router.get("/", getAllAuthors);

router.get("/:id", [param("id").isInt().withMessage("id must be an integer")], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return getAuthorById(req, res, next);
});

//add an author
router.post("/", [body("name").notEmpty().withMessage("name is required")], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return addAuthor(req, res, next);
});

//edit an author
router.put("/:id", [
  param("id").isInt().withMessage("id must be an integer"),
  body("name").notEmpty().withMessage("name is required")
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return editAuthor(req, res, next);
});

router.delete("/:id", [param("id").isInt().withMessage("id must be an integer")], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return deleteAuthor(req, res, next);
});

//get books by author id
router.get("/:id/books", [param("id").isInt().withMessage("id must be an integer")], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return getBooksByAuthor(req, res, next);
});

export default router;


