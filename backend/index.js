import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connetcDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors"
import estateRouter from "./routers/estateRouter.js";


dotenv.config()
connetcDB();
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // İzin vermek istediğiniz domain
    methods: ['GET', 'POST', "PUT", "DELETE"], // İzin vermek istediğiniz HTTP metodları
    allowedHeaders: ['Content-Type', 'Authorization'],// İzin vermek istediğiniz headerlar
    credentials: true
}));

app.use("/user", userRouter);
app.use("/estate", estateRouter)

app.listen(3000, () => {
    console.log("app listening ...");
});