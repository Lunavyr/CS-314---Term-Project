const notFound = (req, res, next) => {
    const error = new Error(`Error: ${req.originalUrl} not found.`)
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

module.exports = {notFound, errorHandler}