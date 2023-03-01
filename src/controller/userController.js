const dbMedicos = require('../models/classMedicos');
const { googleAuth } = require('google-auth-struct');
const md5 = require('md5');

module.exports.loginGoogle = async (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';

    (await googleAuth(token, client_id)).getUserData()
    .then(resultado => { 
        return res.status(200).render('menu');
    })
    .catch((err) => {
        return res.status(500).send('Erro ao logar com conta Google');
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
                return res.status(200).render('menu');
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
        if(req.session.logado > 0){
            let logado = true;
        }else{
            let logado = false;
        }
    }catch(err) {
        return res.send('Ocorreu um erro na autenticação');
    }
};