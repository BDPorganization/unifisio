const dbMedicos = require('../models/classMedicos');
const { googleAuth } = require('google-auth-struct');
const md5 = require('md5');

module.exports.loginGoogle = async (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';

    (await googleAuth(token, client_id)).getUserData()
    .then(resultado => { 
        let checaUser = {
            nome: resultado.name,
            email: resultado.email,
        }

        dbMedicos.checaMedico(checaUser)
        .then((resultado) => {
            if (resultado.rowCount > 0) {
                let dadosUser = {
                    pk_medicos: resultado.rows[0].pk_medicos,
                    nome_user: resultado.rows[0].nome
                };

                req.session.user = dadosUser;
                return res.status(200).redirect(req.headers.referer);
            }else {
                dbMedicos.cadastro(checaUser)
                .then((resposta) => {
                    let dadosUser = {
                        pk_medicos: resposta.rows[0].pk_medicos,
                        nome_user: resposta.rows[0].nome
                    };
    
                    req.session.user = dadosUser;
                    return res.status(201).redirect(req.headers.referer);
                })
            }
        })
    })
    .catch((err) => {
        return res.status(500).send(`Erro ao logar com conta Google, ${err}`);
    });
};

module.exports.login = async (req, res) => {
    try{
        let { emailLogin, senhaLogin } = req.body
        let loginUser = {
            email: emailLogin,
            senha: md5(senhaLogin)
        };

        dbMedicos.login(loginUser)
        .then(resultado => {
            if (resultado.rowCount > 0) {
                let dadosUser = {
                    pk_medicos: resultado.rows[0].pk_medicos,
                    nome_user: resultado.rows[0].nome
                };

                req.session.user = dadosUser;
                return res.status(200).json({ autorizado: true });
            }else {
                return res.status(404).json({ autorizado: false });
            }
        })
        .catch((err) => {
            return res.status(500).json({ autorizado: false });
        });
    }catch(err) {
        return res.status(400).json({ autorizado: false });
    }
};

module.exports.cadastro = async (req, res) => {
    try {
        let { emailCadastro, senhaCadastro, especialidade, nomeCompleto } = req.body
        let cadastroUser = {
            especialidade: especialidade,
            nome: nomeCompleto,
            email: emailCadastro,
            senha: md5(senhaCadastro)
        }

        dbMedicos.cadastro(cadastroUser)
        .then(() => {
            return res.status(201).json({ cadastrado: true });
        })
        .catch((err) => {
            return res.status(500).json({ cadastrado: false });
        });
    }catch(err) {
        return res.status(400).json({ cadastrado: false });  
    }
};

module.exports.verificaLogin = async (req, res) => {
    try{
        if (req.session.user) {
            res.status(200).json({
                autenticado: true,
                nome: req.session.user.nome_user
            });
        }else {
            res.status(203).json({
                autenticado: false,
            });
        }
    }catch(err) {
        return res.status(400).send('Ocorreu um erro na verificação do login');
     }
};

module.exports.preencherDados = async (req, res) => {
    try {
        let parsedDate = new Date(req.body.data_nascimento);
        let dadosUser = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            data_nascimento: parsedDate,
            rua: req.body.rua,
            numero: req.body.numero,
            cep: req.body.cep,
            codigo_medico: req.session.user
        }

        dbMedicos.preencher_dados(dadosUser)
        .then(() => {
            return res.status(200).json({
                statusDados: "preenchido",
            });
        })
        .catch((err) => {
            return res.status(500).send(`Ocorreu um erro ao preencher dados do usuário, ${err}`);
        });
    }catch(err) {
        return res.status(400).send('Ocorreu um erro ao completar a ficha do usuário');
    }
};

module.exports.desconectar = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return err;
            }else {
                res.status(308).redirect('/index');
            }
          });
    }catch(err) {
        return res.status(401).send('Ocorreu um erro ao desconectar');
    }
};