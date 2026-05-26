// api/cron/daily-report.js
// Roda todo dia às 8h (configurado no vercel.json)
// Busca os últimos leads e envia relatório por email

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const RESEND_KEY   = process.env.RESEND_API_KEY;
const EMAIL_TO     = 'marcos.grupoengenho@gmail.com';
const EMAIL_FROM   = 'onboarding@resend.dev';

const DIMENSIONS = [
  { candidates: ['score_estrategia','score_1','dim_1','s1'], label: 'Estratégia' },
  { candidates: ['score_estrutura','score_2','dim_2','s2'],  label: 'Estrutura Org.' },
  { candidates: ['score_cultura','score_3','dim_3','s3'],    label: 'Cultura e Liderança' },
  { candidates: ['score_processos','score_4','dim_4','s4'],  label: 'Gestão de Processos' },
  { candidates: ['score_indicadores','score_5','dim_5','s5'],label: 'Indicadores' },
  { candidates: ['score_operacao','score_6','dim_6','s6'],   label: 'Operação' },
  { candidates: ['score_melhoria','score_7','dim_7','s7'],   label: 'Melhoria Contínua' },
  { candidates: ['score_projetos','score_8','dim_8','s8'],   label: 'Gestão de Projetos' },
  { candidates: ['score_informacao','score_9','dim_9','s9'], label: 'Informação / TI' },
  { candidates: ['score_mudanca','score_10','dim_10','s10'], label: 'Gestão de Mudança' },
];

function resolveScores(lead) {
  const keys = Object.keys(lead);
  return DIMENSIONS.map(d => {
    const found = d.candidates.find(c => keys.includes(c) && typeof lead[c] === 'number');
    return found ? { label: d.label, value: lead[found] } : null;
  }).filter(Boolean);
}

function calcAvg(scores) {
  if (!scores.length) return 0;
  return scores.reduce((a, b) => a + b.value, 0) / scores.length;
}

function getProfile(avg) {
  if (avg >= 4)   return { label: 'Operação Madura',    badge: '#1D9E75', desc: 'Processos consolidados com oportunidades de otimização e escala.' };
  if (avg >= 2.5) return { label: 'Em Desenvolvimento', badge: '#F5A623', desc: 'Base formada, mas com lacunas que limitam crescimento e controle.' };
  return            { label: 'Operação Crítica',         badge: '#E85D5D', desc: 'Gargalos estruturais comprometem resultado e capacidade de expansão.' };
}

function dimColor(v) {
  if (v >= 4) return { bar: '#1D9E75', text: '#0f5c43' };
  if (v >= 3) return { bar: '#F5A623', text: '#92400E' };
  return              { bar: '#E85D5D', text: '#991B1B' };
}

function buildReportHTML(lead) {
  const scores  = resolveScores(lead);
  const avg     = calcAvg(scores);
  const avgFmt  = avg.toFixed(1);
  const profile = getProfile(avg);
  const nome    = lead.nome    || lead.name    || 'Lead';
  const empresa = lead.empresa || lead.company || '';
  const cargo   = lead.cargo   || lead.role    || '';
  const meta    = [cargo, empresa].filter(Boolean).join(' · ');
  const sorted  = [...scores].sort((a, b) => a.value - b.value);
  const worst3  = sorted.slice(0, 3);
  const best2   = sorted.slice(-2).reverse();

  const dimsRows = scores.map(s => {
    const c = dimColor(s.value);
    const w = Math.round((s.value / 5) * 100);
    return `<tr><td style="padding:6px 0;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#4A4A6A;width:160px;padding-right:12px;">${s.label}</td>
        <td><table width="100%" cellpadding="0" cellspacing="0" style="background:#E8E8F0;height:8px;border-radius:4px;">
          <tr><td style="background:${c.bar};width:${w}%;height:8px;border-radius:4px;"></td><td style="background:#E8E8F0;height:8px;"></td></tr>
        </table></td>
        <td style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:${c.text};width:36px;text-align:right;padding-left:10px;">${s.value}/5</td>
      </tr></table>
    </td></tr>`;
  }).join('');

  const insightRows = [
    ...worst3.map(s => `<tr><td style="padding:6px 0;"><table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td style="width:28px;vertical-align:top;font-size:14px;">⚠️</td>
      <td style="font-family:Arial,sans-serif;font-size:12px;color:#4A4A6A;line-height:1.5;">
        <strong style="color:#1A1A2E;">${s.label} — ${s.value}/5</strong><br>Área crítica. Oportunidade estrutural de melhoria.</td>
    </tr></table></td></tr>`),
    ...best2.map(s => `<tr><td style="padding:6px 0;"><table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td style="width:28px;vertical-align:top;font-size:14px;">✅</td>
      <td style="font-family:Arial,sans-serif;font-size:12px;color:#4A4A6A;line-height:1.5;">
        <strong style="color:#1A1A2E;">${s.label} — ${s.value}/5</strong><br>Ponto forte: base sólida para construir melhorias.</td>
    </tr></table></td></tr>`)
  ].join('');

  return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FC;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:white;border-radius:16px;overflow:hidden;border:1px solid #E8E8F0;">
  <tr><td style="background:#0f5c43;padding:36px 32px 28px;">
    <p style="font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin:0 0 14px;">Grupo Engenho · Diagnóstico de Gestão e Processos</p>
    <h1 style="font-size:28px;color:white;margin:0 0 4px;font-weight:700;">${nome}</h1>
    <p style="font-size:13px;color:rgba(255,255,255,0.7);margin:0 0 24px;">${meta || 'Diagnóstico realizado online'}</p>
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:rgba(255,255,255,0.18);border-radius:12px;padding:14px 22px;text-align:center;">
        <div style="font-size:40px;font-weight:700;color:white;line-height:1;">${avgFmt}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.65);margin-top:4px;">NOTA MÉDIA / 5</div>
      </td>
      <td style="padding-left:20px;">
        <div style="background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;color:white;display:inline-block;margin-bottom:6px;">${profile.label}</div>
        <p style="font-size:13px;color:rgba(255,255,255,0.75);margin:0;line-height:1.5;max-width:280px;">${profile.desc}</p>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <p style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A8AAA;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid #E8E8F0;">Pontuação por Dimensão</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">${dimsRows}</table>
    <p style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A8AAA;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid #E8E8F0;">Principais Achados</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">${insightRows}</table>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#E1F5EE;border-radius:12px;">
      <tr><td style="padding:18px 22px;">
        <p style="font-size:14px;font-weight:600;color:#0f5c43;margin:0 0 6px;">Próximo passo recomendado</p>
        <p style="font-size:13px;color:#1D6B50;margin:0;line-height:1.6;">Uma conversa de 30 minutos com um especialista do Grupo Engenho pode transformar esses achados em um plano de ação concreto.</p>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="background:#1A1A2E;padding:16px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:14px;font-weight:600;color:white;">Grupo <span style="color:#1D9E75;">Engenho</span></td>
      <td style="font-size:11px;color:rgba(255,255,255,0.4);text-align:right;">Consultoria em Melhoria e Otimização de Processos</td>
    </tr></table>
  </td></tr>
</table></td></tr></table>`;
}

function buildApproachMessage(lead, scores, avg) {
  const nome    = lead.nome    || lead.name    || 'prezado(a)';
  const empresa = lead.empresa || lead.company || 'sua empresa';
  const sorted  = [...scores].sort((a, b) => a.value - b.value);
  const piores  = sorted.slice(0, 2).map(s => s.label.toLowerCase()).join(' e ');
  const msgs = {
    alto:  `Olá, ${nome}! Vi que você respondeu nosso diagnóstico de gestão e fiquei impressionado com a maturidade da operação de ${empresa} — nota ${avg.toFixed(1)}/5 é um resultado sólido. Mesmo assim, identifiquei oportunidades de otimização em ${piores} que podem gerar ganhos reais de produtividade. Vale uma conversa rápida de 30 minutos para eu compartilhar o que encontrei?`,
    medio: `Olá, ${nome}! Obrigado por dedicar tempo ao nosso diagnóstico. Analisando as respostas de ${empresa}, percebi que vocês têm uma base sólida, mas ${piores} estão limitando o crescimento da operação. Tenho algumas ideias práticas de como resolver isso — posso compartilhar em uma conversa de 30 minutos?`,
    baixo: `Olá, ${nome}! Acabei de analisar o diagnóstico de ${empresa} e preciso ser direto: identifiquei gargalos críticos em ${piores} que, se não tratados, vão continuar comprometendo o resultado. A boa notícia é que são problemas resolvíveis. Posso te mostrar um caminho em 30 minutos?`,
  };
  const key = avg >= 4 ? 'alto' : avg >= 2.5 ? 'medio' : 'baixo';
  return msgs[key];
}

export default async function handler(req, res) {
  // Verifica autorização
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Log de debug das variáveis
  console.log('SUPABASE_URL:', SUPABASE_URL ? 'OK' : 'UNDEFINED');
  console.log('SUPABASE_KEY:', SUPABASE_KEY ? 'OK (length: ' + SUPABASE_KEY.length + ')' : 'UNDEFINED');
  console.log('RESEND_KEY:', RESEND_KEY ? 'OK' : 'UNDEFINED');

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Missing Supabase env vars' });
  }

  // Busca os últimos 10 leads
  const url = `${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=10`;
  console.log('Fetching:', url);

  const sbRes = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    }
  });

  console.log('Supabase status:', sbRes.status);

  if (!sbRes.ok) {
    const err = await sbRes.text();
    console.error('Supabase error:', err);
    return res.status(500).json({ error: 'Supabase fetch failed', detail: err });
  }

  const leads = await sbRes.json();
  console.log(`Found ${leads.length} lead(s)`);

  if (!leads.length) {
    return res.status(200).json({ message: 'No leads found.' });
  }

  // Envia email apenas para o lead mais recente
  const lead = leads[0];
  const scores  = resolveScores(lead);
  const avg     = calcAvg(scores);
  const nome    = lead.nome    || lead.name    || 'Lead';
  const empresa = lead.empresa || lead.company || '—';
  const email   = lead.email   || '—';
  const tel     = lead.telefone|| lead.phone   || lead.tel || '—';
  const cargo   = lead.cargo   || lead.role    || '—';
  const profile = getProfile(avg);
  const abordagem  = buildApproachMessage(lead, scores, avg);
  const reportHTML = buildReportHTML(lead);

  const emailHTML = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F7F8FC;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FC;padding:24px 16px;">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">

  <tr><td style="background:#1D9E75;border-radius:12px 12px 0 0;padding:16px 24px;">
    <p style="font-size:13px;font-weight:700;color:white;margin:0;">🔔 Novo lead no diagnóstico</p>
  </td></tr>

  <tr><td style="background:white;padding:24px;border-left:1px solid #E8E8F0;border-right:1px solid #E8E8F0;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8A8AAA;margin:0 0 14px;">Dados do respondente</p>
    <table cellpadding="0" cellspacing="0">
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;width:90px;">Nome</td><td style="font-size:13px;font-weight:600;color:#1A1A2E;">${nome}</td></tr>
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;">Empresa</td><td style="font-size:13px;font-weight:600;color:#1A1A2E;">${empresa}</td></tr>
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;">Cargo</td><td style="font-size:13px;color:#1A1A2E;">${cargo}</td></tr>
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;">Email</td><td style="font-size:13px;color:#1D9E75;">${email}</td></tr>
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;">Telefone</td><td style="font-size:13px;color:#1A1A2E;">${tel}</td></tr>
      <tr><td style="font-size:13px;color:#8A8AAA;padding:4px 16px 4px 0;">Perfil</td><td><span style="background:${profile.badge}22;color:${profile.badge};font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;">${profile.label} · ${avg.toFixed(1)}/5</span></td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#F7F8FC;padding:20px 24px;border:1px solid #E8E8F0;border-top:none;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8A8AAA;margin:0 0 12px;">💬 Mensagem sugerida de abordagem</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:white;border-radius:10px;border-left:3px solid #1D9E75;">
      <tr><td style="padding:16px 18px;font-size:14px;color:#1A1A2E;line-height:1.7;">${abordagem}</td></tr>
    </table>
    <p style="font-size:11px;color:#8A8AAA;margin:8px 0 0;font-style:italic;">Copie, personalize se quiser, e envie para ${email}</p>
  </td></tr>

  <tr><td style="background:#1A1A2E;padding:12px 24px;">
    <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0;">📊 Relatório completo do diagnóstico</p>
  </td></tr>

  <tr><td style="padding:0;">${reportHTML}</td></tr>

</table></td></tr></table>
</body></html>`;

  if (!RESEND_KEY) {
    console.log('No RESEND_KEY — skipping email send');
    return res.status(200).json({ message: 'No RESEND_KEY', lead: nome });
  }

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `🔔 Novo lead: ${nome} (${empresa}) · ${avg.toFixed(1)}/5 — ${profile.label}`,
      html: emailHTML,
    }),
  });

  const emailResult = await emailRes.json();
  console.log('Resend result:', JSON.stringify(emailResult));

  return res.status(200).json({
    processed: 1,
    lead: nome,
    emailStatus: emailRes.ok ? 'sent' : 'error',
    emailResult,
  });
}
