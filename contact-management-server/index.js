import  express from "express";
import dotenv from "dotenv"


import contactsRoutes from "./routes/contactsRoute.js";
import usersRoutes from "./routes/usersRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config/db-connection.js";

const app = express();
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT;

app.use('/api/contacts', contactsRoutes)
app.use('/api/users', usersRoutes)
app.use(errorHandler)

connectDB()

app.listen(PORT,()=>{
    console.log("Listening on",PORT)
})