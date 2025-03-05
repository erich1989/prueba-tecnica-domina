exports.success = function (req, res, message, status) {
  res.status(status || 200).send({
    status: status,
    error: '',
    response: message
  })
}

exports.error = function (req, res, message, status, details) {
  console.error(details)
  res.status(status || 500).send({
    error: message,
    message: details,
    status: status
  })
}
