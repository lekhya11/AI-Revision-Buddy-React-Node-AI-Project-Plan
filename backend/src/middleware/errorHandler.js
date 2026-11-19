const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` })
}

const centralErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message

    if (err.name == "CastError") {
        statusCode = 400
        message = "Invalid id"
    }
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");
    }

    res.status(statusCode).json({ message: err.message })
}

module.exports = {notFound, centralErrorHandler}