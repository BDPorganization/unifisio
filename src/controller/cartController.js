const dbCart = require('../models/classCart');

module.exports.listCart = async (req, res) => {
    try {
        let dados = {
            pk_medicos: req.session.user.pk_medicos
        }

        dbCart.listCart(dados)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        listCart: true,
                        itens: response.rows
                    });
                } else {
                    return res.status(404).json({
                        listCart: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao listar o carrinho');
    }
};

module.exports.adcItemCart = async (req, res) => {
    try {
        let dados = {
            name_sala: req.body.name_sala,
            preco_sala: req.body.preco_sala,
            pk_medicos: req.session.user.pk_medicos,
            horarios: req.body.horarios,
            nome_medico: req.body.name_user,
            email_medico: req.body.email_user,
            data_agendada: req.body.data_agendada,
            data_agendada_fim: req.body.data_agendada_fim,
            pk_sala: req.body.pk_sala
        }

        dbCart.adcCart(dados)
            .then((response) => {
                if (response == 0) {
                    return res.status(201).json({
                        adcItemCart: true,
                    });
                } else {
                    return res.status(404).json({
                        adcItemCart: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao adicionar o item ao carrinho');
    }
};

module.exports.excludeItemCart = async (req, res) => {
    try {
        let dados = {
            pk_cart: req.body.id
        }

        dbCart.excludeCart(dados)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        excludeItemCart: true,
                    });
                } else {
                    return res.status(404).json({
                        excludeItemCart: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao excluir o item ao carrinho');
    }
};

module.exports.excludeAllCart = async (req, res) => {
    try {
        let dados = {
            pk_medicos: req.session.user.pk_medicos
        }
        
        dbCart.excludeAllCart(dados)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        excludeAllCart: true,
                    });
                } else {
                    return res.status(404).json({
                        excludeAllCart: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao excluir o carrinho');
    }
};