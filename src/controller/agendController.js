const dbAgenda = require('../models/classAgendamento.js');

module.exports.selectHours = async (req, res) => {
    try{
        const { dateNew } = req.body; 
        let data = {
            dia: dateNew
        }

        dbAgenda.returnHours(data)
        .then(resultado => {
            if (resultado.rowCount > 0) {
                res.status(200).json({
                    datas: resultado.rows
                });
            } else {
                return res.status(204).json({ 
                    horas: false 
                });
            }
        })
        .catch((err) => {
            return res.status(500).send(`Erro ao realizar a consulta dos horários disponíveis, ${err}`);
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na consulta de horários');
    }
};

module.exports.checaDados = async (req, res) => {
    try {
        let checaDado = {
            pk_medicos: req.session.user.pk_medicos
        }

        dbAgenda.checaDados(checaDado)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(200).json({
                    dados: true
                });
            } else {
                return res.status(204).json({
                    dados: false
                });
            }
        })
        .catch((err) => {
            return res.status(500).send(`Ocorreu um erro ao averiguar os dados do usuário, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na consulta dos dados do usuário');   
    }
};

module.exports.agendaDados = async (req, res, next) => {
    try {
        let agendaDado = {
            datas: req.body.datas,
            hora: req.body.hora,
            pk_salas: req.body.pk_salas,
            pk_medicos: req.session.user.pk_medicos
        }

        dbAgenda.agendaDados(agendaDado)
        .then((resultado) => {
            if(resultado) {
                next();
            } else {
                return res.status(204).json({
                    agendado: false
                });
            }
        })
        .catch((err) => {
            return res.status(500).send(`Ocorreu um erro ao agendar a sala, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro no agendamento da sala');   
    }
};