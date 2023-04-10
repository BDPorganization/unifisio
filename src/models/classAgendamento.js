const database = require('./classConexao.js')

async function returnHours(data) {
    const client = await database.connect();
    
    try {
        const sql = 'select hrd.horario_disponivel from salas sla left join salas_horarios slh on (sla.pk_salas = slh.fk_salas_pk_salas) left join horarios_disponiveis hrd on (slh.fk_horarios_disponiveis_pk_horarios_disponiveis = hrd.pk_horarios_disponiveis) where slh.fk_salas_pk_salas is not null and hrd.horario_disponivel  not in (select hora from datas_agendadas where datas = $1 )';
        const values = [data.dia];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function checaDados(checaDado) {
    const client = await database.connect();
    
    try {
        const sql = 'select * from dados_pessoais where fk_medicos_pk_medicos = $1';
        const values = [checaDado.pk_medicos];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

module.exports = { 
    returnHours,
    checaDados
}; 