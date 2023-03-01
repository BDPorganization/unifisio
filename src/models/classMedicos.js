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

module.exports = { 
    login,
    cadastro
}; 