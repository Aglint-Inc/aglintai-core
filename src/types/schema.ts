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
      ai_videos: {
        Row: {
          created_at: string
          error: Json | null
          file_url: string | null
          id: number
          video_id: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          error?: Json | null
          file_url?: string | null
          id?: number
          video_id?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          error?: Json | null
          file_url?: string | null
          id?: number
          video_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      candidates: {
        Row: {
          company: string | null
          created_at: string
          email: string
          embedding: string | null
          first_name: string
          id: string
          job_location: string | null
          job_title: string | null
          last_name: string | null
          linkedin: string | null
          phone: string | null
          profile_image: string | null
          recruiter_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          embedding?: string | null
          first_name: string
          id?: string
          job_location?: string | null
          job_title?: string | null
          last_name?: string | null
          linkedin?: string | null
          phone?: string | null
          profile_image?: string | null
          recruiter_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          embedding?: string | null
          first_name?: string
          id?: string
          job_location?: string | null
          job_title?: string | null
          last_name?: string | null
          linkedin?: string | null
          phone?: string | null
          profile_image?: string | null
          recruiter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
      }
      job_applications: {
        Row: {
          ai_interviewer_id: number | null
          api_status: string
          application_id: string
          candidate_id: string | null
          conversation: Json[] | null
          created_at: string
          emails: Json | null
          feedback: Json | null
          interview_duration: string | null
          interview_score: number
          interviewing_date: string | null
          jd_score: Json | null
          job_id: string
          json_resume: Json | null
          last_updated_at: string | null
          resume: string | null
          resume_score: number
          resume_text: string | null
          status: string | null
        }
        Insert: {
          ai_interviewer_id?: number | null
          api_status?: string
          application_id?: string
          candidate_id?: string | null
          conversation?: Json[] | null
          created_at?: string
          emails?: Json | null
          feedback?: Json | null
          interview_duration?: string | null
          interview_score?: number
          interviewing_date?: string | null
          jd_score?: Json | null
          job_id: string
          json_resume?: Json | null
          last_updated_at?: string | null
          resume?: string | null
          resume_score?: number
          resume_text?: string | null
          status?: string | null
        }
        Update: {
          ai_interviewer_id?: number | null
          api_status?: string
          application_id?: string
          candidate_id?: string | null
          conversation?: Json[] | null
          created_at?: string
          emails?: Json | null
          feedback?: Json | null
          interview_duration?: string | null
          interview_score?: number
          interviewing_date?: string | null
          jd_score?: Json | null
          job_id?: string
          json_resume?: Json | null
          last_updated_at?: string | null
          resume?: string | null
          resume_score?: number
          resume_text?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      lever_job_reference: {
        Row: {
          created_at: string
          id: number
          job_id: string
          last_synced_at: string | null
          posting_id: string
          recruiter_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          job_id: string
          last_synced_at?: string | null
          posting_id: string
          recruiter_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          job_id?: string
          last_synced_at?: string | null
          posting_id?: string
          recruiter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lever_job_reference_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lever_job_reference_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
      }
      lever_reference: {
        Row: {
          application_id: string
          created_at: string
          last_synced: string
          opportunity_id: string
          posting_id: string
          public_job_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          last_synced?: string
          opportunity_id: string
          posting_id: string
          public_job_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          last_synced?: string
          opportunity_id?: string
          posting_id?: string
          public_job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lever_reference_public_job_id_fkey"
            columns: ["public_job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      notify_me: {
        Row: {
          created_at: string | null
          email: string
          id: string
          job_id: string | null
          job_title: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          job_id?: string | null
          job_title?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          job_id?: string | null
          job_title?: string | null
        }
        Relationships: []
      }
      public_jobs: {
        Row: {
          active_status: Json
          company: string | null
          company_details: string | null
          created_at: string
          department: string | null
          description: string | null
          draft: Json | null
          email_template: Json
          embedding: string | null
          end_video: Json | null
          id: string
          intro_videos: Json | null
          is_campus: boolean
          jd_json: Json | null
          job_criteria: Json | null
          job_title: string | null
          job_type: string | null
          location: string | null
          logo: string | null
          new_screening_setting: Json
          overview: string | null
          parameter_weights: Json
          posted_by: string
          recruiter_id: string
          screening_questions: Json[] | null
          screening_setting: Json | null
          skills: string[] | null
          slug: string
          start_video: Json | null
          status: string
          updated_at: string | null
          video_assessment: boolean
          workplace_type: string | null
        }
        Insert: {
          active_status?: Json
          company?: string | null
          company_details?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          draft?: Json | null
          email_template?: Json
          embedding?: string | null
          end_video?: Json | null
          id?: string
          intro_videos?: Json | null
          is_campus?: boolean
          jd_json?: Json | null
          job_criteria?: Json | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          new_screening_setting?: Json
          overview?: string | null
          parameter_weights?: Json
          posted_by?: string
          recruiter_id: string
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          skills?: string[] | null
          slug?: string
          start_video?: Json | null
          status?: string
          updated_at?: string | null
          video_assessment?: boolean
          workplace_type?: string | null
        }
        Update: {
          active_status?: Json
          company?: string | null
          company_details?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          draft?: Json | null
          email_template?: Json
          embedding?: string | null
          end_video?: Json | null
          id?: string
          intro_videos?: Json | null
          is_campus?: boolean
          jd_json?: Json | null
          job_criteria?: Json | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          new_screening_setting?: Json
          overview?: string | null
          parameter_weights?: Json
          posted_by?: string
          recruiter_id?: string
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          skills?: string[] | null
          slug?: string
          start_video?: Json | null
          status?: string
          updated_at?: string | null
          video_assessment?: boolean
          workplace_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
      }
      recruiter: {
        Row: {
          ai_avatar: Json | null
          application_process: string | null
          audio_avatar_id: number
          available_roles: string[]
          benefits: string | null
          company_overview: string | null
          company_values: string | null
          company_website: string | null
          departments: string[]
          e_o_statement: string | null
          email: string | null
          email_template: Json
          employee_size: string | null
          employment_type: Json
          hr_contact: Json | null
          id: string
          industry: string | null
          lever_key: string | null
          logo: string | null
          m_v_statement: string | null
          name: string | null
          office_locations: Json[] | null
          phone_number: string | null
          primary_contact: Json | null
          recruiter_type: string | null
          roles: Json
          socials: Json | null
          technology_score: string[]
          video_assessment: boolean | null
          workplace_type: Json
        }
        Insert: {
          ai_avatar?: Json | null
          application_process?: string | null
          audio_avatar_id?: number
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          departments?: string[]
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employee_size?: string | null
          employment_type?: Json
          hr_contact?: Json | null
          id?: string
          industry?: string | null
          lever_key?: string | null
          logo?: string | null
          m_v_statement?: string | null
          name?: string | null
          office_locations?: Json[] | null
          phone_number?: string | null
          primary_contact?: Json | null
          recruiter_type?: string | null
          roles?: Json
          socials?: Json | null
          technology_score?: string[]
          video_assessment?: boolean | null
          workplace_type?: Json
        }
        Update: {
          ai_avatar?: Json | null
          application_process?: string | null
          audio_avatar_id?: number
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          departments?: string[]
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employee_size?: string | null
          employment_type?: Json
          hr_contact?: Json | null
          id?: string
          industry?: string | null
          lever_key?: string | null
          logo?: string | null
          m_v_statement?: string | null
          name?: string | null
          office_locations?: Json[] | null
          phone_number?: string | null
          primary_contact?: Json | null
          recruiter_type?: string | null
          roles?: Json
          socials?: Json | null
          technology_score?: string[]
          video_assessment?: boolean | null
          workplace_type?: Json
        }
        Relationships: []
      }
      recruiter_user: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          is_deactivated: boolean | null
          join_status: string
          joined_at: string | null
          last_name: string | null
          phone: string | null
          profile_image: string | null
          recruiter_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          is_deactivated?: boolean | null
          join_status?: string
          joined_at?: string | null
          last_name?: string | null
          phone?: string | null
          profile_image?: string | null
          recruiter_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          is_deactivated?: boolean | null
          join_status?: string
          joined_at?: string | null
          last_name?: string | null
          phone?: string | null
          profile_image?: string | null
          recruiter_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_user_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rp_logs: {
        Row: {
          application_id: string
          created_at: string
          id: number
          logs: Json
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: number
          logs?: Json
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: number
          logs?: Json
        }
        Relationships: []
      }
      rp_token_usage: {
        Row: {
          application_id: string
          created_at: string
          id: number
          task: string | null
          token_used_json: Json | null
          total_token_used: number | null
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: number
          task?: string | null
          token_used_json?: Json | null
          total_token_used?: number | null
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: number
          task?: string | null
          token_used_json?: Json | null
          total_token_used?: number | null
        }
        Relationships: []
      }
      support_groups: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_ids: string[]
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_ids?: string[]
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_ids?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "support_groups_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
      }
      support_ticket: {
        Row: {
          action_pending: Json
          application_id: string | null
          assign_to: string | null
          attachments: string[] | null
          company_id: string | null
          content: Json[]
          created_at: string | null
          email: string | null
          email_updates: boolean
          id: string
          idx: string
          job_id: string
          priority: string
          state: string
          support_group_id: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string | null
          user_name: string
        }
        Insert: {
          action_pending?: Json
          application_id?: string | null
          assign_to?: string | null
          attachments?: string[] | null
          company_id?: string | null
          content?: Json[]
          created_at?: string | null
          email?: string | null
          email_updates?: boolean
          id?: string
          idx?: string
          job_id: string
          priority?: string
          state?: string
          support_group_id?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id?: string | null
          user_name: string
        }
        Update: {
          action_pending?: Json
          application_id?: string | null
          assign_to?: string | null
          attachments?: string[] | null
          company_id?: string | null
          content?: Json[]
          created_at?: string | null
          email?: string | null
          email_updates?: boolean
          id?: string
          idx?: string
          job_id?: string
          priority?: string
          state?: string
          support_group_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      batchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      citext:
        | {
            Args: {
              "": boolean
            }
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      citext_hash: {
        Args: {
          "": string
        }
        Returns: number
      }
      citextin: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextout: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      citextrecv: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextsend: {
        Args: {
          "": string
        }
        Returns: string
      }
      get_combined_resume_score: {
        Args: {
          jd_data: Json
          parameter_weights: Json
        }
        Returns: number
      }
      get_present_scheduled_jobs: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      getjobapplications: {
        Args: {
          ids: string[]
        }
        Returns: {
          job_id: string
          status: string
          count: number
        }[]
      }
      interviewing_state_active: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      levercandidatesync: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      move_scheduled_jobs_sourcing_to_active: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_resume_score: {
        Args: {
          job_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
