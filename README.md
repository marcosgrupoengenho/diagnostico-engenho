# Diagnóstico de Gestão — Grupo Engenho

App web de diagnóstico para captação e qualificação de leads de consultoria.
Stack: React + Vite + Supabase + Vercel

---

## Estrutura do projeto

```
diagnostico-engenho/
├── index.html
├── package.json
├── vite.config.js
├── .env.example              ← copie para .env.local e preencha
├── supabase/
│   └── migrations/
│       └── 001_initial.sql   ← rode isso no Supabase primeiro
└── src/
    ├── main.jsx
    ├── App.jsx               ← roteamento entre páginas
    ├── index.css             ← design system global
    ├── lib/
    │   ├── supabase.js       ← cliente Supabase
    │   └── data.js           ← perguntas, textos, lógica de pontuação
    └── pages/
        ├── Intro.jsx + .module.css
        ├── Quiz.jsx  + .module.css
        ├── Gate.jsx  + .module.css   ← portão de captura
        └── Result.jsx + .module.css  ← diagnóstico completo
```

---

## 1. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto novo
2. Vá em **SQL Editor** e cole o conteúdo de `supabase/migrations/001_initial.sql`
3. Clique em **Run** — isso cria a tabela `leads` com todas as colunas e políticas de segurança
4. Vá em **Settings → API** e copie:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com os valores copiados do Supabase:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. Personalizar contatos (obrigatório antes de publicar)

Abra `src/pages/Result.jsx` e substitua:

```js
const WHATSAPP_NUMBER = '5511999999999'   // DDD + número, sem espaços
const EMAIL_CONTATO   = 'contato@grupoengenho.com.br'
```

E o link do Calendly na função `handleAgendar`:
```js
window.open('https://calendly.com/grupoengenho', '_blank')
```

---

## 4. Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

---

## 5. Deploy no Vercel

```bash
npm install -g vercel
vercel
```

Na primeira vez o CLI vai perguntar:
- **Set up and deploy?** → Y
- **Which scope?** → sua conta
- **Link to existing project?** → N
- **Project name** → diagnostico-engenho (ou o que preferir)
- **Directory** → ./ (enter)
- **Override settings?** → N

Depois, adicione as variáveis de ambiente no painel Vercel:
1. Acesse seu projeto no [vercel.com](https://vercel.com)
2. **Settings → Environment Variables**
3. Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
4. Redeploy: `vercel --prod`

---

## 6. E-mail automático quando um lead responde (opcional mas recomendado)

O Supabase pode disparar um e-mail automaticamente via **Database Webhooks**.

### Opção A — Resend (recomendado, gratuito até 3.000 e-mails/mês)

1. Crie conta em [resend.com](https://resend.com) e gere uma API Key
2. No Supabase, vá em **Database → Webhooks → Create Webhook**
3. Configure:
   - **Name:** notify_new_lead
   - **Table:** leads
   - **Events:** INSERT
   - **URL:** `https://api.resend.com/emails`
   - **HTTP Headers:**
     - `Authorization: Bearer SUA_RESEND_API_KEY`
     - `Content-Type: application/json`
   - **HTTP Body:**
```json
{
  "from": "diagnostico@grupoengenho.com.br",
  "to": ["voce@grupoengenho.com.br"],
  "subject": "Novo lead: {{record.nome}} — {{record.empresa}}",
  "html": "<h2>Novo lead captado</h2><p><b>Nome:</b> {{record.nome}}<br><b>Empresa:</b> {{record.empresa}}<br><b>Cargo:</b> {{record.cargo}}<br><b>Setor:</b> {{record.setor}}<br><b>E-mail:</b> {{record.email}}<br><b>Pontuação:</b> {{record.score_total}}/50<br><b>Perfil:</b> {{record.perfil}}</p>"
}
```

### Opção B — Formspree (mais simples, sem código)

1. Crie conta em [formspree.io](https://formspree.io)
2. Crie um novo form e copie o endpoint
3. Em `src/pages/Gate.jsx`, adicione após o insert no Supabase:

```js
await fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: form.nome,
    empresa: form.empresa,
    email: form.email,
    score: total,
    perfil: profile.key,
  }),
})
```

---

## 7. Ver os leads captados

### Via Supabase (imediato)
1. Acesse seu projeto no Supabase
2. **Table Editor → leads**
3. Todos os leads aparecem em tempo real com pontuação por dimensão

### Via planilha Google (opcional)
1. No Supabase, vá em **Database → Webhooks**
2. Use o [Supabase + Google Sheets integration](https://supabase.com/docs/guides/integrations/google-sheets)
   ou conecte via Zapier/Make

---

## 8. Atualizar status dos leads (CRM básico)

A tabela `leads` tem um campo `status` com os valores:
`novo` → `contatado` → `em_conversa` → `proposta` → `fechado` ou `perdido`

Você pode atualizar direto pelo Supabase Table Editor enquanto não tiver um dashboard dedicado.

---

## Personalizar textos e perguntas

Tudo que aparece para o usuário está concentrado em **`src/lib/data.js`**:

- `QUESTIONS` — as 10 perguntas e suas dimensões
- `DIMS_DATA` — textos de dor e oportunidade por dimensão
- `PROFILES` — 4 perfis de diagnóstico com títulos e descrições
- `LABELS` — os 5 rótulos da escala Likert

Edite esse arquivo para ajustar qualquer texto sem tocar nos componentes.

---

## Como a pontuação funciona

Cada pergunta vale de 1 a 5. Perguntas com `inv: true` são invertidas
(resposta 1 vira 5, resposta 5 vira 1) — são as perguntas onde concordar
indica problema.

**Perfis:**
| Pontuação | Perfil |
|-----------|--------|
| 0 – 25    | Operação em risco |
| 26 – 39   | Gestão em desenvolvimento |
| 40 – 46   | Gestão estruturada |
| 47 – 50   | Alta maturidade operacional |

As 3 dimensões com menor pontuação aparecem em destaque no resultado
com o texto de dor e a oportunidade de consultoria correspondente.
