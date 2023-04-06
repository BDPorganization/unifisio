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