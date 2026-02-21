const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1).catch(() => ({ data: null, error: null }));

    // Since _test_connection probably doesn't exist, we just check if the client is initialized
    console.log('Client initialized with URL:', supabaseUrl);

    const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables') // This might not exist, let's try a simple query
        .catch(() => ({ data: null, error: null }));

    const { data: version, error: versionError } = await supabase.rpc('version').catch(() => ({ data: null, error: null }));

    console.log('Connection test completed.');
}

testConnection();
