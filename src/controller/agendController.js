const dbAgenda = require('../models/classAgendamento.js');

module.exports.selectHours = async (req, res) => {
    try{
        const { dateNew, sala } = req.body; 
        let data = {
            dia: dateNew,
            pk_sala: sala
        }
        console.log(data);

        dbAgenda.returnHours(data)
        .then(resultado => {
            if (resultado) {
                console.log(resultado);
                return res.status(200).render('coworking');
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