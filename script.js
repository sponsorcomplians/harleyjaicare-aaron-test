import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://paznbsrkqmghufmbghwa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhem5ic3JrcW1naHVmbWJnaHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjc4MDUsImV4cCI6MjA2NTc0MzgwNX0.UZwMpBq1pYkoq2-r_2zQvk60eW7auIfPahGSHlvhgKA');

async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      console.log('Retrieved data:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();