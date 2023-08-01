const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: './logs/atividades.log' })
    ]
});

function registrarAtividade(req, res, next) {
    const { method, url } = req;
    const { emailLogin } = req.body;

    logger.info(`[${new Date().toISOString()}] - method: ${method} ${url} - email: ${emailLogin}`);
    next();
}

function registrarAtividadeGoogle(req, res, next) {
    const { method, url } = req;
    const token = req.body.credential;

    logger.info(`[${new Date().toISOString()}] - method: ${method} ${url} - token: ${token}`);
    next();
}

function registrarAtividadeCadastro(req, res, next) {
    const { method, url } = req;
    const { emailCadastro } = req.body;

    logger.info(`[${new Date().toISOString()}] - method: ${method} ${url} - email: ${emailCadastro}`);
    next();
}

module.exports = { registrarAtividade, registrarAtividadeGoogle, registrarAtividadeCadastro }
