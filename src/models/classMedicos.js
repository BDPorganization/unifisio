const database = require('./classConexao.js')

async function login(loginUser) {
    const client = await database.connect();
    const sql = 'SELECT * FROM medicos WHERE email = $1 AND senha = $2';
    const values = [loginUser.email, loginUser.senha];
    return await client.query(sql, values);
}

async function cadastro(cadastroUser){
    const client = await database.connect();
    const sql = 'INSERT INTO medicos(especialidade, email, nome, senha) VALUES ($1, $2, $3, $4);';
    const values = [cadastroUser.especialidade, cadastroUser.email, cadastroUser.nome, cadastroUser.senha];
    return await client.query(sql, values);
}

async function preencher_dados(dadosUser){
    const client = await database.connect();
    const sql = 'INSERT INTO dados_pessoais (nome_completo, cpf, data_nascimento, rua, numero_casa, cep, fk_medicos_pk_medicos) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    const values = [dadosUser.nome, dadosUser.cpf, dadosUser.data_nascimento, dadosUser.rua, dadosUser.numero, dataUser.cep, dataUser.codigo_medico];
    return await client.query(sql, values);
}

async function checaMedico(checaUser) {
    const client = await database.connect();
    const sql = 'SELECT * FROM medicos WHERE nome = $1 AND email = $2';
    const values = [checaUser.nome, checaUser.email];
    return await client.query(sql, values);
}

async function checaPkMedico(checaPkUser) {
    const client = await database.connect();
    const sql = 'SELECT nome FROM medicos WHERE pk_medicos = $1';
    const values = [checaPkUser.pk_medicos];
    return await client.query(sql, values);
}

module.exports = { 
    login,
    cadastro,
    preencher_dados,
    checaMedico,
    checaPkMedico
}; 