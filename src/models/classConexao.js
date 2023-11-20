const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://jobijsbg:OfFLfleDzTcILnIyjWGVnChZ9tkZ3cSI@babar.db.elephantsql.com:5432/jobijsbg',
  max: 1000,
  idleTimeoutMillis: 30000
});

console.log("Criou pool de conexões no PostgreSQL!");

async function connect() {    
  const client = await pool.connect();
  const release = client.release.bind(client);

  client.release = () => {
    release();
  };
  return client;
}

module.exports = { connect };