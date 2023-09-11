const database = require('./classConexao.js')

async function login(loginUser) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM medicos WHERE email = $1 AND senha = $2';
        const values = [loginUser.email, loginUser.senha];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function cadastro(cadastroUser){
    const client = await database.connect();

    try {
        const sql = 'INSERT INTO medicos(especialidade, email, nome, senha) VALUES ($1, $2, $3, $4) RETURNING pk_medicos;';
        const values = [cadastroUser.especialidade, cadastroUser.email, cadastroUser.nome, cadastroUser.senha];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function preencher_dados(dadosUser){
    const client = await database.connect();

    try {
        const sql = 'INSERT INTO dados_pessoais (nome_completo, cpf, data_nascimento, rua, numero_casa, cep, fk_medicos_pk_medicos) VALUES ($1, $2, DATE($3), $4, $5, $6, $7);';
        const values = [dadosUser.nome, dadosUser.cpf, dadosUser.data_nascimento, dadosUser.rua, dadosUser.numero, dadosUser.cep, dadosUser.codigo_medico];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function checaMedico(checaUser) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM medicos WHERE nome = $1 AND email = $2;'
        const values = [checaUser.nome, checaUser.email];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function checaPkMedico(checaPkUser) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM medicos WHERE pk_medicos = $1;'
        const values = [checaPkUser.pk_medicos];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function deletarConta(pk_apagar) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM datas_agendadas USING medicos WHERE datas_agendadas.fk_medicos_pk_medicos = medicos.pk_medicos AND medicos.pk_medicos = $1;'
        const values = [pk_apagar.pk_medicos];
        await client.query(sql, values);

        const sql2 = 'DELETE FROM dados_pessoais USING medicos WHERE dados_pessoais.fk_medicos_pk_medicos = medicos.pk_medicos AND medicos.pk_medicos = $1;'
        const values2 = [pk_apagar.pk_medicos];
        await client.query(sql2, values2);

        const sql3 = 'DELETE FROM medicos WHERE pk_medicos = $1;'
        const values3 = [pk_apagar.pk_medicos];
        return await client.query(sql3, values3);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function adcSalas(adcSala) {
    const client = await database.connect();

    try {
        const tags = adcSala.tags || [];
        const sql = 'INSERT INTO salas (nome, descricao, descricao_longa, valor, imgUrl, tags) VALUES ($1, $2, $3, $4, $5, $6);'
        const values = [adcSala.nome, adcSala.descricao, adcSala.longDescricao, adcSala.valor, adcSala.imgUrl, tags];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function adcPlanos(adcPlano) {
    const client = await database.connect();

    try {
        const sql = 'INSERT INTO planos (nome, descricao, duracao_em_dias, tipo, preco) VALUES ($1, $2, $3, $4, $5);'
        const values = [adcPlano.nome, adcPlano.descricao, adcPlano.duracao, adcPlano.tipo, adcPlano.valor];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function checarSalas() {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM salas ORDER BY pk_salas;'
        return await client.query(sql);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function checarPlanos() {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM planos ORDER BY pk_planos;'
        return await client.query(sql);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function deletarSalas(pk_salas) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM salas WHERE pk_salas = $1;'
        const values = [pk_salas.pk_sala];
        return await client.query(sql, values);

    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function deletarPlanos(pk_planos) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM planos WHERE pk_planos = $1;'
        const values = [pk_planos.pk_planos];
        return await client.query(sql, values);

    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function editarSalas(updateSala) {
    const client = await database.connect();

    try {
        const sql = 'UPDATE salas SET nome = $1, descricao = $2, valor = $3, descricao_longa = $4 WHERE pk_salas = $5;'
        const values = [updateSala.nome, updateSala.peq_descricao, updateSala.preco, updateSala.long_descricao, updateSala.pk_sala];
        return await client.query(sql, values);

    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function editarPlanos(updatePlano) {
    const client = await database.connect();

    try {
        const sql = 'UPDATE planos SET nome = $1, descricao = $2, duracao_em_dias = $3, tipo = $4, preco = $5 WHERE pk_planos = $6;'
        const values = [updatePlano.nome_plano, updatePlano.descricao, updatePlano.duracaoDias, updatePlano.tipo, updatePlano.preco, updatePlano.pk_plano];
        return await client.query(sql, values);

    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function selectSalas(pk_salas) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM salas WHERE pk_salas = $1;'
        const values = [pk_salas.pk_sala];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function selectDiasBloqueados() {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM dias_indisponiveis;'
        return await client.query(sql);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function bloquearDiaSelecionado(blockDay) {
    const client = await database.connect();

    try {
        const sql = 'INSERT INTO dias_indisponiveis (dias, usuario_bloqueou) VALUES ($1, $2);'
        const values = [blockDay.day, blockDay.user];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function consultaUsuario(dados) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM dados_pessoais WHERE fk_medicos_pk_medicos = $1'
        const values = [dados.pk_medicos];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function excluirDiaBloqueado(dados) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM dias_indisponiveis WHERE pk_dias_indisponiveis = $1;'
        const values = [dados.pk_dias_indisponiveis];
        return await client.query(sql, values);

    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function selectDiasPlanos() {
    const client = await database.connect();

    try {
        const sql = `SELECT * FROM datas_agendadas WHERE hora = $1;`;
        const values = ['00:00:00'];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

module.exports = { 
    login,
    cadastro,
    preencher_dados,
    checaMedico,
    checaPkMedico,
    deletarConta,
    adcSalas,
    adcPlanos,
    checarSalas,
    checarPlanos,
    deletarSalas,
    deletarPlanos,
    editarSalas,
    editarPlanos,
    selectSalas,
    bloquearDiaSelecionado,
    selectDiasBloqueados,
    consultaUsuario,
    excluirDiaBloqueado,
    selectDiasPlanos
}; 