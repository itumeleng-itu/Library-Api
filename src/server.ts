import express , {Express}  from "express"
import { loggerMiddleware } from "./middleware/logger"
import { notFound as notFoundMiddleware, errorMiddleware } from "./middleware/error"
import router from "./routes/book"
import authorRouter from "./routes/author"

const app:Express = express()
const PORT = process.env.PORT || 3000

app.use(loggerMiddleware);
app.use(express.json());
app.use("/v1/books", router)
app.use("/v1/authors", authorRouter)

// 404 handler
app.use(notFoundMiddleware);

// error handler
app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})