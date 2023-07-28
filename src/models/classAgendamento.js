const database = require('./classConexao.js')

async function returnHours(data) {
    const client = await database.connect();
    
    try {
        const sql = 'select hrd.horario_disponivel from salas sla left join salas_horarios slh on (sla.pk_salas = slh.fk_salas_pk_salas) left join horarios_disponiveis hrd on (slh.fk_horarios_disponiveis_pk_horarios_disponiveis = hrd.pk_horarios_disponiveis) where slh.fk_salas_pk_salas is not null and hrd.horario_disponivel not in (select hora from datas_agendadas where datas = $1 and fk_salas_pk_salas = $2)';
        const values = [data.dia, data.pk_salas];
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

async function agendaDados(agendaDado) {
    const client = await database.connect();
    
    try {
        const sql = 'insert into datas_agendadas (datas, hora, fk_salas_pk_salas, fk_medicos_pk_medicos) values ($1, $2, $3, $4)';
        const values = [agendaDado.data, agendaDado.horarios, agendaDado.pk_salas, agendaDado.pk_medicos];   
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function agendamentos(agenda) {
    const client = await database.connect();
          
    try {
        const sql = 'select * from medicos med left join datas_agendadas dta on(med.pk_medicos = dta.fk_medicos_pk_medicos) left join salas sla on (sla.pk_salas = dta.fk_salas_pk_salas) where dta.fk_medicos_pk_medicos = $1';
        const values = [agenda.pk_medicos];   
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function horariosAgendados() {
    const client = await database.connect();
    
    try {
        const sql = 'SELECT *, SA.nome AS nome_sala, ME.nome as nome_medicos FROM datas_agendadas DA INNER JOIN medicos ME ON (DA.fk_medicos_pk_medicos = ME.pk_medicos) INNER JOIN salas SA ON (DA.fk_salas_pk_salas = SA.pk_salas);';   
        return await client.query(sql);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

async function excluirAgendamento(pk_agenda) {
    const client = await database.connect();
    
    try {
        const sql = 'DELETE FROM datas_agendadas WHERE pk_agendamento = $1;';   
        const values = [pk_agenda.pk_agendamento];
        return await client.query(sql, values);
    } catch (err) {
        return err;
    } finally {
        client.release();
    }
}

module.exports = { 
    returnHours,
    checaDados,
    agendaDados,
    agendamentos,
    horariosAgendados,
    excluirAgendamento
}; 