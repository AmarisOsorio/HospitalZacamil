import express from "express";
import cookieParser from "cookie-parser";
import doctoresRoute from "./src/routes/doctores.js"
import registroDoctoresRoute from "./src/controllers/registroDoctoresController.js";


const app = express();

app.use(express.json())
app.use(cookieParser())

/******************** R U T A S ******************************/

app.use("/api/doctores",doctoresRoute)
export default app;