export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string
          avatar_url: string | null
          elo: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          avatar_url?: string | null
          elo?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          avatar_url?: string | null
          elo?: number
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          game_mode: '301' | '501' | 'practice'
          legs_to_win: number
          sets_to_win: number
          winner_id: string | null
          is_ranked: boolean
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          game_mode: '301' | '501' | 'practice'
          legs_to_win?: number
          sets_to_win?: number
          winner_id?: string | null
          is_ranked?: boolean
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          game_mode?: '301' | '501' | 'practice'
          legs_to_win?: number
          sets_to_win?: number
          winner_id?: string | null
          is_ranked?: boolean
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      match_players: {
        Row: {
          id: string
          match_id: string
          player_id: string
          player_order: number
          legs_won: number
          sets_won: number
          elo_before: number
          elo_after: number | null
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          player_id: string
          player_order: number
          legs_won?: number
          sets_won?: number
          elo_before: number
          elo_after?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          player_id?: string
          player_order?: number
          legs_won?: number
          sets_won?: number
          elo_before?: number
          elo_after?: number | null
          created_at?: string
        }
      }
      legs: {
        Row: {
          id: string
          match_id: string
          leg_number: number
          set_number: number
          starting_score: number
          winner_id: string | null
          status: 'in_progress' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          match_id: string
          leg_number: number
          set_number?: number
          starting_score: number
          winner_id?: string | null
          status?: 'in_progress' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          match_id?: string
          leg_number?: number
          set_number?: number
          starting_score?: number
          winner_id?: string | null
          status?: 'in_progress' | 'completed'
          created_at?: string
        }
      }
      turns: {
        Row: {
          id: string
          leg_id: string
          player_id: string
          turn_number: number
          throw_1: number | null
          throw_2: number | null
          throw_3: number | null
          score: number
          remaining: number
          is_bust: boolean
          created_at: string
        }
        Insert: {
          id?: string
          leg_id: string
          player_id: string
          turn_number: number
          throw_1?: number | null
          throw_2?: number | null
          throw_3?: number | null
          score: number
          remaining: number
          is_bust?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          leg_id?: string
          player_id?: string
          turn_number?: number
          throw_1?: number | null
          throw_2?: number | null
          throw_3?: number | null
          score?: number
          remaining?: number
          is_bust?: boolean
          created_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          name: string
          format: 'single_elimination'
          size: 4 | 8 | 16
          status: 'registration' | 'in_progress' | 'completed'
          winner_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          format?: 'single_elimination'
          size: 4 | 8 | 16
          status?: 'registration' | 'in_progress' | 'completed'
          winner_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          format?: 'single_elimination'
          size?: 4 | 8 | 16
          status?: 'registration' | 'in_progress' | 'completed'
          winner_id?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      tournament_participants: {
        Row: {
          id: string
          tournament_id: string
          player_id: string
          seed: number | null
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          player_id: string
          seed?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          player_id?: string
          seed?: number | null
          created_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          challenger_id: string
          challenged_id: string
          game_mode: '301' | '501'
          status: 'pending' | 'accepted' | 'declined' | 'expired'
          message: string | null
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          challenger_id: string
          challenged_id: string
          game_mode: '301' | '501'
          status?: 'pending' | 'accepted' | 'declined' | 'expired'
          message?: string | null
          created_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          challenger_id?: string
          challenged_id?: string
          game_mode?: '301' | '501'
          status?: 'pending' | 'accepted' | 'declined' | 'expired'
          message?: string | null
          created_at?: string
          expires_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type MatchPlayer = Database['public']['Tables']['match_players']['Row']
export type Leg = Database['public']['Tables']['legs']['Row']
export type Turn = Database['public']['Tables']['turns']['Row']
export type Tournament = Database['public']['Tables']['tournaments']['Row']
export type Challenge = Database['public']['Tables']['challenges']['Row']
