
export function errorHandler(err, req, res, next) {
    console.error("Error:", err.message);

    if (err.response) {
        return res.status(err.response.status || 500).json({
            error: err.response.data || err.message,
        });
    }

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
}
