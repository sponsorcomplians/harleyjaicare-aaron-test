import { Configuration, OpenAIApi } from 'openai';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File parsing failed' });
    }

    const file = files.file;
    const content = fs.readFileSync(file.filepath, 'utf8');

    const prompt = `
You are a UK healthcare AI assistant. Generate a care plan in IANS format for this patient data:

${content}

Use the IANS format, including: [DOMAIN NAME], How I want to be supported, Describe how staff will engage, Risks identified, and Risk Management.
    `;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a specialist in comprehensive care planning using UK IANS standards.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const plan = completion.data.choices[0].message.content;
    res.status(200).json({ plan });
  });
}
