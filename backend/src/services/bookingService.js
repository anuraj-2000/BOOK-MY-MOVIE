import pool from "../config/db.js";

export const bookSeats = async (showId, seats) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const showRes = await client.query(
      "SELECT * FROM shows WHERE id=$1 FOR UPDATE",
      [showId]
    );

    const show = showRes.rows[0];

    if (!show || show.available_seats < seats) {
      await client.query("ROLLBACK");
      return { status: "FAILED" };
    }

    const bookingRes = await client.query(
      `INSERT INTO bookings (show_id, seats, status)
       VALUES ($1,$2,'PENDING') RETURNING *`,
      [showId, seats]
    );

    await client.query(
      `UPDATE shows
       SET available_seats = available_seats - $1
       WHERE id=$2`,
      [seats, showId]
    );

    await client.query(
      `UPDATE bookings SET status='CONFIRMED' WHERE id=$1`,
      [bookingRes.rows[0].id]
    );

    await client.query("COMMIT");

    return {
      status: "CONFIRMED",
      booking: bookingRes.rows[0],
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};