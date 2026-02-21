const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    const connectionString = process.env.SUPABASE_DB_URL;
    if (!connectionString) {
        console.error('SUPABASE_DB_URL is not defined in .env.local');
        process.exit(1);
    }

    const client = new Client({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false // Supabase requires SSL, but we'll bypass verification for this script
        }
    });

    try {
        await client.connect();
        console.log('Connected to Supabase database.');

        const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260221_create_product_reviews.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');

        console.log('Running migration...');
        await client.query(sql);
        console.log('Migration completed successfully!');

    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrate();
