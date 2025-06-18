const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseKey = 'YOUR_SUPABASE_PUBLIC_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  const formData = new FormData();
  formData.append('file', file);
  
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    displayCarePlan(data.plan);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function displayCarePlan(carePlan) {
  const outputElement = document.getElementById('carePlanOutput');
  outputElement.innerText = carePlan;
}