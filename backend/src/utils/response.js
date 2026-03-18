export const successResponse = (res, data) => {
  res.json({
    success: true,
    data,
  });
};

export const errorResponse = (res, message) => {
  res.status(400).json({
    success: false,
    message,
  });
};