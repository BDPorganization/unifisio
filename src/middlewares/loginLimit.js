const rateLimit = require('express-rate-limit');
const maxLoginAttempts = 5;
const lockoutTime = 15 * 60 * 1000;
let blockedIPs = {};

const loginRateLimit = rateLimit({
    windowMs: lockoutTime,
    max: maxLoginAttempts,
    message: { error: 'Muitas tentativas de login. Tente novamente após 15 minutos.' },
    onLimitReached: (req, res, options) => {
        const clientIP = req.ip;

        blockedIPs[clientIP] = Date.now() + lockoutTime;
    }
});

module.exports = { loginRateLimit }