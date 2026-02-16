const { createClient } = require('@supabase/supabase-js');

// 1. Pull the keys from the .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 2. DEBUGGING: Check if the app can actually see the keys
if (!supabaseUrl || !supabaseKey) {
    console.log("❌ ALARM: Supabase URL or Key is missing! Check your .env file.");
} else {
    console.log("✅ Supabase keys loaded successfully!");
}

console.log("Trying to connect to URL:", `"${supabaseUrl}"`);

// 3. Create and export the client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;  