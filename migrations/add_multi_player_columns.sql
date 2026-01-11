-- Add columns for multi-player match support
-- Run this in your Supabase SQL Editor

-- Add player_count column (defaults to 2 for existing matches)
ALTER TABLE matches ADD COLUMN IF NOT EXISTS player_count integer DEFAULT 2;

-- Add all_player_names column for storing all participants in multi-player games
ALTER TABLE matches ADD COLUMN IF NOT EXISTS all_player_names text;
