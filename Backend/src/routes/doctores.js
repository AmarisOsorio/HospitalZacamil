import express from "express";
import doctoresController from "../controllers/doctoresController.js";

const router = express.Router();

router.route("/")
.get(doctoresController.getDoctores)
.post(doctoresController.insertDoctores);

router.route("/:id")
.put(doctoresController.updateDoctores)
.delete(doctoresController.deleteDoctores);

export default router;