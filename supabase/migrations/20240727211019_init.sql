create table products (id uuid primary key default gen_random_uuid(), name text not null, description text not null, price float not null, stock integer not null default 0, created_at timestamp with time zone default now(), updated_at timestamp with time zone default now());


alter table products enable row level security;


create policy "Allow read access to products" on products
for
select using (true);

