-- Məhsul statusu və anonim kataloq statistikası
-- Supabase SQL Editor-də bir dəfə icra edin.

alter table public.products
add column if not exists status text not null default 'available'
check (status in ('available','new','sold'));

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  product_id bigint references public.products(id) on delete cascade,
  event_type text not null check (
    event_type in ('view','whatsapp_tempra','whatsapp_condo')
  ),
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_product_id_idx
on public.analytics_events(product_id);

create index if not exists analytics_events_created_at_idx
on public.analytics_events(created_at desc);

alter table public.analytics_events enable row level security;

drop policy if exists "Admins can view analytics" on public.analytics_events;
create policy "Admins can view analytics" on public.analytics_events
for select to authenticated using (public.is_admin());

create or replace function public.track_product_event(
  p_product_id bigint,
  p_event_type text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_event_type not in ('view','whatsapp_tempra','whatsapp_condo') then
    raise exception 'Invalid event type';
  end if;

  if not exists (select 1 from public.products where id = p_product_id) then
    return;
  end if;

  insert into public.analytics_events(product_id,event_type)
  values (p_product_id,p_event_type);
end;
$$;

revoke all on function public.track_product_event(bigint,text) from public;
grant execute on function public.track_product_event(bigint,text) to anon, authenticated;
