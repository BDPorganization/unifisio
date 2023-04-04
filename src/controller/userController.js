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
                req.session.user = resultado.rows[0].pk_medicos;
                return res.status(200).render('coworking');
            }else {
                dbMedicos.cadastro(checaUser)
                .then((resposta) => {
                    req.session.user = resposta.rows[0].pk_medicos;
                    return res.status(201).render('coworking');
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
        let loginUser = {
            email: req.body.email,
            senha: md5(req.body.senha)
        }

        dbMedicos.login(loginUser)
        .then(resultado => {
            if (resultado.rowCount > 0) {
                req.session.user = resultado.rows[0].pk_medicos;
                return res.status(200).render('coworking');
            }else {
                return res.status(500).send('Usuário ou senha inválidos!');
            }
        })
        .catch((err) => {
            return res.status(500).send(`Erro ao realizar login, ${err}`);
        });
    }catch(err) {
        return res.send('Ocorreu um erro na autenticação');
    }
};

module.exports.cadastro = async (req, res) => {
    try {
        let cadastroUser = {
            especialidade: req.body.especialidade,
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha)
        }

        if (req.body.senha == req.body.confSenha) {
            dbMedicos.cadastro(cadastroUser)
            .then(() => {
                return res.status(200).render('index');
            })
            .catch((err) => {
                return res.status(500).send(`Ocorreu um erro ao cadastrar o usuário, ${err}`);
            });
        }else {
            return res.status(401).send('As senhas não coincidem!');
        }
    }catch(err) {
        return err;   
    }
};

module.exports.verificaLogin = async (req, res) => {
    try{
        let logado = req.session.user > 0 ? true : false;
        let checaPkUser = {
            pk_medicos: req.session.user
        }

        dbMedicos.checaPkMedico(checaPkUser)
        .then((resultado) => {
            res.status(200).json({
                autenticado: logado,
                nome: resultado.rows[0].nome
            });
        })
    }catch(err) {
        return res.send('Ocorreu um erro na autenticação');
    }
};

module.exports.preencherDados = async (req, res) => {
    try {
        let      = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            data_nascimento: req.body.data_nascimento,
            rua: req.body.rua,
            numero: req.body.numero,
            cep: req.body.cep,
            codigo_medico: req.body.codigo_medico
        }

        dbMedicos.preencher_dados(dadosUser)
        .then(() => {
            return res.status(200).json({
                statusDados: 'preenchido',
            });
        })
        .catch((err) => {
            return res.status(500).send(`Ocorreu um erro ao preencher dados do usuário, ${err}`);
        });
    }catch(err) {
        return err;   
    }
};