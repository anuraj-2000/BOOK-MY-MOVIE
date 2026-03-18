// import express from "express";

// import { validateBooking } from "../middleware/validationMiddleware.js";
// import { createBooking, getBookingsByShow } from "../controllers/bookingController.js";

// const router = express.Router();

// router.post("/", validateBooking, createBooking);
// router.get("/:showId", getBookingsByShow);

// export default router;

import express from "express";

import { validateBooking } from "../middleware/validationMiddleware.js";
import { createBooking, getBookingsByShow } from "../controllers/bookingController.js";

const router = express.Router();


router.get("/", async (req, res) => {
  res.send("Bookings route working");
});


router.post("/", validateBooking, createBooking);


router.get("/:showId", getBookingsByShow);

export default router;