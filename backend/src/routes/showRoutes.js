import express from "express";
import { createShow, getShows } from "../controllers/showController.js";
import { validateShow } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", validateShow, createShow);
router.get("/", getShows);

export default router;