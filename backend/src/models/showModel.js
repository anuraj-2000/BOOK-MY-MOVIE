import pool from "../config/db.js";

export const createShowDB = async (name, start_time, total_seats) => {
  return await pool.query(
    `INSERT INTO shows (name, start_time, total_seats, available_seats)
     VALUES ($1,$2,$3,$3) RETURNING *`,
    [name, start_time, total_seats]
  );
};

export const getAllShowsDB = async () => {
  return await pool.query(`SELECT * FROM shows`);
};