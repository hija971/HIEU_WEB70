const resClientData = () => {
  res.status(status).send({
    data: data ? data : null,
    success: !!data,
    message: message ? message : data ? "Success" : "Fail",
  });
};

export { resClientData };
