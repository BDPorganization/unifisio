const dbAgenda = require('../models/classAgendamento.js');

module.exports.selectHours = async (req, res) => {
    try{
        const { dateNew, sala } = req.body; 
        let data = {
            dia: dateNew,
            pk_salas: sala
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
            return res.status(400).send(`Erro ao realizar a consulta dos horários disponíveis, ${err}`);
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
            return res.status(400).send(`Ocorreu um erro ao averiguar os dados do usuário, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na consulta dos dados do usuário');   
    }
};

module.exports.agendaDados = async (req, res) => {
    try {
        let agendaDado = {
            data: req.body.dataAtual,
            horarios: req.body.horarioAtual,
            pk_salas: req.body.pk_sala,
            pk_medicos: req.session.user.pk_medicos
        }
        let idTemplate = process.env.ID_TEMPLATE;
        let token = process.env.TOKEN_EMAIL;

        dbAgenda.agendaDados(agendaDado)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(201).json({
                    agendado: true,
                    hora: req.body.horarioAtual,
                    dia: req.body.dataAtual,
                    idTemplate: idTemplate,
                    token: token
                });
            } else {
                return res.status(406).json({
                    agendado: false
                });
            }
        })
        .catch((err) => {
            return res.status(400).send(`Ocorreu um erro ao agendar a sala, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro no agendamento da sala');   
    }
};

module.exports.agendamentos = async (req, res) => {
    try {
        let agenda = {
            pk_medicos: req.session.user.pk_medicos
        }

        dbAgenda.agendamentos(agenda)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(200).json({
                    agendamento: true,
                    dados: resultado.rows
                });
            } else {
                return res.status(404).json({
                    agendamento: false
                });
            }
        })
        .catch((err) => {
            return res.status(400).send(`Ocorreu um erro ao trazer agendamentos, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro ao ver agendamentos já realizados');
    }
};

module.exports.horariosAgenda = async (req, res) => {
    try {
        dbAgenda.horariosAgendados()
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(200).json({
                    horariosAgendados: true,
                    dados: resultado.rows
                });
            } else {
                return res.status(404).json({
                    horariosAgendados: false
                });
            }
        })
        .catch((err) => {
            return res.status(400).send(`Ocorreu um erro ao trazer agendamentos, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro ao ver agendamentos já realizados');
    }
};

module.exports.excluirAgendamento = async (req, res) => {
    try {
        let pk_agenda = {
            pk_agendamento: req.body.pk_agendamento
        }

        dbAgenda.excluirAgendamento(pk_agenda)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(200).json({
                    excluirAgendamento: true,
                });
            } else {
                return res.status(404).json({
                    excluirAgendamento: false
                });
            }
        })
        .catch((err) => {
            return res.status(400).send(`Ocorreu um erro ao trazer agendamentos, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro ao ver agendamentos já realizados');
    }
};

module.exports.checaSalasAgendadas = async (req, res) => {
    try {
        let dados = {
            data: req.body.data,
            horarios: req.body.horarios,
            pk_salas: req.body.pk_sala
        }

        dbAgenda.checaSalas(dados)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(401).json({
                    checaSalasAgendadas: true,
                    listChecaSalas: resultado.rows,
                });
            } else {
                return res.status(200).json({
                    checaSalasAgendadas: false
                });
            }
        })
        .catch((err) => {
            return res.status(400).send(`Ocorreu um erro ao trazer agendamentos, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro ao checar o agendamento');
    }
};