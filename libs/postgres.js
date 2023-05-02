const { Client } = require('pg');


async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Montero.84',
    database: 'store_nodejs'
  });
  await client.connect();
  return client;
}

module.exports = { getConnection };
