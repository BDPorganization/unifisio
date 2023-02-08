const { Pool } = require('pg');

async function connect() {    
    const pool = new Pool({
        connectionString: 'postgres://jobijsbg:OfFLfleDzTcILnIyjWGVnChZ9tkZ3cSI@babar.db.elephantsql.com:5432/jobijsbg'
    });
    console.log("Criou pool de conexões no PostgreSQL!");
    global.connection = pool;

    return pool.connect();
}

module.exports = { connect };