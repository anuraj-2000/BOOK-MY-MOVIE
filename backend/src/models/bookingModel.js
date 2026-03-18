import pool from "../config/db.js";

export const createBookingDB = async (client, showId, seats) => {
  return await client.query(
    `INSERT INTO bookings (show_id, seats, status)
     VALUES ($1,$2,'PENDING') RETURNING *`,
    [showId, seats]
  );
};

export const updateBookingStatusDB = async (client, bookingId, status) => {
  return await client.query(
    `UPDATE bookings SET status=$1 WHERE id=$2`,
    [status, bookingId]
  );
};