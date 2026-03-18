import { createShowDB, getAllShowsDB } from "../models/showModel.js";

export const createShow = async (req, res, next) => {
  try {
    const { name, start_time, total_seats } = req.body;

    const result = await createShowDB(name, start_time, total_seats);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(err);
  }
};

export const getShows = async (req, res, next) => {
  try {
    const result = await getAllShowsDB();
    res.json(result.rows);
  } catch (error) {
    next(err);
  }
};