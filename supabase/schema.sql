-- Laudo Pronto — rode no SQL Editor do Supabase (uma vez).

create table if not exists public.acessos (
  email          text primary key,
  pacotes        text[] not null default '{}',   -- essencial | contratos | completo | ia
  nome           text,
  criado_em      timestamptz not null default now(),
  atualizado_em  timestamptz not null default now()
);

create table if not exists public.pedidos (
  ref_id      text not null,
  evento      text not null,
  email       text,
  produto     text,
  valor       numeric,
  recebido_em timestamptz not null default now(),
  primary key (ref_id, evento)
);

create table if not exists public.uso_ia (
  id        bigserial primary key,
  email     text not null,
  criado_em timestamptz not null default now()
);
create index if not exists uso_ia_email_data on public.uso_ia (email, criado_em desc);

alter table public.acessos enable row level security;
alter table public.pedidos enable row level security;
alter table public.uso_ia  enable row level security;

-- O usuário logado só lê o próprio acesso. Escritas só pelo servidor (service role).
drop policy if exists "le o proprio acesso" on public.acessos;
create policy "le o proprio acesso" on public.acessos
  for select using (lower(email) = lower(auth.jwt() ->> 'email'));
