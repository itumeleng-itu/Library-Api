# Library API

TypeScript + Express in-memory Library API.

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

Base path used in this project: `/v1`

## Data Models

- Author
```json
{
  "id": 1,
  "name": "Alan Paton"
}
```

- Book
```json
{
  "id": 1,
  "title": "Cry, the Beloved Country",
  "author": "Alan Paton",
  "year": 1948
}
```

## Endpoints

### Authors
(Implemented at `/v1/authors`.)

- GET `/v1/authors` — list all authors
  - 200: `Author[]`

- GET `/v1/authors/:id` — get author by id
  - 200: `Author`
  - 404: not found

- POST `/v1/authors` — create author
  - Body:
    ```json
    { "name": "New Author" }
    ```
  - 201: `{ message, author }`
  - 400: missing fields
  - 409: duplicate name

- PUT `/v1/authors/:id` — update author
  - Body:
    ```json
    { "name": "Updated Author" }
    ```
  - 200: `{ message, author }`
  - 400 | 404 | 409

- DELETE `/v1/authors/:id` — delete author
  - 200: `{ message }`
  - 404

- GET `/v1/authors/:id/books` — list books by author
  - 200: `Book[]`
  - 404: author not found

### Books
(Currently implemented at `/v1/books`.)

- GET `/v1/books/` — list all books
  - 200: `Book[]`

- GET `/v1/books/id/:id` — get by id
  - 200: `Book`
  - 400: validation
  - 404: not found

- GET `/v1/books/title/:title` — get by title (exact)
  - 200 | 404

- GET `/v1/books/author/:author` — get by author (exact)
  - 200 | 404

- GET `/v1/books/year/:year` — get by year
  - 200 | 400 | 404

- POST `/v1/books/` — create
  - Body:
    ```json
    { "title": "New Title", "author": "Name", "year": 2020 }
    ```
  - 201: `{ message, newBook }`
  - 400: missing fields
  - 409: duplicate title+author

- PATCH `/v1/books/id/:id` — update (validators require all fields)
  - Body:
    ```json
    { "title": "Updated", "author": "Name", "year": 2021 }
    ```
  - 200: `{ message, book }`
  - 400 | 404

- DELETE `/v1/books/id/:id` — delete by id
  - 200: `{ message }`
  - 404

## Validation
Uses `express-validator`. 400 responses from validation include `{ errors: [...] }`.

## Error Format
- Known controller errors (e.g., 400/404/409) use centralized handler and return:
```json
{ "message": "Readable error message", "details": ["optional", "details"] }
```
- Unhandled errors return 500 via middleware:
```json
{ "message": "Internal server error" }
```

## Notes
- In-memory storage; data resets on restart.
- Authors and books relationship is matched by name in this version. To fully align with the assessment, you can add `authorId` to books and validate it references an existing author on create/update.
