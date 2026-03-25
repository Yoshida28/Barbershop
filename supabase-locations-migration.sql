-- Migration: add country, state, city columns to locations table
-- Run this in your Supabase SQL Editor

ALTER TABLE locations
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS state   text,
  ADD COLUMN IF NOT EXISTS city    text;
