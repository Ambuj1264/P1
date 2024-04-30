const successResponse = (res, success, message, data) => {
  return res.status(200).send({
    success: success,
    message: message,
    data: data,
  });
};

const errorResponse = (res, success, message, data) => {
  return res.status(400).send({
    success: success,
    message: message,
    data: data,
  });
};

const randomData = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

module.exports = {
  successResponse,
  errorResponse,
  randomData,
};
