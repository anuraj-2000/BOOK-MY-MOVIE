export const validateShow = (req, res, next) => {
  const { name, start_time, total_seats } = req.body;

  if (!name || !start_time || !total_seats) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (total_seats <= 0) {
    return res.status(400).json({
      message: "Seats must be greater than 0",
    });
  }

  next();
};

export const validateBooking = (req, res, next) => {
  const { showId, seats } = req.body;

  if (!showId || !seats) {
    return res.status(400).json({
      message: "showId and seats required",
    });
  }

  if (seats <= 0) {
    return res.status(400).json({
      message: "Invalid seat count",
    });
  }

  next();
};