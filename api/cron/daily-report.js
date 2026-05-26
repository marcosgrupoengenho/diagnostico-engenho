const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const RESEND_KEY   = process.env.RESEND_API_KEY;
const EMAIL_TO     = 'marcos@grupoengenho.com.br';
const EMAIL_FROM   = 'onboarding@resend.dev';

export default async function handler(req, res) {
  console.log('=== CRON STARTED ===');
  console.log('URL:', SUPABASE_URL || 'MISSING');
  console.log('KEY:', SUPABASE_KEY ? 'OK' : 'MISSING');

  const sbRes = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?select=id,nome,email,created_at&order=created_at.desc&limit=3`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );

  console.log('Status:', sbRes.status);
  const text = await sbRes.text();
  console.log('Response:', text.slice(0, 300));

  return res.status(200).json({ status: sbRes.status, body: text.slice(0, 300) });
}
