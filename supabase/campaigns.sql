-- ISSON kampaniya idarəetməsi
-- Supabase SQL Editor-də bir dəfə icra edin.

create table if not exists public.campaigns (
  id bigint generated always as identity primary key,
  title text not null,
  subtitle text,
  monthly_text text,
  desktop_image text not null,
  mobile_image text,
  link_url text not null default '#',
  product_ids bigint[] not null default '{}',
  starts_at date,
  ends_at date,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;

drop policy if exists "Public can view active campaigns" on public.campaigns;
create policy "Public can view active campaigns" on public.campaigns
for select to anon, authenticated
using (
  active = true
  and (starts_at is null or starts_at <= current_date)
  and (ends_at is null or ends_at >= current_date)
);

drop policy if exists "Admins manage campaigns" on public.campaigns;
create policy "Admins manage campaigns" on public.campaigns
for all to authenticated
using (public.is_admin())
with check (public.is_admin());
