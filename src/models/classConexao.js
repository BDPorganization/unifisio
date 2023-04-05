const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://jobijsbg:OfFLfleDzTcILnIyjWGVnChZ9tkZ3cSI@babar.db.elephantsql.com:5432/jobijsbg',
  max: 10
});

console.log("Criou pool de conexões no PostgreSQL!");

async function connect() {    
  const client = await pool.connect();
  // console.log(`Conexão aberta. Total de conexões: ${pool.totalCount}, Conexões inativas: ${pool.idleCount}`);

  const release = client.release.bind(client);
  client.release = () => {
    // console.log(`Conexão liberada. Total de conexões: ${pool.totalCount}, Conexões inativas: ${pool.idleCount}`);
    release();
  };
  return client;
}

module.exports = { connect };