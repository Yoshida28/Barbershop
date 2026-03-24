-- ============================================================
-- TheBarberShop — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Services
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  price text not null,
  description text,
  category text,
  image_url text,
  duration text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Products / Shop
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price text not null,
  description text,
  category text,
  image_url text,
  rating numeric default 0,
  reviews integer default 0,
  details jsonb default '[]'::jsonb,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Rate Card
create table if not exists rate_card (
  id uuid default gen_random_uuid() primary key,
  service_name text not null,
  price text not null,
  duration text,
  category text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Locations
create table if not exists locations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text,
  phone text,
  hours text,
  lat numeric,
  lng numeric,
  image_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Gallery
create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  title text,
  image_url text not null,
  category text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Media Center
create table if not exists media_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  media_url text,
  media_type text default 'image',
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Franchise Info (key-value pairs managed via admin)
create table if not exists franchise_info (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  label text not null,
  value text not null,
  sort_order integer default 0
);

-- Contact / Franchise / Career Submissions
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('general', 'franchise', 'career')),
  name text not null,
  email text not null,
  phone text,
  country text,
  state text,
  city text,
  message text,
  created_at timestamptz default now()
);

-- ── Enable Row Level Security ──────────────────────────────────────────────

alter table services enable row level security;
alter table products enable row level security;
alter table rate_card enable row level security;
alter table locations enable row level security;
alter table gallery_items enable row level security;
alter table media_items enable row level security;
alter table franchise_info enable row level security;
alter table contact_submissions enable row level security;

-- ── Public read policies ──────────────────────────────────────────────────

create policy "Public read services"        on services        for select using (true);
create policy "Public read products"        on products        for select using (true);
create policy "Public read rate_card"       on rate_card       for select using (true);
create policy "Public read locations"       on locations       for select using (true);
create policy "Public read gallery_items"   on gallery_items   for select using (true);
create policy "Public read media_items"     on media_items     for select using (true);
create policy "Public read franchise_info"  on franchise_info  for select using (true);

-- ── Authenticated write policies ─────────────────────────────────────────

create policy "Auth write services"        on services        for all using (auth.role() = 'authenticated');
create policy "Auth write products"        on products        for all using (auth.role() = 'authenticated');
create policy "Auth write rate_card"       on rate_card       for all using (auth.role() = 'authenticated');
create policy "Auth write locations"       on locations       for all using (auth.role() = 'authenticated');
create policy "Auth write gallery_items"   on gallery_items   for all using (auth.role() = 'authenticated');
create policy "Auth write media_items"     on media_items     for all using (auth.role() = 'authenticated');
create policy "Auth write franchise_info"  on franchise_info  for all using (auth.role() = 'authenticated');

-- Public can insert submissions; authenticated can read them
create policy "Public insert submissions"  on contact_submissions for insert with check (true);
create policy "Auth read submissions"      on contact_submissions for select using (auth.role() = 'authenticated');
create policy "Auth delete submissions"    on contact_submissions for delete using (auth.role() = 'authenticated');

-- ── Seed: Franchise Info ──────────────────────────────────────────────────

insert into franchise_info (key, label, value, sort_order) values
  ('franchise_fee',  'Franchise Fee',  '₹3L',            0),
  ('area_required',  'Area Required',  '300 sqft',        1),
  ('investment',     'Investment',     '₹17.5L onwards',  2),
  ('royalty',        'Royalty',        '₹30K + GST PM',   3),
  ('roi',            'ROI',            '24 Months',        4)
on conflict (key) do nothing;

-- ── Seed: Services ────────────────────────────────────────────────────────

insert into services (title, price, description, category, image_url, duration, sort_order) values
  ('Executive Haircut',          '$65',  'Precision cut with hot towel finish.',               'Hair',     'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800', '45 min', 0),
  ('Signature Beard Trim',       '$40',  'Sculpting and conditioning treatment.',              'Beard',    'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800', '30 min', 1),
  ('Classic Hot Shave',          '$50',  'Traditional straight razor experience.',             'Grooming', 'https://images.pexels.com/photos/2080006/pexels-photo-2080006.jpeg?auto=compress&cs=tinysrgb&w=800', '40 min', 2),
  ('TheBarberShop Package',      '$120', 'Full hair, beard, and facial treatment.',            'Premium',  'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800', '90 min', 3),
  ('Scalp Therapy',              '$35',  'Invigorating massage and deep conditioning.',        'Hair',     'https://images.pexels.com/photos/2040050/pexels-photo-2040050.jpeg?auto=compress&cs=tinysrgb&w=800', '30 min', 4),
  ('Grey Blending',              '$45',  'Subtle, natural color integration.',                 'Premium',  'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop',        '45 min', 5)
on conflict do nothing;

-- ── Seed: Rate Card ────────────────────────────────────────────────────────

insert into rate_card (service_name, price, duration, category, sort_order) values
  ('Haircut',    '$65', '45 min', 'Senior Barber',  0),
  ('Beard Trim', '$40', '30 min', 'Senior Barber',  1),
  ('Hot Shave',  '$50', '40 min', 'Senior Barber',  2),
  ('Haircut',    '$85', '45 min', 'Master Barber',  3),
  ('Beard Trim', '$55', '30 min', 'Master Barber',  4),
  ('Hot Shave',  '$70', '40 min', 'Master Barber',  5)
on conflict do nothing;

-- ── Seed: Products ────────────────────────────────────────────────────────

insert into products (name, price, description, category, image_url, rating, reviews, details, sort_order) values
  ('Matte Clay',    '$28', 'A high-hold, zero-shine matte clay that gives texture and control.', 'Hair Styling', 'https://images.pexels.com/photos/4587635/pexels-photo-4587635.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 124, '["Strong hold formula","Matte finish","Water-soluble","No parabens or sulfates"]', 0),
  ('Beard Oil',     '$32', 'Cold-pressed argan and jojoba blend that nourishes the beard.',       'Beard Care',   'https://images.pexels.com/photos/672629/pexels-photo-672629.jpeg?auto=compress&cs=tinysrgb&w=600',   4.8, 98,  '["100% natural oils","Eliminates beard itch","Promotes growth","Subtle cedar scent"]', 1),
  ('Texture Spray', '$24', 'Lightweight sea salt spray that adds volume and texture.',            'Hair Styling', 'https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=600', 4.7, 86,  '["Sea salt formula","Adds natural wave","Buildable texture","Humidity resistant"]', 2),
  ('Pomade',        '$26', 'Water-based pomade with medium hold and subtle sheen.',               'Hair Styling', 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=600', 4.6, 71,  '["Water-based","Medium hold","Easy wash-out","No buildup"]', 3),
  ('Beard Balm',    '$22', 'Conditioning balm with beeswax and shea butter.',                    'Beard Care',   'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600', 4.8, 55,  '["Beeswax & shea butter","Light hold","Conditions as it styles","Woodsy scent"]', 4),
  ('Scalp Tonic',   '$36', 'Caffeine-infused scalp serum that stimulates follicles.',             'Scalp Care',   'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=600', 4.9, 43,  '["Caffeine infused","Reduces flakiness","Promotes follicle health","Fragrance free"]', 5)
on conflict do nothing;
