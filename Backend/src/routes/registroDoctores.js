import express from "express"; 
import registroDoctoresController from "../controllers/registroDoctoresController.js";

const router = express.Router();

router.route("/")
.post(registroDoctoresController.register);

export default router;