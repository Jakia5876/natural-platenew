const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    'https://rioiopzqcukunmrgncih.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb2lvcHpxY3VrdW5tcmduY2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTEzMjE4NiwiZXhwIjoyMDg2NzA4MTg2fQ.YMhYIZXyl23nRwIBveOaedfnfqF-J5Wo-QeXxxb4Apo'
);

async function check() {
    const { data, error } = await supabase
        .from('product_reviews')
        .select('user_name, rating, comment, product_id')
        .eq('approved', true)
        .order('created_at', { ascending: false });

    if (error) { console.error(error); return; }
    console.log(`Total approved reviews: ${data.length}`);
    data.forEach((r, i) => {
        console.log(`${i + 1}. [${r.product_id}] ${'★'.repeat(r.rating)} ${r.user_name}: ${r.comment.substring(0, 60)}...`);
    });
}
check();
