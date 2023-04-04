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
                return res.status(500).send('Não existem horários disponíveis!');
            }
        })
        .catch((err) => {
            return res.status(500).send(`Erro ao realizar a consulta dos horários disponíveis, ${err}`);
        });
    }catch(err) {
        return res.send('Ocorreu um erro na consulta de horários');
    }
};