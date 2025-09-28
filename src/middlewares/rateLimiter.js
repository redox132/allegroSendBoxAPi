import rateLimit from "express-rate-limit";

// Apply a rate limiter (example: 10 requests per 5 minutes per IP)
export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 10, // limit each IP to 10 requests per window
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: 429, // HTTP status code for rate limit exceeded (Too Many 
    message: {
        error: "Wow! that's a lot of requests, try again later ^_^.",
    },
});