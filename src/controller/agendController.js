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
            }else {
                return res.status(204).json({ 
                    horas: false 
                });
            }
        })
        .catch((err) => {
            return res.status(404).send(`Erro ao realizar a consulta dos horários disponíveis, ${err}`);
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na consulta de horários');
    }
};

module.exports.checaDados = async (req, res) => {
    try {
        let checaDado = {
            pk_medicos: req.session.user
        }

        dbAgenda.checaDados(checaDado)
        .then((resultado) => {
            if(resultado.rowCount > 0) {
                return res.status(200).json({
                    dados: false
                });
            }else {
                return res.status(200).json({
                    dados: true
                });
            }
        })
        .catch((err) => {
            return res.status(204).send(`Ocorreu um erro ao averiguar os dados do usuário, ${err}`)
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na consulta dos dados do usuário');   
    }
};
