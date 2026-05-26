-- Tabela principal de leads
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),

  -- Dados do lead (portão)
  nome text not null,
  empresa text not null,
  cargo text not null,
  setor text,
  email text not null,

  -- Pontuação geral
  score_total integer not null check (score_total between 0 and 50),
  perfil text not null, -- 'risco' | 'desenvolvimento' | 'estruturada' | 'alta_maturidade'

  -- Pontuação por dimensão (1–5)
  score_gestao_processos integer,
  score_indicadores integer,
  score_gestao_rotina integer,
  score_melhoria_continua integer,
  score_estrategia integer,
  score_estrutura integer,
  score_cultura integer,
  score_projetos integer,
  score_informacao integer,
  score_execucao integer,

  -- Controle comercial
  status text default 'novo' check (status in ('novo','contatado','em_conversa','proposta','fechado','perdido')),
  notas text,
  consultor_responsavel text
);

-- Índices úteis para filtrar na dashboard
create index leads_created_at_idx on public.leads(created_at desc);
create index leads_status_idx on public.leads(status);
create index leads_perfil_idx on public.leads(perfil);
create index leads_score_idx on public.leads(score_total);

-- Habilita Row Level Security
alter table public.leads enable row level security;

-- Política: inserção pública (o site grava sem autenticação)
create policy "insert_public" on public.leads
  for insert to anon with check (true);

-- Política: leitura apenas para usuários autenticados (você, no dashboard)
create policy "select_authenticated" on public.leads
  for select to authenticated using (true);

-- Política: atualização apenas para autenticados (mudar status, notas)
create policy "update_authenticated" on public.leads
  for update to authenticated using (true);

-- View resumida para dashboard
create view public.leads_resumo as
select
  id, created_at, nome, empresa, cargo, setor, email,
  score_total, perfil, status, consultor_responsavel,
  -- as 3 dimensões mais baixas (para o consultor ver rápido)
  least(
    score_gestao_processos, score_indicadores, score_gestao_rotina,
    score_melhoria_continua, score_estrategia, score_estrutura,
    score_cultura, score_projetos, score_informacao, score_execucao
  ) as score_minimo
from public.leads
order by created_at desc;
