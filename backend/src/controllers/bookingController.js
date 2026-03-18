
import { bookSeats } from "../services/bookingService.js";
import pool from "../config/db.js"; 

export const createBooking = async (req, res) => {
  const { showId, seats } = req.body;

  try {
    const result = await bookSeats(showId, seats);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingsByShow = async (req, res) => {
  const { showId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE show_id=$1",
      [showId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
