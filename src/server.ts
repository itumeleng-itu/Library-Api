import express , {Express}  from "express"
import { loggerMiddeware } from "./middleware/logger"
import router from "./routes/book"
import bodyParser from "body-parser"

const app:Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(bodyParser.json())
app.use("/v1/books", router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})