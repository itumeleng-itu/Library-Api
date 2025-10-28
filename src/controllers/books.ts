import {Request, Response} from "express"


// array of books
let books=[
    {
      id: 1,
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      year: 1958
    },
    {
      id: 2,
      title: "Cry, the Beloved Country",
      author: "Alan Paton",
      year: 1948
    },
    {
      id: 3,
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      year: 1994
    }
  ]
  
  //function to get all books
  export const getAllBooks =(req:Request, res: Response)=>{
    res.status(200).json(books)
  }

  //function to get all books by id
  export const getBookById = (req:Request, res: Response) =>{
    const {id} = req.params;
    const book = books.find((book) => book.id === parseInt(id as string));

    if(!book){
        return res.status(404).send("Book not found");
    }
    res.status(200).json(book)
  }

  //function to get all books by title
  export const getBookByTitle = (req:Request, res: Response) =>{
    const {title} = req.params;
    const book = books.find((book) => book.title === title);

    if(!book){
        return res.status(404).send("Book not found");
    }
    res.status(200).json(book)
  }


  //function to get all books by year
  export const getBookByYear = (req:Request, res: Response) =>{
    const {year} = req.params;
    const book = books.find((book) => book.year === parseInt(year as string));

    if(!book){
        return res.status(404).send("Book not found");
    }
    res.status(200).json(book)
  }

  //function to get all books by author
  export const getBookByAuthor = (req:Request, res: Response) =>{
    const {author} = req.params;
    const book = books.find((book) => book.author === author);

    if(!book){
        return res.status(404).send("Book not found");
    }
    res.status(200).json(book)
  }


  //function to edit a book
  export const editBook = (req:Request, res: Response) =>{
    const {id} = req.params;
    const book = books.find((book) => book.id === parseInt(id as string));

    if(!book){
        return res.status(404).send("Book not found");
    }
    const{title, author,year} = req.body;

    if(!title || !author || !year){
        return res.status(400).json({ message: "Missing required fields"})
    }
    book.author=author;
    book.title= title;
    book.year = year;
  }

//function add a book
  export const addBook = (req:Request, res:Response)=>{
    const{title, author,year} = req.body;

    if(!title || !author || !year){
        return res.status(400).json({ message: "Missing required fields"})
    }
    const newBook = {id:books.length+1, title,author, year}

    books.push(newBook);
    res.status(201).json({
        message: "Book added successfully",
        newBook});
  }

  export const deleteBook = (req:Request, res: Response) =>{
    const {id} = req.params;
    const book = books.find((book) => book.id === parseInt(id as string));

    if(!book){
        return res.status(404).send("Book not found");
    }
    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
  }

