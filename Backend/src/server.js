import express from "express";
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import notesRoutes from "./Routes/notesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware :- it is a function that runs in the middle between the request and the response.
if(process.env.NODE_ENV !== "production") {
app.use(
    cors({
        origin: "http://localhost:5173",
    }));  
}
app.use(express.json());
app.use(rateLimiter);



app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname,"../../Frontend/dist")));

if(process.env.NODE_ENV == "production"){
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../../Frontend","dist","index.html"));
});
}

connectDB().then(()=>{
app.listen(PORT, () =>{
    console.log("Server Started on PORT:", PORT);
});
});

