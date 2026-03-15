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
      challenge_submissions: {
        Row: {
          age_confirmed: boolean | null
          created_at: string | null
          day_number: string | null
          email: string | null
          featured: boolean | null
          id: string
          ip_address: string | null
          name: string | null
          permission_granted: boolean | null
          what_joy_felt_like: string
          what_you_did: string
        }
        Insert: {
          age_confirmed?: boolean | null
          created_at?: string | null
          day_number?: string | null
          email?: string | null
          featured?: boolean | null
          id?: string
          ip_address?: string | null
          name?: string | null
          permission_granted?: boolean | null
          what_joy_felt_like: string
          what_you_did: string
        }
        Update: {
          age_confirmed?: boolean | null
          created_at?: string | null
          day_number?: string | null
          email?: string | null
          featured?: boolean | null
          id?: string
          ip_address?: string | null
          name?: string | null
          permission_granted?: boolean | null
          what_joy_felt_like?: string
          what_you_did?: string
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
          amount: number | null
          email: string
          id: string
          name: string | null
          price_type: string | null
          purchased_at: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount?: number | null
          email: string
          id?: string
          name?: string | null
          price_type?: string | null
          purchased_at?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount?: number | null
          email?: string
          id?: string
          name?: string | null
          price_type?: string | null
          purchased_at?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      extended_report_conversations: {
        Row: {
          abandonment_email_sent: boolean | null
          completed_at: string | null
          conversation_status: string
          created_at: string | null
          id: string
          messages: Json
          profile_id: string
          report_generated: boolean | null
          scoville_gate_triggered: boolean | null
          scoville_items: Json | null
          started_at: string | null
          updated_at: string | null
          user_email: string
          user_first_name: string | null
        }
        Insert: {
          abandonment_email_sent?: boolean | null
          completed_at?: string | null
          conversation_status?: string
          created_at?: string | null
          id?: string
          messages?: Json
          profile_id: string
          report_generated?: boolean | null
          scoville_gate_triggered?: boolean | null
          scoville_items?: Json | null
          started_at?: string | null
          updated_at?: string | null
          user_email: string
          user_first_name?: string | null
        }
        Update: {
          abandonment_email_sent?: boolean | null
          completed_at?: string | null
          conversation_status?: string
          created_at?: string | null
          id?: string
          messages?: Json
          profile_id?: string
          report_generated?: boolean | null
          scoville_gate_triggered?: boolean | null
          scoville_items?: Json | null
          started_at?: string | null
          updated_at?: string | null
          user_email?: string
          user_first_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extended_report_conversations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "quiz_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      nurture_emails: {
        Row: {
          created_at: string | null
          email_number: number
          id: string
          profile_id: string
          recipient_email: string
          recipient_name: string | null
          scheduled_at: string
          sent_at: string | null
          skip_reason: string | null
          skipped_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_number: number
          id?: string
          profile_id: string
          recipient_email: string
          recipient_name?: string | null
          scheduled_at: string
          sent_at?: string | null
          skip_reason?: string | null
          skipped_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_number?: number
          id?: string
          profile_id?: string
          recipient_email?: string
          recipient_name?: string | null
          scheduled_at?: string
          sent_at?: string | null
          skip_reason?: string | null
          skipped_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nurture_emails_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "quiz_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_profile_conversations: {
        Row: {
          completed_at: string | null
          conversation_id: string
          converted_to_profile: boolean | null
          created_at: string | null
          crisis_detected: boolean | null
          id: string
          ip_hash: string | null
          message_count: number | null
          messages: Json
          quadrant_explored: string | null
          started_at: string | null
        }
        Insert: {
          completed_at?: string | null
          conversation_id: string
          converted_to_profile?: boolean | null
          created_at?: string | null
          crisis_detected?: boolean | null
          id?: string
          ip_hash?: string | null
          message_count?: number | null
          messages?: Json
          quadrant_explored?: string | null
          started_at?: string | null
        }
        Update: {
          completed_at?: string | null
          conversation_id?: string
          converted_to_profile?: boolean | null
          created_at?: string | null
          crisis_detected?: boolean | null
          id?: string
          ip_hash?: string | null
          message_count?: number | null
          messages?: Json
          quadrant_explored?: string | null
          started_at?: string | null
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
          extended_report_paid: boolean | null
          gate_burdensomeness: boolean | null
          gate_numbing: boolean | null
          gate_overwhelm: boolean | null
          gate_safety: boolean | null
          health_data_consent: boolean | null
          health_data_consent_at: string | null
          id: string
          name: string
          nurture_unsubscribed: boolean | null
          nurture_unsubscribed_at: string | null
          paid_at: string | null
          primary_fire_type: string | null
          score_agency: number | null
          score_capacity: number | null
          score_community: number | null
          score_generativity: number | null
          score_validation: number | null
          scoville_gate_triggered: boolean | null
          scoville_items_flagged: string[] | null
          terms_accepted: boolean | null
          terms_accepted_at: string | null
        }
        Insert: {
          chronic_fire_type?: string | null
          created_at?: string
          email: string
          extended_report_paid?: boolean | null
          gate_burdensomeness?: boolean | null
          gate_numbing?: boolean | null
          gate_overwhelm?: boolean | null
          gate_safety?: boolean | null
          health_data_consent?: boolean | null
          health_data_consent_at?: string | null
          id?: string
          name: string
          nurture_unsubscribed?: boolean | null
          nurture_unsubscribed_at?: string | null
          paid_at?: string | null
          primary_fire_type?: string | null
          score_agency?: number | null
          score_capacity?: number | null
          score_community?: number | null
          score_generativity?: number | null
          score_validation?: number | null
          scoville_gate_triggered?: boolean | null
          scoville_items_flagged?: string[] | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
        }
        Update: {
          chronic_fire_type?: string | null
          created_at?: string
          email?: string
          extended_report_paid?: boolean | null
          gate_burdensomeness?: boolean | null
          gate_numbing?: boolean | null
          gate_overwhelm?: boolean | null
          gate_safety?: boolean | null
          health_data_consent?: boolean | null
          health_data_consent_at?: string | null
          id?: string
          name?: string
          nurture_unsubscribed?: boolean | null
          nurture_unsubscribed_at?: string | null
          paid_at?: string | null
          primary_fire_type?: string | null
          score_agency?: number | null
          score_capacity?: number | null
          score_community?: number | null
          score_generativity?: number | null
          score_validation?: number | null
          scoville_gate_triggered?: boolean | null
          scoville_items_flagged?: string[] | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extract_date: { Args: { ts: string }; Returns: string }
      process_nurture_queue: { Args: never; Returns: undefined }
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
