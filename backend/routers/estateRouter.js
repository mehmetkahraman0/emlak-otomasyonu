import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import { createEstate, deleteEstate, getAllEstate, updateEstate } from "../controllers/estateController.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createEstate);
router.get("/all-estate", getAllEstate);
router.put("/estate-update/:id", authenticate, authorizeAdmin, updateEstate);
router.delete("/estate-delete/:id", authenticate, authorizeAdmin, deleteEstate);
export default router;