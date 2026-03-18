
import express from "express";
import cors from "cors";

import showRoutes from "./routes/showRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/shows", showRoutes);
app.use("/bookings", bookingRoutes);

app.use(errorHandler);

export default app;