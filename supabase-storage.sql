-- ============================================================
-- TheBarberShop — Supabase Storage Setup
-- Run this in your Supabase SQL Editor AFTER supabase-schema.sql
-- ============================================================

-- Create the public images bucket (idempotent)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  5242880,   -- 5 MB limit per file
  array['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do update
  set public            = excluded.public,
      file_size_limit   = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ── Storage RLS policies ──────────────────────────────────────────────────────

-- Public can read/download any file in the images bucket
create policy "Public read images"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Authenticated users can upload files
create policy "Auth upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'images'
    and auth.role() = 'authenticated'
  );

-- Authenticated users can update (replace) their files
create policy "Auth update images"
  on storage.objects for update
  using (
    bucket_id = 'images'
    and auth.role() = 'authenticated'
  );

-- Authenticated users can delete files
create policy "Auth delete images"
  on storage.objects for delete
  using (
    bucket_id = 'images'
    and auth.role() = 'authenticated'
  );
