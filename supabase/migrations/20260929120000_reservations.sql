create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  reservation_date date not null,
  reservation_time text not null,
  guests integer not null check (guests between 1 and 8),
  message text,
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

create policy "Users can insert their own reservations"
  on public.reservations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can read their own reservations"
  on public.reservations
  for select
  to authenticated
  using (auth.uid() = user_id);
