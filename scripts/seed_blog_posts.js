const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rioiopzqcukunmrgncih.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb2lvcHpxY3VrdW5tcmduY2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTEzMjE4NiwiZXhwIjoyMDg2NzA4MTg2fQ.YMhYIZXyl23nRwIBveOaedfnfqF-J5Wo-QeXxxb4Apo';

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
    {
        title: 'প্রাকৃতিক প্লেট ব্যবহার কেন জরুরি?',
        content: 'প্লাস্টিক বর্জ্য আমাদের পরিবেশের জন্য এক ভয়াবহ হুমকি। আমাদের সুপারি পাতার প্লেট বা Areca Leaf Plate সম্পূর্ণ প্রাকৃতিক এবং এটি ব্যবহারের পর অনায়াসেই মাটিতে মিশে যায়। এটি যেমন মজবুত, তেমনি দেখতেও আধুনিক। আজই প্লাস্টিক ছাড়ুন, প্রাকৃতিক পণ্য বেছে নিন।',
        media_type: 'image',
        media_url: '/why_natural_plates_thumbnail.png',
        published: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        title: 'কিভাবে তৈরি হয় আমাদের এই প্লেটসমূহ?',
        content: 'সুপারি গাছ থেকে ঝরে পড়া শুকনো খোল সংগ্রহ করে কয়েকটি ধাপে এগুলি ধুয়ে পরিষ্কার করা হয়। এরপর হাই-টেম্পারেচার প্রেসিং মেশিনের সাহায্যে নির্দিষ্ট আকার দেওয়া হয়। এতে কোনো বাড়তি আঠা বা কেমিক্যাল ব্যবহার করা হয় না। এটি ১০০% নিরাপদ। আমাদের ভিডিওতে দেখুন পুরো প্রক্রিয়াটি!',
        media_type: 'video',
        media_url: 'https://www.facebook.com/share/r/1B8qEPdJpF/', // Real video link
        published: true,
        created_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
        title: 'আপনার ইভেন্টকে দিন এক নতুন লুক',
        content: 'গায়ে হলুদ, জন্মদিন বা যেকোনো ঘরোয়া অনুষ্ঠানে ন্যাচারাল প্লেট ব্যবহার আপনার রুচির পরিচয় দেবে। অতিথিরা প্লাস্টিকের বদলে এই শৈল্পিক প্রাকৃতিক প্লেট দেখে অবাক হবে। এটি আমাদের বাংলার এক অনন্য ঐতিহ্য। আপনার পরবর্তী অনুষ্ঠানের জন্য আজই অর্ডার করুন।',
        media_type: 'none',
        media_url: null,
        published: true,
        created_at: new Date(Date.now() - 259200000).toISOString()
    }
];

async function seedBlogPosts() {
    console.log('Cleaning up existing blog posts...');
    const { error: deleteError } = await supabase
        .from('daily_posts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
        console.error('Error cleaning up posts:', deleteError);
        return;
    }

    console.log(`Inserting ${posts.length} sample blog posts...`);
    const { data, error } = await supabase
        .from('daily_posts')
        .insert(posts);

    if (error) {
        console.error('Error inserting posts:', error);
    } else {
        console.log(`✅ Successfully inserted ${posts.length} blog posts!`);
    }
}

seedBlogPosts();
