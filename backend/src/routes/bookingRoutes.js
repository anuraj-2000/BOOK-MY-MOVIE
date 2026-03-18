import express from "express";
//import { createBooking } from "../controllers/bookingController.js";
import { validateBooking } from "../middleware/validationMiddleware.js";
import { createBooking, getBookingsByShow } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", validateBooking, createBooking);
router.get("/:showId", getBookingsByShow);

export default router;