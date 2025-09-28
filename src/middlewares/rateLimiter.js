import rateLimit from "express-rate-limit";

// apply a rate limiter. In this case it is 100 requests per min per IP address
export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 10, 
    standardHeaders: true, 
    legacyHeaders: false, 
    statusCode: 429, 
    message: {
        error: "Wow! that's a lot of requests, try again in 1 min ^_^.",
    },
});