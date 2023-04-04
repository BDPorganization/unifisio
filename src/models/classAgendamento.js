const database = require('./classConexao.js')

async function returnHours(data) {
    const client = await database.connect();
    const sql = 'select hrd.horario_disponivel from salas sla left join salas_horarios slh on (sla.pk_salas = slh.fk_salas_pk_salas) left join horarios_disponiveis hrd on (slh.fk_horarios_disponiveis_pk_horarios_disponiveis = hrd.pk_horarios_disponiveis) where slh.fk_salas_pk_salas is not null and hrd.horario_disponivel  not in (select hora from datas_agendadas where datas = $1 )';
    const values = [data.dia];
    return await client.query(sql, values);
}

module.exports = { 
    returnHours
}; 