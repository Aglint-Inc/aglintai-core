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
      aggregated_data: {
        Row: {
          jsonb_agg: Json | null
        }
        Insert: {
          jsonb_agg?: Json | null
        }
        Update: {
          jsonb_agg?: Json | null
        }
        Relationships: []
      }
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
      candidate_search_history: {
        Row: {
          created_at: string
          id: number
          is_search_jd: boolean | null
          query_json: Json | null
          recruiter_id: string
          search_results: Json[] | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_search_jd?: boolean | null
          query_json?: Json | null
          recruiter_id: string
          search_results?: Json[] | null
        }
        Update: {
          created_at?: string
          id?: number
          is_search_jd?: boolean | null
          query_json?: Json | null
          recruiter_id?: string
          search_results?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_search_history_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
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
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      greenhouse_reference: {
        Row: {
          application_id: string
          created_at: string
          greenhouse_id: string
          id: number
          posting_id: string
          public_job_id: string
          resume: string | null
          resume_saved: boolean
        }
        Insert: {
          application_id: string
          created_at?: string
          greenhouse_id: string
          id?: number
          posting_id: string
          public_job_id: string
          resume?: string | null
          resume_saved?: boolean
        }
        Update: {
          application_id?: string
          created_at?: string
          greenhouse_id?: string
          id?: number
          posting_id?: string
          public_job_id?: string
          resume?: string | null
          resume_saved?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "greenhouse_reference_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["application_id"]
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
          education_embedding: string | null
          emails: Json | null
          experience_embedding: string | null
          feedback: Json | null
          interview_duration: string | null
          interview_score: number
          interviewing_date: string | null
          is_embedding: boolean
          jd_score: Json | null
          job_id: string | null
          json_resume: Json | null
          last_updated_at: string | null
          processed_at: string | null
          resume: string | null
          resume_embedding: string | null
          resume_score: number
          resume_text: string | null
          retry: number
          skills_embedding: string | null
          status: string | null
        }
        Insert: {
          ai_interviewer_id?: number | null
          api_status?: string
          application_id?: string
          candidate_id?: string | null
          conversation?: Json[] | null
          created_at?: string
          education_embedding?: string | null
          emails?: Json | null
          experience_embedding?: string | null
          feedback?: Json | null
          interview_duration?: string | null
          interview_score?: number
          interviewing_date?: string | null
          is_embedding?: boolean
          jd_score?: Json | null
          job_id?: string | null
          json_resume?: Json | null
          last_updated_at?: string | null
          processed_at?: string | null
          resume?: string | null
          resume_embedding?: string | null
          resume_score?: number
          resume_text?: string | null
          retry?: number
          skills_embedding?: string | null
          status?: string | null
        }
        Update: {
          ai_interviewer_id?: number | null
          api_status?: string
          application_id?: string
          candidate_id?: string | null
          conversation?: Json[] | null
          created_at?: string
          education_embedding?: string | null
          emails?: Json | null
          experience_embedding?: string | null
          feedback?: Json | null
          interview_duration?: string | null
          interview_score?: number
          interviewing_date?: string | null
          is_embedding?: boolean
          jd_score?: Json | null
          job_id?: string | null
          json_resume?: Json | null
          last_updated_at?: string | null
          processed_at?: string | null
          resume?: string | null
          resume_embedding?: string | null
          resume_score?: number
          resume_text?: string | null
          retry?: number
          skills_embedding?: string | null
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
          feedback: Json | null
          last_synced: string
          opportunity_id: string
          posting_id: string
          public_job_id: string
          stage: string | null
        }
        Insert: {
          application_id: string
          created_at?: string
          feedback?: Json | null
          last_synced?: string
          opportunity_id: string
          posting_id: string
          public_job_id: string
          stage?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string
          feedback?: Json | null
          last_synced?: string
          opportunity_id?: string
          posting_id?: string
          public_job_id?: string
          stage?: string | null
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
          interview_instructions: string | null
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
          interview_instructions?: string | null
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
          interview_instructions?: string | null
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
          assistant_id: string | null
          ats_familiar: string | null
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
          greenhouse_key: string | null
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
          recruiter_active: boolean | null
          recruiter_type: string | null
          recruiter_user_id: string | null
          roles: Json
          socials: Json | null
          technology_score: string[]
          use_of_purpose: Json | null
          video_assessment: boolean | null
          workplace_type: Json
        }
        Insert: {
          ai_avatar?: Json | null
          application_process?: string | null
          assistant_id?: string | null
          ats_familiar?: string | null
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
          greenhouse_key?: string | null
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
          recruiter_active?: boolean | null
          recruiter_type?: string | null
          recruiter_user_id?: string | null
          roles?: Json
          socials?: Json | null
          technology_score?: string[]
          use_of_purpose?: Json | null
          video_assessment?: boolean | null
          workplace_type?: Json
        }
        Update: {
          ai_avatar?: Json | null
          application_process?: string | null
          assistant_id?: string | null
          ats_familiar?: string | null
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
          greenhouse_key?: string | null
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
          recruiter_active?: boolean | null
          recruiter_type?: string | null
          recruiter_user_id?: string | null
          roles?: Json
          socials?: Json | null
          technology_score?: string[]
          use_of_purpose?: Json | null
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
      result: {
        Row: {
          jsonb_agg: Json | null
        }
        Insert: {
          jsonb_agg?: Json | null
        }
        Update: {
          jsonb_agg?: Json | null
        }
        Relationships: []
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
      threads: {
        Row: {
          assistant_id: string | null
          candidate_email: string | null
          candidate_name: string | null
          candidate_phone: string | null
          chat_end: boolean | null
          created_at: string
          id: number
          thread_id: string | null
        }
        Insert: {
          assistant_id?: string | null
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_phone?: string | null
          chat_end?: boolean | null
          created_at?: string
          id?: number
          thread_id?: string | null
        }
        Update: {
          assistant_id?: string | null
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_phone?: string | null
          chat_end?: boolean | null
          created_at?: string
          id?: number
          thread_id?: string | null
        }
        Relationships: []
      }
      weight_record: {
        Row: {
          jd_score: Json | null
          parameter_weights: Json | null
        }
        Insert: {
          jd_score?: Json | null
          parameter_weights?: Json | null
        }
        Update: {
          jd_score?: Json | null
          parameter_weights?: Json | null
        }
        Relationships: []
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
      calc_cosine_sim: {
        Args: {
          emb1: string
          emb2: string
        }
        Returns: {
          similarity: number
        }[]
      }
      calc_sim_score: {
        Args: {
          job_ids: string[]
          skill_qry_emb: string
          edu_qry_emb: string
          exp_qry_emb: string
          resume_qry_emb: string
          max_records?: number
          ts_query?: string
        }
        Returns: {
          application_id: string
          created_at: string
          first_name: string
          last_name: string
          job_title: string
          email: string
          resume_link: string
          json_resume: Json
          profile_image: string
          similarity: number
          sim_exp: number
          sim_res: number
          sim_skills: number
          sim_educ: number
        }[]
      }
      calculate_resume_score: {
        Args: {
          score_json: Json
          app_id: string
        }
        Returns: boolean
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
      embeddingresume: {
        Args: Record<PropertyKey, never>
        Returns: Json
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
      kw_match_documents: {
        Args: {
          query_text: string
          match_count: number
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
          json_resume: Json
        }[]
      }
      levercandidatesync: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: string
          content: string
          metadata: Json
          similarity: number
          json_resume: Json
        }[]
      }
      match_job_applications: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
          job_ids: string[]
        }
        Returns: {
          application_id: string
          first_name: string
          last_name: string
          job_title: string
          email: string
          json_resume: Json
          similarity: number
        }[]
      }
      move_scheduled_jobs_sourcing_to_active: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      overviewgenerate: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      retrybatchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      savegreenhouseresume: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      secondretrybatchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json
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
