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
        const sql = 'DELETE FROM datas_agendadas WHERE fk_medicos_pk_medicos = $1;'
        const values = [pk_apagar.pk_medicos];
        await client.query(sql, values);

        const sql2 = 'DELETE FROM medicos WHERE pk_medicos = $1;'
        const values2 = [pk_apagar.pk_medicos];
        return await client.query(sql2, values2);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function adcSalas(adcSala) {
    const client = await database.connect();

    try {
        const sql = 'INSERT INTO salas (nome, descricao, descricao_longa, valor, imgUrl) VALUES ($1, $2, $3, $4, $5);'
        const values = [adcSala.nome, adcSala.descricao, adcSala.longDescricao, adcSala.valor, adcSala.imgUrl];
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
        const sql = 'SELECT dias FROM dias_indisponiveis;'
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

module.exports = { 
    login,
    cadastro,
    preencher_dados,
    checaMedico,
    checaPkMedico,
    deletarConta,
    adcSalas,
    checarSalas,
    deletarSalas,
    editarSalas,
    selectSalas,
    bloquearDiaSelecionado,
    selectDiasBloqueados
}; 