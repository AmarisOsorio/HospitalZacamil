import express from "express";
import cookieParser from "cookie-parser";
import doctoresRoute from "./src/routes/doctores.js"
import registroDoctoresRoute from "./src/routes/registroDoctores.js";
import recuperacionContraRoute from "./src/routes/recuperacionContra.js"


const app = express();

app.use(express.json())
app.use(cookieParser())

/******************** R U T A S ******************************/

app.use("/api/doctores", doctoresRoute)
app.use("/api/registroDoctores", registroDoctoresRoute)
app.use("/api/recuperacionContra" , recuperacionContraRoute)

export default app;


/**************** Modelo de Archivos JSON *******************/

/**
{
  "nombre": "Dra. Ana López",
  "especialidad": "Pediatría",
  "correo": "20200003@ricaldone.edu.sv",
  "contra": "securePassword123"
}
  
 */