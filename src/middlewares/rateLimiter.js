import rateLimit from "express-rate-limit";

// apply a rate limiter. In this case it is 100 requests per min per IP address
export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 20, 
    standardHeaders: true, 
    legacyHeaders: false, 
    statusCode: 429, 
    message: {
        error: "Wow! that's a lot of requests. You are allowed to make 20 requests per min. Try again ^_^.",
    },
});