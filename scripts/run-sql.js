const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function runSQL(query) {
    const client = new Client({
        connectionString: process.env.SUPABASE_DB_URL,
    });

    try {
        await client.connect();
        console.log('Connected to Supabase DB');
        const res = await client.query(query);
        console.log('Query result:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error executing query:', err.stack);
    } finally {
        await client.end();
    }
}

const query = process.argv[2] || 'SELECT NOW() as current_time;';
runSQL(query);
