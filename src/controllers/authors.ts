import { Request, Response, NextFunction } from "express";
import { books } from "./books";

type Author = { id: number; name: string };

// array of authors
const authors: Author[] = [
  { id: 1, name: "Chinua Achebe" },
  { id: 2, name: "Alan Paton" },
  { id: 3, name: "Nelson Mandela" }
];

//function to get all authors
export const getAllAuthors = (_req: Request, res: Response) => {
  return res.status(200).json(authors);
};

//function to get author by id
export const getAuthorById = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const author = authors.find(a => a.id === id);
  if (!author) return next({ status: 404, message: "Author not found" });
  return res.status(200).json(author);
};

//function to add an author
export const addAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as Partial<Author>;
  if (!name) return next({ status: 400, message: "Missing required field: name" });
  const exists = authors.some(a => a.name === name);
  if (exists) return next({ status: 409, message: "Author already exists" });
  const newAuthor: Author = { id: authors.length + 1, name };
  authors.push(newAuthor);
  return res.status(201).json({ message: "Author created successfully", author: newAuthor });
};

//function to edit an author
export const editAuthor = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const { name } = req.body as Partial<Author>;
  const author = authors.find(a => a.id === id);
  if (!author) return next({ status: 404, message: "Author not found" });
  if (!name) return next({ status: 400, message: "Missing required field: name" });
  const duplicate = authors.some(a => a.name === name && a.id !== id);
  if (duplicate) return next({ status: 409, message: "Another author with this name exists" });
  author.name = name;
  return res.status(200).json({ message: "Author updated successfully", author });
};

//function to delete an author
export const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const idx = authors.findIndex(a => a.id === id);
  if (idx === -1) return next({ status: 404, message: "Author not found" });
  authors.splice(idx, 1);
  return res.status(200).json({ message: "Author deleted successfully" });
};

//function to get books by author id
export const getBooksByAuthor = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const author = authors.find(a => a.id === id);
  if (!author) return next({ status: 404, message: "Author not found" });
  const authoredBooks = books.filter(b => b.author === author.name);
  return res.status(200).json(authoredBooks);
};

export { authors };


