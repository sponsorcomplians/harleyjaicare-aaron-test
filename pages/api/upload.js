import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';

const supabase = createClient(process.env.https//paznbsrkqmghufmbghwa.supabase.co, process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhem5ic3JrcW1naHVmbWJnaHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjc4MDUsImV4cCI6MjA2NTc0MzgwNX0.UZwMpBq1pYkoq2-r_2zQvk60eW7auIfPahGSHlvhgKA);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const file = files.file;
      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const fileContent = await fs.promises.readFile(file.filepath, 'utf8');
      const carePlan = generateCarePlan(fileContent);

      const { data, error } = await supabase
        .from('care_plans')
        .insert({ plan: carePlan });

      if (error) {
        console.error('Error storing care plan in Supabase:', error);
        res.status(500).json({ error: 'Failed to store care plan' });
        return;
      }

      res.status(200).json({ plan: carePlan });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

function generateCarePlan(fileContent) {
  // Implement your care plan generation logic here
  const carePlan = `Generated Care Plan:\n\n${fileContent}`;
  return carePlan;
}