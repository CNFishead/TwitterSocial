/**
 * @Desc : This function is made to handle all mongoose errors.
 *         In our try/catch blocks instead of using custom messages,
 *         We just pass this into the catch block and it will define the errors
 *         for us.
 */

module.exports = errorHandler = (error, req, res, next) => {
  let err = { ...error }
  err.message = error.message

  // Mongoose Bad Object ID
  if (err.name === 'CastError') {
    const message = `No Resource Found with id: ${error.value}`
    return res.status(404).json({ message })
  }
  if (err.kind === 'ObjectId') {
    const message = `No Resource Found with id: ${error.value}`
    return res.status(404).json({ message })
  }
  // Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered Object already exists in database`
    return res.status(400).json({ message })
  }
  // Mongoose Validation error
  if (err.message.includes('validation failed')) {
    const message = Object.values(err.errors).map((value) => value.message)
    return res.status(400).json({ message })
  }
  return res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || 'Server Error' })
}

