
-- ETAPA 7: Estrutura inicial do banco Work OS

-- Funções internas protegidas
create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to authenticated;

-- 1. Perfis dos usuários
create table public.profiles (
  id uuid primary key
    references auth.users(id) on delete cascade,

  display_name text not null default '',
  created_at timestamptz not null default now()
);

-- 2. Ambientes de trabalho
create table public.workspaces (
  id uuid primary key default gen_random_uuid(),

  name text not null
    check (char_length(btrim(name)) between 1 and 100),

  owner_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,

  created_at timestamptz not null default now()
);

-- 3. Membros dos ambientes
create table public.workspace_members (
  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,

  user_id uuid not null
    references auth.users(id) on delete cascade,

  role text not null
    check (role in ('owner', 'admin', 'member')),

  joined_at timestamptz not null default now(),

  primary key (workspace_id, user_id)
);

-- Índices para consultas
create index workspaces_owner_idx
  on public.workspaces(owner_id);

create index workspace_members_user_idx
  on public.workspace_members(user_id);

-- 4. Criar perfil automaticamente após cadastro
create function private.create_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function private.create_user_profile();

-- 5. Registrar o criador como membro proprietário
create function private.add_workspace_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.workspace_members (
    workspace_id, user_id, role
  )
  values (new.id, new.owner_id, 'owner');

  return new;
end;
$$;

create trigger on_workspace_created
after insert on public.workspaces
for each row
execute function private.add_workspace_owner();

-- 6. Verificar participação em um workspace
create function private.is_workspace_member(
  workspace uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = workspace
      and user_id = (select auth.uid())
  );
$$;

-- Não expor execução privilegiada publicamente
revoke execute on function private.create_user_profile()
  from public, anon, authenticated;

revoke execute on function private.add_workspace_owner()
  from public, anon, authenticated;

revoke execute on function private.is_workspace_member(uuid)
  from public, anon, authenticated;

grant execute on function private.is_workspace_member(uuid)
  to authenticated;

-- 7. Ativar segurança por linha
alter table public.profiles
  enable row level security;

alter table public.workspaces
  enable row level security;

alter table public.workspace_members
  enable row level security;

-- 8. Limitar os privilégios das tabelas
revoke all on public.profiles,
  public.workspaces,
  public.workspace_members
from public, anon, authenticated;

grant select, update (display_name)
on public.profiles to authenticated;

grant select, insert, delete, update (name)
on public.workspaces to authenticated;

grant select
on public.workspace_members to authenticated;

-- 9. Políticas dos perfis
create policy "Read own profile"
on public.profiles for select
to authenticated
using (id = (select auth.uid()));

create policy "Update own profile"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

-- 10. Políticas dos workspaces
create policy "Read member workspaces"
on public.workspaces for select
to authenticated
using (
  owner_id = (select auth.uid())
  or private.is_workspace_member(id)
);

create policy "Create own workspaces"
on public.workspaces for insert
to authenticated
with check (owner_id = (select auth.uid()));

create policy "Update own workspaces"
on public.workspaces for update
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Delete own workspaces"
on public.workspaces for delete
to authenticated
using (owner_id = (select auth.uid()));

-- 11. Políticas dos membros
create policy "Read workspace members"
on public.workspace_members for select
to authenticated
using (
  private.is_workspace_member(workspace_id)
);