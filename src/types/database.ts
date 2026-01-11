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
      players: {
        Row: {
          id: string
          name: string
          group: 'talli' | 'visitor'
          elo: number
          elo301: number
          elo501: number
          wins: number
          losses: number
          wins301: number
          losses301: number
          wins501: number
          losses501: number
          legs_won: number
          legs_lost: number
          one_eighties: number
          highest_checkout: number
          club: string
          entrance_song: string
          favorite_player: string
          darts_model: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          group?: 'talli' | 'visitor'
          elo?: number
          elo301?: number
          elo501?: number
          wins?: number
          losses?: number
          wins301?: number
          losses301?: number
          wins501?: number
          losses501?: number
          legs_won?: number
          legs_lost?: number
          one_eighties?: number
          highest_checkout?: number
          club?: string
          entrance_song?: string
          favorite_player?: string
          darts_model?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          group?: 'talli' | 'visitor'
          elo?: number
          elo301?: number
          elo501?: number
          wins?: number
          losses?: number
          wins301?: number
          losses301?: number
          wins501?: number
          losses501?: number
          legs_won?: number
          legs_lost?: number
          one_eighties?: number
          highest_checkout?: number
          club?: string
          entrance_song?: string
          favorite_player?: string
          darts_model?: string
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          player1_id: string
          player2_id: string
          player1_name: string
          player2_name: string
          winner_id: string
          winner_name: string
          player1_legs: number
          player2_legs: number
          player1_elo_change: number
          player2_elo_change: number
          player1_avg: number
          player2_avg: number
          player1_one_eighties: number
          player2_one_eighties: number
          game_mode: '301' | '501' | 'cricket'
          legs_to_win: number
          is_ranked: boolean
          highest_checkout: number
          played_at: string
        }
        Insert: {
          id: string
          player1_id: string
          player2_id: string
          player1_name: string
          player2_name: string
          winner_id: string
          winner_name: string
          player1_legs?: number
          player2_legs?: number
          player1_elo_change?: number
          player2_elo_change?: number
          player1_avg?: number
          player2_avg?: number
          player1_one_eighties?: number
          player2_one_eighties?: number
          game_mode: '301' | '501' | 'cricket'
          legs_to_win?: number
          is_ranked?: boolean
          highest_checkout?: number
          played_at?: string
        }
        Update: {
          id?: string
          player1_id?: string
          player2_id?: string
          player1_name?: string
          player2_name?: string
          winner_id?: string
          winner_name?: string
          player1_legs?: number
          player2_legs?: number
          player1_elo_change?: number
          player2_elo_change?: number
          player1_avg?: number
          player2_avg?: number
          player1_one_eighties?: number
          player2_one_eighties?: number
          game_mode?: '301' | '501' | 'cricket'
          legs_to_win?: number
          is_ranked?: boolean
          highest_checkout?: number
          played_at?: string
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
export type DbPlayer = Database['public']['Tables']['players']['Row']
export type DbMatch = Database['public']['Tables']['matches']['Row']
