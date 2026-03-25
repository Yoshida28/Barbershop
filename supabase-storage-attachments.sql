-- Add attachments array to contact_submissions
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS attachments text[] DEFAULT '{}';

-- Create attachments bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('attachments', 'attachments', false, 5242880, null)
on conflict do nothing;

create policy "Public can upload to attachments"
  on storage.objects for insert
  with check ( bucket_id = 'attachments' );

create policy "Auth users can view attachments"
  on storage.objects for select
  using ( bucket_id = 'attachments' and auth.role() = 'authenticated' );
