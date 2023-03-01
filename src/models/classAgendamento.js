const database = require('./classConexao.js')

async function agendamento_data(data) {
    const client = await database.connect();
    const sql = 'SELECT * FROM medicos WHERE email = $1 AND senha = $2';
    const values = [loginUser.email, loginUser.senha];
    return await client.query(sql, values);
}

module.exports = { 
    agendamento_data
}; 