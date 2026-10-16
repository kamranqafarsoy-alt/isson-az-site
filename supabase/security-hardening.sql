-- ISSON security hardening applied to the live Supabase project.
-- Public visitors may read products, but only admins may mutate them.

begin;

drop policy if exists "Allow inserts" on public.products;
drop policy if exists "Allow public insert" on public.products;
drop policy if exists "Allow public update" on public.products;
drop policy if exists "Allow public delete" on public.products;

revoke insert, update, delete on table public.products from anon;

-- Product images are public to read, but uploads and changes require is_admin().
drop policy if exists "Public Upload Products" on storage.objects;

commit;
