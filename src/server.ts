import express , {Express}  from "express"
import { loggerMiddleware } from "./middleware/logger"
import router from "./routes/book"

const app:Express = express()
const PORT = process.env.PORT || 3000

app.use(loggerMiddleware);
app.use(express.json());
app.use("/v1/books", router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})