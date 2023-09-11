const dbMedicos = require('../models/classMedicos');
const { googleAuth } = require('google-auth-struct');
const md5 = require('md5');

module.exports.loginGoogle = async (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID;

    (await googleAuth(token, client_id)).getUserData()
        .then(response => {
            let infoUser = {
                nome: response.name,
                email: response.email,
            }

            dbMedicos.checaMedico(infoUser)
                .then((resultado) => {
                    if (resultado.rowCount > 0) {
                        let dadosUser = {
                            pk_medicos: resultado.rows[0].pk_medicos,
                            nome_user: resultado.rows[0].nome,
                            email_user: resultado.rows[0].email
                        };

                        req.session.user = dadosUser;
                        return res.status(200).redirect(req.headers.referer);
                    } else {
                        dbMedicos.cadastro(infoUser)
                            .then((resposta) => {
                                let checaPkUser = {
                                    pk_medicos: resposta.rows[0].pk_medicos,
                                };

                                dbMedicos.checaPkMedico(checaPkUser)
                                    .then((result) => {
                                        let dadosUser = {
                                            pk_medicos: result.rows[0].pk_medicos,
                                            nome_user: result.rows[0].nome,
                                            email_user: result.rows[0].email
                                        };

                                        req.session.user = dadosUser;
                                        return res.status(201).redirect(req.headers.referer);
                                    })
                            })
                    }
                })
        })
        .catch((err) => {
            return res.status(400).send(`Erro ao logar com conta Google, ${err}`);
        });
};

module.exports.login = async (req, res) => {
    try {
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
                        nome_user: resultado.rows[0].nome,
                        email_user: resultado.rows[0].email
                    };

                    req.session.user = dadosUser;
                    return res.status(200).render('index', { nome: dadosUser.nome_user });
                } else {
                    return res.status(404).json({ autorizado: false });
                }
            })
            .catch((err) => {
                return res.status(400).json({ autorizado: false });
            });
    } catch (err) {
        return res.status(400).json({ autorizado: false });
    }
};

module.exports.cadastro = async (req, res) => {
    try {
        let { emailCadastro, senhaCadastro, especialidade, nomeCompleto, confSenha } = req.body
        let cadastroUser = {
            especialidade: especialidade,
            nome: nomeCompleto,
            email: emailCadastro,
            senha: md5(senhaCadastro)
        }

        if (senhaCadastro == confSenha) {
            dbMedicos.checaMedico(cadastroUser)
                .then((response) => {
                    if (response.rowCount > 0) {
                        return res.status(302).json({ cadastrado: false });
                    } else {
                        dbMedicos.cadastro(cadastroUser)
                            .then(() => {
                                return res.status(201).json({ cadastrado: true });
                            })
                            .catch((err) => {
                                return res.status(400).json({ cadastrado: false });
                            });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({ cadastrado: false });
                });
        } else {
            return res.status(409).json({ cadastrado: false });
        }
    } catch (err) {
        return res.status(400).json({ cadastrado: false });
    }
};

module.exports.verificaLogin = async (req, res) => {
    try {
        if (req.session.user) {
            res.status(200).json({
                autenticado: true,
                nome: req.session.user.nome_user,
                email: req.session.user.email_user
            });
        } else {
            res.status(203).json({
                autenticado: false,
            });
        }
    } catch (err) {
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
            codigo_medico: req.session.user.pk_medicos
        }
        dbMedicos.preencher_dados(dadosUser)
            .then(() => {
                return res.status(201).json({ preenchido: true });
            })
            .catch((err) => {
                return res.status(400).json({ preenchido: false });
            });
    } catch (err) {
        return res.status(400).json({ preenchido: false });
    }
};

module.exports.desconectar = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return err;
            } else {
                res.status(308).redirect('/');
            }
        });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao desconectar');
    }
};

module.exports.apagarConta = async (req, res) => {
    try {
        let pk_apagar = {
            pk_medicos: req.session.user.pk_medicos
        }

        req.session.destroy((err) => {
            if (err) {
                return err;
            } else {
                dbMedicos.deletarConta(pk_apagar)
                    .then((response) => {
                        if (response.rowCount > 0) {
                            return res.status(200).redirect('/index');
                        } else {
                            return res.status(400).redirect('/index');
                        }
                    });
            }
        });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao deletar a conta do usuário');
    }
};

module.exports.adcSala = async (req, res) => {
    try {
        let adcSala = {
            nome: req.body.nomeSala,
            descricao: req.body.descricaoSala,
            longDescricao: req.body.longDescricaoSala,
            valor: req.body.valorSala,
            imgUrl: req.body.image,
            tags: req.body.arrayTags
        }

        dbMedicos.adcSalas(adcSala)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        salvarSala: true,
                    });
                } else {
                    return res.status(200).json({
                        salvarSala: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao adicionar a sala');
    }
};

module.exports.adcPlano = async (req, res) => {
    try {
        let adcPlano = {
            nome: req.body.nomePlano,
            descricao: req.body.descricaoPlano,
            duracao: req.body.duracaoPlano,
            tipo: req.body.tipoPlano,
            valor: req.body.valorPlano,
        }

        dbMedicos.adcPlanos(adcPlano)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        salvarPlano: true,
                    });
                } else {
                    return res.status(200).json({
                        salvarPlano: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao adicionar o plano');
    }
};

module.exports.checarSalasAdmin = async (req, res) => {
    try {
        dbMedicos.checarSalas()
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        salas: true,
                        dados: response.rows
                    });
                } else {
                    return res.status(404).json({
                        salas: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao listar salas');
    }
};

module.exports.checarPlanosAdmin = async (req, res) => {
    try {
        dbMedicos.checarPlanos()
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        salas: true,
                        dados: response.rows
                    });
                } else {
                    return res.status(404).json({
                        salas: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao listar planos');
    }
};

module.exports.excluirSala = async (req, res) => {
    try {
        let pk_salas = {
            pk_sala: req.body.pk_sala
        }

        dbMedicos.deletarSalas(pk_salas)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        excluirSala: true,
                    });
                } else {
                    return res.status(405).json({
                        excluirSala: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao excluir sala');
    }
};

module.exports.excluirPlano = async (req, res) => {
    try {
        let pk_planos = {
            pk_planos: req.body.pk_plano
        }

        dbMedicos.deletarPlanos(pk_planos)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        excluirPlano: true,
                    });
                } else {
                    return res.status(405).json({
                        excluirPlano: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao excluir o plano');
    }
};

module.exports.editarSala = async (req, res) => {
    try {
        let updateSala = {
            pk_sala: req.body.pk_sala,
            nome: req.body.nome_sala,
            peq_descricao: req.body.peq_descricao,
            long_descricao: req.body.long_descricao,
            preco: req.body.preco
        }

        dbMedicos.editarSalas(updateSala)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        editarSala: true,
                    });
                } else {
                    return res.status(405).json({
                        editarSala: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao editar sala');
    }
};

module.exports.editarPlano = async (req, res) => {
    try {
        let updatePlano = {
            pk_plano: req.body.pk_plano,
            nome_plano: req.body.nome_plano,
            descricao: req.body.descricao,
            duracaoDias: req.body.duracaoDias,
            tipo: req.body.tipo,
            preco: req.body.preco
        }

        dbMedicos.editarPlanos(updatePlano)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        editarPlano: true,
                    });
                } else {
                    return res.status(405).json({
                        editarPlano: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao editar sala');
    }
};

module.exports.selectSalasByPk = async (req, res) => {
    try {
        let pk_salas = {
            pk_sala: req.body.idSala
        }

        dbMedicos.selectSalas(pk_salas)
            .then(async (response) => {
                if (response.rowCount > 0) {
                    let dias = await dbMedicos.selectDiasBloqueados();
                    let dias_planos = await dbMedicos.selectDiasPlanos();

                    if (dias || dias_planos) {
                        return res.status(200).json({
                            salas: true,
                            dados: response.rows,
                            dias: dias.rows,
                            dias_planos: dias_planos.rows
                        });
                    } else {
                        return res.status(200).json({
                            salas: true,
                            dados: response.rows,
                        });
                    }
                } else {
                    return res.status(404).json({
                        salas: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao carregar a sala');
    }
};

module.exports.bloquearDia = async (req, res) => {
    try {
        let blockDay = {
            day: req.body.blockDay,
            user: req.session.user.nome_user
        }

        dbMedicos.bloquearDiaSelecionado(blockDay)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        bloquearDia: true,
                    });
                } else {
                    return res.status(404).json({
                        bloquearDia: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao bloquear dia');
    }
};

module.exports.consultaDadosContrato = async (req, res, next) => {
    try {
        let dados = {
            pk_medicos: req.session.user.pk_medicos
        }

        dbMedicos.consultaUsuario(dados)
            .then((response) => {
                if (response.rowCount > 0) {
                    req.rows = response.rows;
                    next();
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao consultar os dados do usuário');
    }
};

module.exports.diasBloqueados = async (req, res) => {
    try {
        dbMedicos.selectDiasBloqueados()
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        diasBloqueados: true,
                        dados: response.rows
                    });
                } else {
                    return res.status(404).json({
                        diasBloqueados: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao consultar os dias bloqueados');
    }
};

module.exports.excluirDiaBloqueado = async (req, res) => {
    try {
        let dados = {
            pk_dias_indisponiveis: req.body.pk_dias_indisponiveis
        }

        dbMedicos.excluirDiaBloqueado(dados)
            .then((response) => {
                if (response.rowCount > 0) {
                    return res.status(200).json({
                        excluirDiaBloqueado: true,
                    });
                } else {
                    return res.status(404).json({
                        excluirDiaBloqueado: false,
                    });
                }
            });
    } catch (err) {
        return res.status(401).send('Ocorreu um erro ao desbloquear o dia selecionado');
    }
};