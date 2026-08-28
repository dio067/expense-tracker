import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
const apiLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 100 });

export { authLimiter, apiLimiter };
