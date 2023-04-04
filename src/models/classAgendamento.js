const database = require('./classConexao.js')

async function returnHours(data) {
    const client = await database.connect();
    const sql = 'select hrd.horario_disponivel from salas sla join salas_horarios slh on (sla.pk_salas = slh.fk_salas_pk_salas) join horarios_disponiveis hrd on (slh.fk_horarios_disponiveis_pk_horarios_disponiveis = hrd.pk_horarios_disponiveis) where hrd.horario_disponivel != (select hora from datas_agendadas where datas = $1 and fk_salas_pk_salas = $2)';
    const values = [data.dia, data.pk_sala];
    return await client.query(sql, values);
}

module.exports = { 
    returnHours
}; 