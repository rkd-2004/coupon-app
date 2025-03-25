// server/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const { RateLimiterPostgres } = require('rate-limiter-flexible');

// IP-based limiting
const ipLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1,
  message: 'You can only claim one coupon per day per IP'
});

// Cookie-based limiting
const cookieLimiter = (req, res, next) => {
  if (req.cookies.coupon_claimed) {
    return res.status(429).json({ error: 'You already claimed a coupon in this session' });
  }
  next();
};

module.exports = { ipLimiter, cookieLimiter };