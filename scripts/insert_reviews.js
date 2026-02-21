// Script to insert Bangla reviews for Areca leaf plate products into Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rioiopzqcukunmrgncih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb2lvcHpxY3VrdW5tcmduY2loIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTEzMjE4NiwiZXhwIjoyMDg2NzA4MTg2fQ.YMhYIZXyl23nRwIBveOaedfnfqF-J5Wo-QeXxxb4Apo';

const supabase = createClient(supabaseUrl, supabaseKey);

const reviews = [
    // Reviews for Areca Leaf Square Plate (10") - p1
    {
        product_id: 'p1',
        user_name: 'রহিমা বেগম',
        rating: 5,
        comment: 'আমি বিয়ের অনুষ্ঠানে এই প্লেট ব্যবহার করেছি। অতিথিরা সবাই অবাক হয়ে গেছে! প্লাস্টিকের বদলে এই প্রাকৃতিক প্লেট দেখে সবাই প্রশংসা করেছে। পরিবেশবান্ধব এবং দেখতেও অসাধারণ। আবার অর্ডার দিব ইনশাআল্লাহ! 🌿',
        approved: true
    },
    {
        product_id: 'p1',
        user_name: 'কামরুল হাসান',
        rating: 5,
        comment: 'ক্যাটারিং ব্যবসায় এই প্লেট ব্যবহার করি। ক্রেতারা খুবই সন্তুষ্ট। গরম খাবার রাখলেও কোনো সমস্যা হয় না। দাম সাশ্রয়ী এবং মান অসাধারণ। প্রতি মাসে বাল্ক অর্ডার দিই। 👍',
        approved: true
    },
    // Reviews for Areca Leaf Square Plate (8") - p2
    {
        product_id: 'p2',
        user_name: 'ফাতেমা আক্তার',
        rating: 5,
        comment: 'বাচ্চাদের জন্মদিনে এই প্লেট ইউজ করলাম। সবাই জিজ্ঞেস করলো কোথায় পাওয়া যায়! প্লাস্টিক মুক্ত পার্টি দেওয়া সম্ভব হলো Natural Plate এর জন্য। অনেক ধন্যবাদ! 🎂🌱',
        approved: true
    },
    // Reviews for Areca Leaf Deep Round Plate (10") - p3
    {
        product_id: 'p3',
        user_name: 'আবদুল করিম',
        rating: 5,
        comment: 'রেস্টুরেন্টে এই ডীপ প্লেট ইউজ করি। তরকারি, ভাত সব রাখা যায়। একদম লিক হয় না। মাইক্রোওয়েভেও ইউজ করতে পারি। বায়োডিগ্রেডেবল হওয়ায় পরিবেশের ক্ষতি নেই। এটাই ভবিষ্যত! 🍛',
        approved: true
    },
    {
        product_id: 'p3',
        user_name: 'নাসরিন সুলতানা',
        rating: 4,
        comment: 'দাওয়াতে এই প্লেটে বিরিয়ানি পরিবেশন করলাম। দেখতে এতো সুন্দর যে মেহমানরা প্লেটের ছবি তুলছিলো! শুধু একটু বেশি পরিমাণ গ্রেভি দিলে সময় নিয়ে খেতে হয়। তবে সবদিক দিয়ে চমৎকার! 🌟',
        approved: true
    },
    // Reviews for Areca Leaf Round Plate (10") - p4
    {
        product_id: 'p4',
        user_name: 'মোহাম্মদ আলী',
        rating: 5,
        comment: 'আমি একজন পরিবেশ সচেতন মানুষ। এই প্লেট আমার জীবনযাত্রার সাথে পুরোপুরি মিলে যায়। প্রতিদিন সকালের নাস্তায় এই প্লেট ব্যবহার করি। ধুয়ে আবার ব্যবহার না করলেও কম্পোস্ট করে মাটিতে ফেরত দিতে পারি। অসাধারণ! 🌍♻️',
        approved: true
    },
    // Reviews for Heart Bowl - p12
    {
        product_id: 'p12',
        user_name: 'সাবরিনা চৌধুরী',
        rating: 5,
        comment: 'হার্ট শেইপের এই বাটি দিয়ে পায়েস পরিবেশন করলাম। সবাই মুগ্ধ! ভ্যালেন্টাইনস ডে তে স্পেশাল ডেজার্ট সার্ভ করার জন্য পারফেক্ট। এতো সুন্দর ডিজাইন আর একদম ন্যাচারাল! ❤️🍃',
        approved: true
    },
    // Reviews for Snack Plate - p13
    {
        product_id: 'p13',
        user_name: 'তানভীর আহমেদ',
        rating: 5,
        comment: 'অফিসের মিটিংয়ে স্ন্যাকস সার্ভ করতে এই প্লেট ইউজ করি। প্রফেশনাল লুক দেয় এবং ক্লায়েন্টরা ইমপ্রেসড হয়। প্লাস্টিক ফ্রি অফিস বানাতে এটা প্রথম পদক্ষেপ! 💼🌿',
        approved: true
    },
    // Reviews for Rectangular Tray - p6
    {
        product_id: 'p6',
        user_name: 'জান্নাতুল ফেরদৌস',
        rating: 5,
        comment: 'ইফতার পার্টিতে এই ট্রে তে ফল, চমুচা সব সাজিয়ে দিলাম। অতিথিরা বলল এটা কোন গাছের পাতা? যখন বললাম সুপারি গাছের পাতা, সবাই অবাক! একদম সেফ, কেমিক্যাল ফ্রি। আমাদের দেশের পণ্য বলে গর্ব হয়! 🇧🇩',
        approved: true
    },
    // Reviews for Food Box - p7
    {
        product_id: 'p7',
        user_name: 'শাহিন রেজা',
        rating: 5,
        comment: 'ফুড ডেলিভারি বিজনেসে এই ফুড বক্স ইউজ করি। কাস্টমাররা খুবই হ্যাপি। প্লাস্টিকের বদলে এই ন্যাচারাল বক্সে খাবার পেয়ে তারা আমাদের পজিটিভ রিভিউ দেয়। বিজনেস গ্রো করছে! 📦🌱',
        approved: true
    },
    // Reviews for Deep Square Bowl - p5
    {
        product_id: 'p5',
        user_name: 'আয়েশা সিদ্দিকা',
        rating: 5,
        comment: 'স্যুপ সার্ভ করার জন্য পারফেক্ট! গভীর বাটি হওয়ায় স্যুপ ছিটকায় না। শীতকালে গরম স্যুপ এই বাটিতে সার্ভ করলে অনেকক্ষণ গরম থাকে। দারুন মানের প্রোডাক্ট! 🍲',
        approved: true
    },
    // More general reviews for popular plates
    {
        product_id: 'p10',
        user_name: 'মিজানুর রহমান',
        rating: 5,
        comment: 'গ্রামের বাড়িতে মিলাদে এই প্লেট ব্যবহার করলাম। ৫০০ পিস অর্ডার দিয়েছিলাম। সবাই বলল - এই রকম সুন্দর প্লেট কখনো দেখিনি! পরিবেশবান্ধব এবং দাম অনেক কম। Natural Plate কে অনেক ধন্যবাদ! 🤲',
        approved: true
    },
    {
        product_id: 'p11',
        user_name: 'প্রিয়া দাস',
        rating: 4,
        comment: 'সকালের নাস্তায় পরোটা-ভাজি রাখতে ৮ ইঞ্চি প্লেট একদম পারফেক্ট সাইজ। আমার ছোট ক্যাফেতে এখন শুধু এই প্লেটই ইউজ করি। কাস্টমাররাও অনেক খুশি। ইকো-ফ্রেন্ডলি ক্যাফে হিসেবে আমরা পরিচিত হচ্ছি! ☕🌿',
        approved: true
    },
    {
        product_id: 'p9',
        user_name: 'হাসিবুল ইসলাম',
        rating: 5,
        comment: 'আমি একজন ফুড ব্লগার। ফুড ফটোগ্রাফিতে এই প্লেট ব্যবহার করলে ছবি অসাধারণ আসে! ন্যাচারাল টেক্সচার ফুডের সৌন্দর্য বাড়িয়ে দেয়। আমার ইনস্টাগ্রামে সবাই জানতে চায় এই প্লেট কোথায় পাওয়া যায়! 📸🍽️',
        approved: true
    }
];

async function insertReviews() {
    console.log(`Inserting ${reviews.length} Bangla reviews...`);

    const { data, error } = await supabase
        .from('product_reviews')
        .insert(reviews);

    if (error) {
        console.error('Error inserting reviews:', error);
    } else {
        console.log(`✅ Successfully inserted ${reviews.length} reviews!`);
    }
}

insertReviews();
