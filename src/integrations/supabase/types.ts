export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      anonymous_responses: {
        Row: {
          completed_at: string
          id: string
          item_1: number | null
          item_10: number | null
          item_11: number | null
          item_12: number | null
          item_13: number | null
          item_14: number | null
          item_15: number | null
          item_16: number | null
          item_17: number | null
          item_18: number | null
          item_19: number | null
          item_2: number | null
          item_20: number | null
          item_21: number | null
          item_22: number | null
          item_23: number | null
          item_24: number | null
          item_25: number | null
          item_26: number | null
          item_27: number | null
          item_28: number | null
          item_29: number | null
          item_3: number | null
          item_30: string | null
          item_31: string | null
          item_32: string | null
          item_33: string | null
          item_34: string | null
          item_4: number | null
          item_5: number | null
          item_6: number | null
          item_7: number | null
          item_8: number | null
          item_9: number | null
        }
        Insert: {
          completed_at?: string
          id?: string
          item_1?: number | null
          item_10?: number | null
          item_11?: number | null
          item_12?: number | null
          item_13?: number | null
          item_14?: number | null
          item_15?: number | null
          item_16?: number | null
          item_17?: number | null
          item_18?: number | null
          item_19?: number | null
          item_2?: number | null
          item_20?: number | null
          item_21?: number | null
          item_22?: number | null
          item_23?: number | null
          item_24?: number | null
          item_25?: number | null
          item_26?: number | null
          item_27?: number | null
          item_28?: number | null
          item_29?: number | null
          item_3?: number | null
          item_30?: string | null
          item_31?: string | null
          item_32?: string | null
          item_33?: string | null
          item_34?: string | null
          item_4?: number | null
          item_5?: number | null
          item_6?: number | null
          item_7?: number | null
          item_8?: number | null
          item_9?: number | null
        }
        Update: {
          completed_at?: string
          id?: string
          item_1?: number | null
          item_10?: number | null
          item_11?: number | null
          item_12?: number | null
          item_13?: number | null
          item_14?: number | null
          item_15?: number | null
          item_16?: number | null
          item_17?: number | null
          item_18?: number | null
          item_19?: number | null
          item_2?: number | null
          item_20?: number | null
          item_21?: number | null
          item_22?: number | null
          item_23?: number | null
          item_24?: number | null
          item_25?: number | null
          item_26?: number | null
          item_27?: number | null
          item_28?: number | null
          item_29?: number | null
          item_3?: number | null
          item_30?: string | null
          item_31?: string | null
          item_32?: string | null
          item_33?: string | null
          item_34?: string | null
          item_4?: number | null
          item_5?: number | null
          item_6?: number | null
          item_7?: number | null
          item_8?: number | null
          item_9?: number | null
        }
        Relationships: []
      }
      book_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      extended_profile_purchases: {
        Row: {
          email: string
          id: string
          purchased_at: string
        }
        Insert: {
          email: string
          id?: string
          purchased_at?: string
        }
        Update: {
          email?: string
          id?: string
          purchased_at?: string
        }
        Relationships: []
      }
      quiz_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          session_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          chronic_fire_type: string | null
          created_at: string
          email: string
          gate_burdensomeness: boolean | null
          gate_numbing: boolean | null
          gate_overwhelm: boolean | null
          gate_safety: boolean | null
          id: string
          name: string
          primary_fire_type: string | null
          score_agency: number | null
          score_capacity: number | null
          score_community: number | null
          score_generativity: number | null
          score_validation: number | null
          scoville_gate_triggered: boolean | null
          scoville_items_flagged: string[] | null
        }
        Insert: {
          chronic_fire_type?: string | null
          created_at?: string
          email: string
          gate_burdensomeness?: boolean | null
          gate_numbing?: boolean | null
          gate_overwhelm?: boolean | null
          gate_safety?: boolean | null
          id?: string
          name: string
          primary_fire_type?: string | null
          score_agency?: number | null
          score_capacity?: number | null
          score_community?: number | null
          score_generativity?: number | null
          score_validation?: number | null
          scoville_gate_triggered?: boolean | null
          scoville_items_flagged?: string[] | null
        }
        Update: {
          chronic_fire_type?: string | null
          created_at?: string
          email?: string
          gate_burdensomeness?: boolean | null
          gate_numbing?: boolean | null
          gate_overwhelm?: boolean | null
          gate_safety?: boolean | null
          id?: string
          name?: string
          primary_fire_type?: string | null
          score_agency?: number | null
          score_capacity?: number | null
          score_community?: number | null
          score_generativity?: number | null
          score_validation?: number | null
          scoville_gate_triggered?: boolean | null
          scoville_items_flagged?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extract_date: { Args: { ts: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
