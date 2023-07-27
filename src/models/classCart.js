const database = require('./classConexao.js')

async function listCart(dados) {
    const client = await database.connect();

    try {
        const sql = 'SELECT * FROM carrinho WHERE fk_medicos_pk_medicos = $1;';
        const values = [dados.pk_medicos];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function adcCart(dados) {
    const client = await database.connect();

    try {
        for (let i = 0; i < dados.horarios.length; i++) {
            const sql = 'INSERT INTO carrinho(nome, valor, fk_medicos_pk_medicos, horarios, nome_medico, email_medico, data_agendada, pk_sala) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
            const values = [dados.name_sala, dados.preco_sala, dados.pk_medicos, dados.horarios[i], dados.nome_medico, dados.email_medico, dados.data_agendada, dados.pk_sala];
            await client.query(sql, values);
        }
        return 0;
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function excludeCart(dados) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM carrinho WHERE pk_cart = $1;';
        const values = [dados.pk_cart];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function excludeAllCart(dados) {
    const client = await database.connect();

    try {
        const sql = 'DELETE FROM carrinho WHERE fk_medicos_pk_medicos = $1;';
        const values = [dados.pk_medicos];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

module.exports = {
    listCart,
    adcCart,
    excludeCart,
    excludeAllCart
}; 