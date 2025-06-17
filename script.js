import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://prj_iOEiX7hQ6OOu2iDcSTDnKpeYzq0J.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhem5ic3JrcW1naHVmbWJnaHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjc4MDUsImV4cCI6MjA2NTc0MzgwNX0.UZwMpBq1pYkoq2-r_2zQvk60eW7auIfPahGSHlvhgKA');

async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('care_plans')
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

window.uploadFile = function () {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch("/api/upload", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('responseArea').innerText = data.plan || JSON.stringify(data);
  })
  .catch(err => console.error("Upload error:", err));
};

