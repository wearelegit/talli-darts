-- Talli Darts Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  display_name text not null,
  avatar_url text,
  elo integer default 1000 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Matches table
create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  game_mode text check (game_mode in ('301', '501', 'practice')) not null,
  legs_to_win integer default 1 not null,
  sets_to_win integer default 1 not null,
  winner_id uuid references public.users(id),
  is_ranked boolean default true not null,
  status text check (status in ('pending', 'in_progress', 'completed', 'cancelled')) default 'pending' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Match players (join table)
create table public.match_players (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references public.matches(id) on delete cascade not null,
  player_id uuid references public.users(id) not null,
  player_order integer not null,
  legs_won integer default 0 not null,
  sets_won integer default 0 not null,
  elo_before integer not null,
  elo_after integer,
  created_at timestamptz default now() not null,
  unique(match_id, player_id),
  unique(match_id, player_order)
);

-- Legs table
create table public.legs (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references public.matches(id) on delete cascade not null,
  leg_number integer not null,
  set_number integer default 1 not null,
  starting_score integer not null,
  winner_id uuid references public.users(id),
  status text check (status in ('in_progress', 'completed')) default 'in_progress' not null,
  created_at timestamptz default now() not null,
  unique(match_id, set_number, leg_number)
);

-- Turns table (individual throws)
create table public.turns (
  id uuid default uuid_generate_v4() primary key,
  leg_id uuid references public.legs(id) on delete cascade not null,
  player_id uuid references public.users(id) not null,
  turn_number integer not null,
  throw_1 integer,
  throw_2 integer,
  throw_3 integer,
  score integer not null,
  remaining integer not null,
  is_bust boolean default false not null,
  created_at timestamptz default now() not null
);

-- Tournaments table
create table public.tournaments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  format text check (format in ('single_elimination')) default 'single_elimination' not null,
  size integer check (size in (4, 8, 16)) not null,
  status text check (status in ('registration', 'in_progress', 'completed')) default 'registration' not null,
  winner_id uuid references public.users(id),
  created_by uuid references public.users(id) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Tournament participants
create table public.tournament_participants (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade not null,
  player_id uuid references public.users(id) not null,
  seed integer,
  created_at timestamptz default now() not null,
  unique(tournament_id, player_id)
);

-- Tournament matches (links to regular matches)
create table public.tournament_matches (
  id uuid default uuid_generate_v4() primary key,
  tournament_id uuid references public.tournaments(id) on delete cascade not null,
  match_id uuid references public.matches(id) on delete cascade,
  round integer not null,
  position integer not null,
  player1_id uuid references public.users(id),
  player2_id uuid references public.users(id),
  winner_id uuid references public.users(id),
  created_at timestamptz default now() not null,
  unique(tournament_id, round, position)
);

-- Challenges table
create table public.challenges (
  id uuid default uuid_generate_v4() primary key,
  challenger_id uuid references public.users(id) not null,
  challenged_id uuid references public.users(id) not null,
  game_mode text check (game_mode in ('301', '501')) not null,
  status text check (status in ('pending', 'accepted', 'declined', 'expired')) default 'pending' not null,
  message text,
  created_at timestamptz default now() not null,
  expires_at timestamptz default (now() + interval '7 days') not null
);

-- Indexes for performance
create index idx_matches_status on public.matches(status);
create index idx_matches_winner on public.matches(winner_id);
create index idx_match_players_match on public.match_players(match_id);
create index idx_match_players_player on public.match_players(player_id);
create index idx_legs_match on public.legs(match_id);
create index idx_turns_leg on public.turns(leg_id);
create index idx_turns_player on public.turns(player_id);
create index idx_tournaments_status on public.tournaments(status);
create index idx_challenges_challenger on public.challenges(challenger_id);
create index idx_challenges_challenged on public.challenges(challenged_id);
create index idx_challenges_status on public.challenges(status);

-- Row Level Security (RLS) Policies
alter table public.users enable row level security;
alter table public.matches enable row level security;
alter table public.match_players enable row level security;
alter table public.legs enable row level security;
alter table public.turns enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_participants enable row level security;
alter table public.tournament_matches enable row level security;
alter table public.challenges enable row level security;

-- Users: Anyone can read, users can update their own profile
create policy "Users are viewable by everyone" on public.users for select using (true);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- Matches: Anyone can read, authenticated users can create
create policy "Matches are viewable by everyone" on public.matches for select using (true);
create policy "Authenticated users can create matches" on public.matches for insert with check (auth.role() = 'authenticated');
create policy "Match participants can update" on public.matches for update using (
  exists (
    select 1 from public.match_players
    where match_id = id and player_id = auth.uid()
  )
);

-- Match players: Anyone can read, authenticated users can create
create policy "Match players are viewable by everyone" on public.match_players for select using (true);
create policy "Authenticated users can create match players" on public.match_players for insert with check (auth.role() = 'authenticated');
create policy "Match participants can update" on public.match_players for update using (player_id = auth.uid());

-- Legs: Anyone can read, authenticated users can create
create policy "Legs are viewable by everyone" on public.legs for select using (true);
create policy "Authenticated users can create legs" on public.legs for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update legs" on public.legs for update using (auth.role() = 'authenticated');

-- Turns: Anyone can read, authenticated users can create
create policy "Turns are viewable by everyone" on public.turns for select using (true);
create policy "Authenticated users can create turns" on public.turns for insert with check (auth.role() = 'authenticated');
create policy "Players can delete their own turns" on public.turns for delete using (player_id = auth.uid());

-- Tournaments: Anyone can read, authenticated users can create
create policy "Tournaments are viewable by everyone" on public.tournaments for select using (true);
create policy "Authenticated users can create tournaments" on public.tournaments for insert with check (auth.role() = 'authenticated');
create policy "Tournament creator can update" on public.tournaments for update using (created_by = auth.uid());

-- Tournament participants: Anyone can read, authenticated users can join
create policy "Tournament participants are viewable by everyone" on public.tournament_participants for select using (true);
create policy "Authenticated users can join tournaments" on public.tournament_participants for insert with check (auth.role() = 'authenticated');

-- Tournament matches: Anyone can read
create policy "Tournament matches are viewable by everyone" on public.tournament_matches for select using (true);
create policy "Tournament creator can manage matches" on public.tournament_matches for all using (
  exists (
    select 1 from public.tournaments
    where id = tournament_id and created_by = auth.uid()
  )
);

-- Challenges: Users can see their own challenges
create policy "Users can see their challenges" on public.challenges for select using (
  challenger_id = auth.uid() or challenged_id = auth.uid()
);
create policy "Authenticated users can create challenges" on public.challenges for insert with check (auth.role() = 'authenticated' and challenger_id = auth.uid());
create policy "Challenged user can update challenge" on public.challenges for update using (challenged_id = auth.uid());

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_users_updated_at before update on public.users
  for each row execute procedure public.update_updated_at();

create trigger update_matches_updated_at before update on public.matches
  for each row execute procedure public.update_updated_at();

create trigger update_tournaments_updated_at before update on public.tournaments
  for each row execute procedure public.update_updated_at();
