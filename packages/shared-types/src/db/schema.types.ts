export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      aglint_candidates: {
        Row: {
          aglint_id: string
          city: string | null
          country: string | null
          created_at: string
          departments: string[] | null
          email: string | null
          email_fetch_status: Database["public"]["Enums"]["email_fetch_status"]
          email_status: string | null
          employment_history: Json[] | null
          extrapolated_email_confidence: string | null
          facebook_url: string | null
          first_name: string | null
          functions: string[] | null
          github_url: string | null
          headline: string | null
          id: string
          intent_strength: string | null
          is_likely_to_engage: boolean | null
          last_name: string | null
          linkedin_url: string | null
          name: string | null
          organization: Json | null
          organization_id: string | null
          phone_numbers: Json | null
          photo_url: string | null
          revealed_for_current_team: boolean | null
          search_query: Json
          seniority: string | null
          show_intent: boolean | null
          state: string | null
          subdepartments: string[] | null
          title: string | null
          twitter_url: string | null
        }
        Insert: {
          aglint_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          departments?: string[] | null
          email?: string | null
          email_fetch_status?: Database["public"]["Enums"]["email_fetch_status"]
          email_status?: string | null
          employment_history?: Json[] | null
          extrapolated_email_confidence?: string | null
          facebook_url?: string | null
          first_name?: string | null
          functions?: string[] | null
          github_url?: string | null
          headline?: string | null
          id: string
          intent_strength?: string | null
          is_likely_to_engage?: boolean | null
          last_name?: string | null
          linkedin_url?: string | null
          name?: string | null
          organization?: Json | null
          organization_id?: string | null
          phone_numbers?: Json | null
          photo_url?: string | null
          revealed_for_current_team?: boolean | null
          search_query: Json
          seniority?: string | null
          show_intent?: boolean | null
          state?: string | null
          subdepartments?: string[] | null
          title?: string | null
          twitter_url?: string | null
        }
        Update: {
          aglint_id?: string
          city?: string | null
          country?: string | null
          created_at?: string
          departments?: string[] | null
          email?: string | null
          email_fetch_status?: Database["public"]["Enums"]["email_fetch_status"]
          email_status?: string | null
          employment_history?: Json[] | null
          extrapolated_email_confidence?: string | null
          facebook_url?: string | null
          first_name?: string | null
          functions?: string[] | null
          github_url?: string | null
          headline?: string | null
          id?: string
          intent_strength?: string | null
          is_likely_to_engage?: boolean | null
          last_name?: string | null
          linkedin_url?: string | null
          name?: string | null
          organization?: Json | null
          organization_id?: string | null
          phone_numbers?: Json | null
          photo_url?: string | null
          revealed_for_current_team?: boolean | null
          search_query?: Json
          seniority?: string | null
          show_intent?: boolean | null
          state?: string | null
          subdepartments?: string[] | null
          title?: string | null
          twitter_url?: string | null
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
      application_email_status: {
        Row: {
          application_id: string
          created_at: string
          email: Database["public"]["Enums"]["email_slack_types"]
          id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          email: Database["public"]["Enums"]["email_slack_types"]
          id?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          email?: Database["public"]["Enums"]["email_slack_types"]
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_email_status_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_email_status_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_logs: {
        Row: {
          application_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          logged_by: Database["public"]["Enums"]["application_logger"]
          metadata: Json | null
          module: Database["public"]["Enums"]["modules"]
          task_id: string | null
          title: string | null
        }
        Insert: {
          application_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          logged_by?: Database["public"]["Enums"]["application_logger"]
          metadata?: Json | null
          module?: Database["public"]["Enums"]["modules"]
          task_id?: string | null
          title?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          logged_by?: Database["public"]["Enums"]["application_logger"]
          metadata?: Json | null
          module?: Database["public"]["Enums"]["modules"]
          task_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_application_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_application_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_application_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_application_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_application_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_application_logs_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "new_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      application_reference: {
        Row: {
          ats_json: Json
          created_at: string
          id: number
          is_processed: boolean
          recruiter_id: string
        }
        Insert: {
          ats_json: Json
          created_at?: string
          id?: number
          is_processed?: boolean
          recruiter_id: string
        }
        Update: {
          ats_json?: Json
          created_at?: string
          id?: number
          is_processed?: boolean
          recruiter_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          applied_at: string
          assessment_id: string | null
          bookmarked: boolean
          candidate_file_id: string | null
          candidate_id: string | null
          converted_at: string | null
          created_at: string
          feedback: Json | null
          id: string
          is_new: boolean
          is_resume_fetching: boolean
          job_id: string
          overall_interview_score: number
          overall_score: number
          phone_screening: Json | null
          processing_status: Database["public"]["Enums"]["application_processing_status"]
          retry: number
          score_json: Json | null
          source: Database["public"]["Enums"]["application_source"]
          status: Database["public"]["Enums"]["application_status"]
          status_emails_sent: Json
        }
        Insert: {
          applied_at?: string
          assessment_id?: string | null
          bookmarked?: boolean
          candidate_file_id?: string | null
          candidate_id?: string | null
          converted_at?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          is_new?: boolean
          is_resume_fetching?: boolean
          job_id: string
          overall_interview_score?: number
          overall_score?: number
          phone_screening?: Json | null
          processing_status?: Database["public"]["Enums"]["application_processing_status"]
          retry?: number
          score_json?: Json | null
          source?: Database["public"]["Enums"]["application_source"]
          status?: Database["public"]["Enums"]["application_status"]
          status_emails_sent?: Json
        }
        Update: {
          applied_at?: string
          assessment_id?: string | null
          bookmarked?: boolean
          candidate_file_id?: string | null
          candidate_id?: string | null
          converted_at?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          is_new?: boolean
          is_resume_fetching?: boolean
          job_id?: string
          overall_interview_score?: number
          overall_score?: number
          phone_screening?: Json | null
          processing_status?: Database["public"]["Enums"]["application_processing_status"]
          retry?: number
          score_json?: Json | null
          source?: Database["public"]["Enums"]["application_source"]
          status?: Database["public"]["Enums"]["application_status"]
          status_emails_sent?: Json
        }
        Relationships: [
          {
            foreignKeyName: "applications_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_candidate_file_id_fkey"
            columns: ["candidate_file_id"]
            isOneToOne: false
            referencedRelation: "candidate_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level: Database["public"]["Enums"]["question_level"]
          mode: Database["public"]["Enums"]["assessment_mode"]
          recruiter_id: string
          title: string | null
          type: Database["public"]["Enums"]["template_type"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"]
          mode?: Database["public"]["Enums"]["assessment_mode"]
          recruiter_id: string
          title?: string | null
          type?: Database["public"]["Enums"]["template_type"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"]
          mode?: Database["public"]["Enums"]["assessment_mode"]
          recruiter_id?: string
          title?: string | null
          type?: Database["public"]["Enums"]["template_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_job_relation: {
        Row: {
          assessment_id: string
          created_at: string
          id: string
          job_id: string | null
        }
        Insert: {
          assessment_id: string
          created_at?: string
          id?: string
          job_id?: string | null
        }
        Update: {
          assessment_id?: string
          created_at?: string
          id?: string
          job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_job_relation_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_job_relation_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_question: {
        Row: {
          answer: Json | null
          assessment_id: string
          created_at: string
          description: Json | null
          duration: number | null
          id: string
          level: Database["public"]["Enums"]["question_level"] | null
          order: number
          parent_question_id: string | null
          question: Json | null
          required: boolean
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          answer?: Json | null
          assessment_id: string
          created_at?: string
          description?: Json | null
          duration?: number | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"] | null
          order?: number
          parent_question_id?: string | null
          question?: Json | null
          required?: boolean
          type?: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          answer?: Json | null
          assessment_id?: string
          created_at?: string
          description?: Json | null
          duration?: number | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"] | null
          order?: number
          parent_question_id?: string | null
          question?: Json | null
          required?: boolean
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "assessment_question_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assessment_question_parent_question_id_fkey"
            columns: ["parent_question_id"]
            isOneToOne: false
            referencedRelation: "question_bank"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          application_id: string
          assessment_id: string | null
          created_at: string
          duration: number | null
          id: string
          is_submitted: boolean | null
          responses: Json[] | null
          result: Json[] | null
        }
        Insert: {
          application_id: string
          assessment_id?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          is_submitted?: boolean | null
          responses?: Json[] | null
          result?: Json[] | null
        }
        Update: {
          application_id?: string
          assessment_id?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          is_submitted?: boolean | null
          responses?: Json[] | null
          result?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_template: {
        Row: {
          created_at: string
          description: string | null
          embeddings: string | null
          id: string
          level: Database["public"]["Enums"]["question_level"]
          mode: Database["public"]["Enums"]["assessment_mode"]
          title: string | null
          type: Database["public"]["Enums"]["template_type"] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          embeddings?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"]
          mode?: Database["public"]["Enums"]["assessment_mode"]
          title?: string | null
          type?: Database["public"]["Enums"]["template_type"] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          embeddings?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"]
          mode?: Database["public"]["Enums"]["assessment_mode"]
          title?: string | null
          type?: Database["public"]["Enums"]["template_type"] | null
        }
        Relationships: []
      }
      cancel_data: {
        Row: {
          row_to_json: Json | null
        }
        Insert: {
          row_to_json?: Json | null
        }
        Update: {
          row_to_json?: Json | null
        }
        Relationships: []
      }
      candidate_files: {
        Row: {
          candidate_id: string
          created_at: string
          education_embedding: string | null
          experience_embedding: string | null
          file_url: string | null
          id: string
          resume_embedding: string | null
          resume_json: Json | null
          resume_text: string | null
          skills_embedding: string | null
          type: Database["public"]["Enums"]["file_type"] | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          education_embedding?: string | null
          experience_embedding?: string | null
          file_url?: string | null
          id?: string
          resume_embedding?: string | null
          resume_json?: Json | null
          resume_text?: string | null
          skills_embedding?: string | null
          type?: Database["public"]["Enums"]["file_type"] | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          education_embedding?: string | null
          experience_embedding?: string | null
          file_url?: string | null
          id?: string
          resume_embedding?: string | null
          resume_json?: Json | null
          resume_text?: string | null
          skills_embedding?: string | null
          type?: Database["public"]["Enums"]["file_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_files_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_files_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_list: {
        Row: {
          candidates: string[]
          created_at: string
          id: string
          name: string
          recruiter_id: string
        }
        Insert: {
          candidates?: string[]
          created_at?: string
          id?: string
          name: string
          recruiter_id: string
        }
        Update: {
          candidates?: string[]
          created_at?: string
          id?: string
          name?: string
          recruiter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_list_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_request_availability: {
        Row: {
          application_id: string
          availability: Json | null
          booking_confirmed: boolean
          created_at: string
          date_range: Json | null
          id: string
          is_task_created: boolean | null
          number_of_days: number | null
          number_of_slots: number | null
          recruiter_id: string
          session_ids: Json | null
          slots: Json | null
          total_slots: number | null
          user_timezone: string | null
          visited: boolean | null
        }
        Insert: {
          application_id: string
          availability?: Json | null
          booking_confirmed?: boolean
          created_at?: string
          date_range?: Json | null
          id?: string
          is_task_created?: boolean | null
          number_of_days?: number | null
          number_of_slots?: number | null
          recruiter_id: string
          session_ids?: Json | null
          slots?: Json | null
          total_slots?: number | null
          user_timezone?: string | null
          visited?: boolean | null
        }
        Update: {
          application_id?: string
          availability?: Json | null
          booking_confirmed?: boolean
          created_at?: string
          date_range?: Json | null
          id?: string
          is_task_created?: boolean | null
          number_of_days?: number | null
          number_of_slots?: number | null
          recruiter_id?: string
          session_ids?: Json | null
          slots?: Json | null
          total_slots?: number | null
          user_timezone?: string | null
          visited?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_request_availability_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_request_availability_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_request_availability_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_search_history: {
        Row: {
          bookmarked_candidates: string[] | null
          candidates: string[]
          created_at: string
          db_search: Database["public"]["Enums"]["db_search_type"] | null
          id: number
          is_search_jd: boolean | null
          query_json: Json | null
          recruiter_id: string
          search_query: string | null
          search_results: Json[] | null
          used_credits: Json
        }
        Insert: {
          bookmarked_candidates?: string[] | null
          candidates?: string[]
          created_at?: string
          db_search?: Database["public"]["Enums"]["db_search_type"] | null
          id?: number
          is_search_jd?: boolean | null
          query_json?: Json | null
          recruiter_id: string
          search_query?: string | null
          search_results?: Json[] | null
          used_credits?: Json
        }
        Update: {
          bookmarked_candidates?: string[] | null
          candidates?: string[]
          created_at?: string
          db_search?: Database["public"]["Enums"]["db_search_type"] | null
          id?: number
          is_search_jd?: boolean | null
          query_json?: Json | null
          recruiter_id?: string
          search_query?: string | null
          search_results?: Json[] | null
          used_credits?: Json
        }
        Relationships: [
          {
            foreignKeyName: "candidate_search_history_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          avatar: string | null
          city: string | null
          country: string | null
          created_at: string
          current_company: string | null
          current_job_title: string | null
          email: string
          experience_in_months: number | null
          first_name: string
          geolocation: unknown | null
          id: string
          last_name: string | null
          last_updated: string
          linkedin: string | null
          phone: string | null
          recruiter_id: string | null
          state: string | null
          timezone: string | null
        }
        Insert: {
          avatar?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          current_company?: string | null
          current_job_title?: string | null
          email: string
          experience_in_months?: number | null
          first_name?: string
          geolocation?: unknown | null
          id?: string
          last_name?: string | null
          last_updated?: string
          linkedin?: string | null
          phone?: string | null
          recruiter_id?: string | null
          state?: string | null
          timezone?: string | null
        }
        Update: {
          avatar?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          current_company?: string | null
          current_job_title?: string | null
          email?: string
          experience_in_months?: number | null
          first_name?: string
          geolocation?: unknown | null
          id?: string
          last_name?: string | null
          last_updated?: string
          linkedin?: string | null
          phone?: string | null
          recruiter_id?: string | null
          state?: string | null
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      company_email_template: {
        Row: {
          body: string
          created_at: string
          from_name: string | null
          id: string
          recruiter_id: string
          subject: string
          type: Database["public"]["Enums"]["email_slack_types"]
        }
        Insert: {
          body: string
          created_at?: string
          from_name?: string | null
          id?: string
          recruiter_id?: string
          subject: string
          type: Database["public"]["Enums"]["email_slack_types"]
        }
        Update: {
          body?: string
          created_at?: string
          from_name?: string | null
          id?: string
          recruiter_id?: string
          subject?: string
          type?: Database["public"]["Enums"]["email_slack_types"]
        }
        Relationships: [
          {
            foreignKeyName: "company_email_template_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      company_search_cache: {
        Row: {
          company_name: string
          created_at: string
          id: string
          search_result: Json
          website_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          search_result: Json
          website_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          search_result?: Json
          website_url?: string | null
        }
        Relationships: []
      }
      env: {
        Row: {
          created_at: string
          id: number
          name: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          value?: string | null
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
        Relationships: []
      }
      integrations: {
        Row: {
          created_at: string
          domain_admin_email: string | null
          id: string
          recruiter_id: string
          schedule_agent_email: string | null
          service_json: string | null
          twilio_phone_number: string | null
        }
        Insert: {
          created_at?: string
          domain_admin_email?: string | null
          id?: string
          recruiter_id?: string
          schedule_agent_email?: string | null
          service_json?: string | null
          twilio_phone_number?: string | null
        }
        Update: {
          created_at?: string
          domain_admin_email?: string | null
          id?: string
          recruiter_id?: string
          schedule_agent_email?: string | null
          service_json?: string | null
          twilio_phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrations_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: true
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_filter_json: {
        Row: {
          confirmed_on: string | null
          created_at: string
          created_by: string | null
          filter_json: Json
          id: string
          schedule_id: string
          selected_options: Json[] | null
          session_ids: string[]
          viewed_on: string | null
        }
        Insert: {
          confirmed_on?: string | null
          created_at?: string
          created_by?: string | null
          filter_json: Json
          id?: string
          schedule_id: string
          selected_options?: Json[] | null
          session_ids?: string[]
          viewed_on?: string | null
        }
        Update: {
          confirmed_on?: string | null
          created_at?: string
          created_by?: string | null
          filter_json?: Json
          id?: string
          schedule_id?: string
          selected_options?: Json[] | null
          session_ids?: string[]
          viewed_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_filter_json_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_filter_json_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_filter_json_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_filter_json_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_meeting: {
        Row: {
          cal_event_id: string | null
          candidate_feedback: Json | null
          confirmed_date: string | null
          created_at: string
          end_time: string | null
          id: string
          instructions: string | null
          interview_schedule_id: string
          meeting_flow: Database["public"]["Enums"]["meeting_flow"]
          meeting_json: Json | null
          meeting_link: string | null
          organizer_id: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["interview_schedule_status"]
        }
        Insert: {
          cal_event_id?: string | null
          candidate_feedback?: Json | null
          confirmed_date?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          instructions?: string | null
          interview_schedule_id: string
          meeting_flow?: Database["public"]["Enums"]["meeting_flow"]
          meeting_json?: Json | null
          meeting_link?: string | null
          organizer_id?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["interview_schedule_status"]
        }
        Update: {
          cal_event_id?: string | null
          candidate_feedback?: Json | null
          confirmed_date?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          instructions?: string | null
          interview_schedule_id?: string
          meeting_flow?: Database["public"]["Enums"]["meeting_flow"]
          meeting_json?: Json | null
          meeting_link?: string | null
          organizer_id?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["interview_schedule_status"]
        }
        Relationships: [
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_meeting_interview_schedule_id_fkey"
            columns: ["interview_schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_module: {
        Row: {
          created_at: string
          created_by: string | null
          department: string | null
          description: string | null
          duration_available: Json | null
          id: string
          instructions: string | null
          is_archived: boolean
          name: string
          recruiter_id: string
          settings: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          duration_available?: Json | null
          id?: string
          instructions?: string | null
          is_archived?: boolean
          name: string
          recruiter_id: string
          settings?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          duration_available?: Json | null
          id?: string
          instructions?: string | null
          is_archived?: boolean
          name?: string
          recruiter_id?: string
          settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_panel_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_module_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_module_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_module_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      interview_module_relation: {
        Row: {
          id: string
          module_id: string
          pause_json: Json | null
          training_status: Database["public"]["Enums"]["status_training"]
          user_id: string
        }
        Insert: {
          id?: string
          module_id: string
          pause_json?: Json | null
          training_status?: Database["public"]["Enums"]["status_training"]
          user_id: string
        }
        Update: {
          id?: string
          module_id?: string
          pause_json?: Json | null
          training_status?: Database["public"]["Enums"]["status_training"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_panel_relation_panel_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "interview_module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_module_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_module_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_module_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      interview_plan: {
        Row: {
          created_at: string
          id: string
          job_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_plan_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: true
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_schedule: {
        Row: {
          application_id: string
          calender_event_api_status: Json | null
          coordinator_id: string | null
          created_at: string
          created_by: string
          id: string
          is_completed: boolean
          is_get_more_option: boolean
          recruiter_id: string
          schedule_name: string
        }
        Insert: {
          application_id: string
          calender_event_api_status?: Json | null
          coordinator_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_completed?: boolean
          is_get_more_option?: boolean
          recruiter_id: string
          schedule_name: string
        }
        Update: {
          application_id?: string
          calender_event_api_status?: Json | null
          coordinator_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_completed?: boolean
          is_get_more_option?: boolean
          recruiter_id?: string
          schedule_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedule_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_schedule_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_schedule_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_schedule_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_session: {
        Row: {
          break_duration: number | null
          created_at: string
          id: string
          interview_plan_id: string | null
          interviewer_cnt: number | null
          location: string | null
          meeting_id: string | null
          members_meta: Json
          module_id: string | null
          name: string | null
          schedule_type: Database["public"]["Enums"]["interview_schedule_type"]
          session_duration: number
          session_order: number
          session_type: Database["public"]["Enums"]["session_type"]
        }
        Insert: {
          break_duration?: number | null
          created_at?: string
          id?: string
          interview_plan_id?: string | null
          interviewer_cnt?: number | null
          location?: string | null
          meeting_id?: string | null
          members_meta?: Json
          module_id?: string | null
          name?: string | null
          schedule_type?: Database["public"]["Enums"]["interview_schedule_type"]
          session_duration?: number
          session_order?: number
          session_type?: Database["public"]["Enums"]["session_type"]
        }
        Update: {
          break_duration?: number | null
          created_at?: string
          id?: string
          interview_plan_id?: string | null
          interviewer_cnt?: number | null
          location?: string | null
          meeting_id?: string | null
          members_meta?: Json
          module_id?: string | null
          name?: string | null
          schedule_type?: Database["public"]["Enums"]["interview_schedule_type"]
          session_duration?: number
          session_order?: number
          session_type?: Database["public"]["Enums"]["session_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_session_interview_plan_id_fkey"
            columns: ["interview_plan_id"]
            isOneToOne: false
            referencedRelation: "interview_plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "interview_meeting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meeting_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "interview_module"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_session_cancel: {
        Row: {
          cancel_user_id: string | null
          created_at: string
          id: string
          is_ignored: boolean
          is_resolved: boolean
          other_details: Json | null
          reason: string
          schedule_id: string | null
          session_id: string
          session_relation_id: string | null
          type: Database["public"]["Enums"]["cancel_type"]
        }
        Insert: {
          cancel_user_id?: string | null
          created_at?: string
          id?: string
          is_ignored?: boolean
          is_resolved?: boolean
          other_details?: Json | null
          reason: string
          schedule_id?: string | null
          session_id: string
          session_relation_id?: string | null
          type?: Database["public"]["Enums"]["cancel_type"]
        }
        Update: {
          cancel_user_id?: string | null
          created_at?: string
          id?: string
          is_ignored?: boolean
          is_resolved?: boolean
          other_details?: Json | null
          reason?: string
          schedule_id?: string | null
          session_id?: string
          session_relation_id?: string | null
          type?: Database["public"]["Enums"]["cancel_type"]
        }
        Relationships: [
          {
            foreignKeyName: "interview_session_cancel_cancel_user_id_fkey"
            columns: ["cancel_user_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_cancel_user_id_fkey"
            columns: ["cancel_user_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_cancel_user_id_fkey"
            columns: ["cancel_user_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "interview_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "meeting_details"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_relation_id_fkey"
            columns: ["session_relation_id"]
            isOneToOne: false
            referencedRelation: "interview_session_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_session_cancel_session_relation_id_fkey"
            columns: ["session_relation_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["session_relation_id"]
          },
        ]
      }
      interview_session_relation: {
        Row: {
          accepted_status: Database["public"]["Enums"]["session_accepted_status"]
          feedback: Json | null
          id: string
          interview_module_relation_id: string | null
          interviewer_type: Database["public"]["Enums"]["status_training"]
          is_confirmed: boolean
          session_id: string
          training_type: Database["public"]["Enums"]["interviewer_type"] | null
          user_id: string | null
        }
        Insert: {
          accepted_status?: Database["public"]["Enums"]["session_accepted_status"]
          feedback?: Json | null
          id?: string
          interview_module_relation_id?: string | null
          interviewer_type?: Database["public"]["Enums"]["status_training"]
          is_confirmed?: boolean
          session_id: string
          training_type?: Database["public"]["Enums"]["interviewer_type"] | null
          user_id?: string | null
        }
        Update: {
          accepted_status?: Database["public"]["Enums"]["session_accepted_status"]
          feedback?: Json | null
          id?: string
          interview_module_relation_id?: string | null
          interviewer_type?: Database["public"]["Enums"]["status_training"]
          is_confirmed?: boolean
          session_id?: string
          training_type?: Database["public"]["Enums"]["interviewer_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_session_relation_interview_module_relation_id_"
            columns: ["interview_module_relation_id"]
            isOneToOne: false
            referencedRelation: "interview_module_relation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_session_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_interview_session_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_inteview_session_relation_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_inteview_session_relation_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "interview_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_inteview_session_relation_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "meeting_details"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_inteview_session_relation_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["session_id"]
          },
        ]
      }
      job_assiatan_chat: {
        Row: {
          created_at: string
          id: string
          job_id: string
          last_message: string | null
          name: string | null
          thread_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          last_message?: string | null
          name?: string | null
          thread_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          last_message?: string | null
          name?: string | null
          thread_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_assiatan_chat_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_assiatan_chat_messages: {
        Row: {
          content: Json
          created_at: string
          id: number
          job_assiatan_chat_id: string
          message_id: string
          sender: string
          type: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: number
          job_assiatan_chat_id: string
          message_id: string
          sender: string
          type: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: number
          job_assiatan_chat_id?: string
          message_id?: string
          sender?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_assiatan_chat_messages_job_assiatan_chat_id_fkey"
            columns: ["job_assiatan_chat_id"]
            isOneToOne: false
            referencedRelation: "job_assiatan_chat"
            referencedColumns: ["id"]
          },
        ]
      }
      job_reference: {
        Row: {
          ats: string | null
          ats_job_id: string
          ats_json: Json | null
          created_at: string
          id: number
          public_job_id: string
          recruiter_id: string
        }
        Insert: {
          ats?: string | null
          ats_job_id: string
          ats_json?: Json | null
          created_at?: string
          id?: number
          public_job_id: string
          recruiter_id: string
        }
        Update: {
          ats?: string | null
          ats_job_id?: string
          ats_json?: Json | null
          created_at?: string
          id?: number
          public_job_id?: string
          recruiter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_reference_public_job_id_fkey"
            columns: ["public_job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_reference_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
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
          },
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
          },
        ]
      }
      new_tasks: {
        Row: {
          agent: Database["public"]["Enums"]["task_agent_type"] | null
          application_id: string | null
          assignee: string[]
          created_at: string
          created_by: string
          due_date: string | null
          filter_id: string | null
          id: string
          name: string
          priority: Database["public"]["Enums"]["task_priority"]
          recruiter_id: string | null
          request_availability_id: string | null
          schedule_date_range: Json | null
          session_ids: Json[] | null
          start_date: string | null
          status: Database["public"]["Enums"]["task_status"]
          task_action: Json | null
          task_owner: string | null
          trigger_count: number
          type: Database["public"]["Enums"]["task_type_enum"] | null
        }
        Insert: {
          agent?: Database["public"]["Enums"]["task_agent_type"] | null
          application_id?: string | null
          assignee: string[]
          created_at?: string
          created_by: string
          due_date?: string | null
          filter_id?: string | null
          id?: string
          name: string
          priority?: Database["public"]["Enums"]["task_priority"]
          recruiter_id?: string | null
          request_availability_id?: string | null
          schedule_date_range?: Json | null
          session_ids?: Json[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_action?: Json | null
          task_owner?: string | null
          trigger_count?: number
          type?: Database["public"]["Enums"]["task_type_enum"] | null
        }
        Update: {
          agent?: Database["public"]["Enums"]["task_agent_type"] | null
          application_id?: string | null
          assignee?: string[]
          created_at?: string
          created_by?: string
          due_date?: string | null
          filter_id?: string | null
          id?: string
          name?: string
          priority?: Database["public"]["Enums"]["task_priority"]
          recruiter_id?: string | null
          request_availability_id?: string | null
          schedule_date_range?: Json | null
          session_ids?: Json[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          task_action?: Json | null
          task_owner?: string | null
          trigger_count?: number
          type?: Database["public"]["Enums"]["task_type_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "new_tasks_request_availability_id_fkey"
            columns: ["request_availability_id"]
            isOneToOne: false
            referencedRelation: "candidate_request_availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_new_tasks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_new_tasks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_new_tasks_cretaed_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_new_tasks_cretaed_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_new_tasks_cretaed_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_new_tasks_filter_id_fkey"
            columns: ["filter_id"]
            isOneToOne: false
            referencedRelation: "interview_filter_json"
            referencedColumns: ["id"]
          },
        ]
      }
      new_tasks_progress: {
        Row: {
          created_at: string
          created_by: Json
          id: string
          jsonb_data: Json | null
          progress_type: Database["public"]["Enums"]["progress_type"]
          task_id: string
          title: string
          title_meta: Json | null
        }
        Insert: {
          created_at?: string
          created_by: Json
          id?: string
          jsonb_data?: Json | null
          progress_type?: Database["public"]["Enums"]["progress_type"]
          task_id: string
          title: string
          title_meta?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: Json
          id?: string
          jsonb_data?: Json | null
          progress_type?: Database["public"]["Enums"]["progress_type"]
          task_id?: string
          title?: string
          title_meta?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_new_tasks_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "new_tasks"
            referencedColumns: ["id"]
          },
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
      outreached_emails: {
        Row: {
          candidate_id: string
          email: Json
          email_sent: boolean
          id: number
          recruiter_user_id: string
        }
        Insert: {
          candidate_id: string
          email?: Json
          email_sent?: boolean
          id?: number
          recruiter_user_id: string
        }
        Update: {
          candidate_id?: string
          email?: Json
          email_sent?: boolean
          id?: number
          recruiter_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outreached_emails_recruiter_user_id_fkey"
            columns: ["recruiter_user_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "outreached_emails_recruiter_user_id_fkey"
            columns: ["recruiter_user_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "outreached_emails_recruiter_user_id_fkey"
            columns: ["recruiter_user_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          id: number
          is_enable: boolean | null
          name: Database["public"]["Enums"]["permissions_type"]
          recruiter_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_enable?: boolean | null
          name: Database["public"]["Enums"]["permissions_type"]
          recruiter_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_enable?: boolean | null
          name?: Database["public"]["Enums"]["permissions_type"]
          recruiter_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      public_jobs: {
        Row: {
          active_status: Json
          assessment: boolean | null
          company: string | null
          company_details: string | null
          created_at: string
          department: string | null
          description: string | null
          description_hash: number
          draft: Json | null
          email_template: Json
          end_video: Json | null
          experience_in_months: number | null
          hiring_manager: string | null
          id: string
          interview_coordinator: string | null
          interview_instructions: string | null
          interview_plan: Json | null
          interview_success: string | null
          intro_videos: Json | null
          is_ats_sync: boolean
          jd_changed: boolean | null
          jd_json: Json | null
          job_criteria: Json | null
          job_details_embedding: string | null
          job_title: string | null
          job_type: Database["public"]["Enums"]["public_job_type"] | null
          location: string | null
          location_json: Json | null
          logo: string | null
          new_screening_setting: Json
          overview: string | null
          parameter_weights: Json
          phone_screen_enabled: boolean | null
          phone_screening: Json | null
          posted_by: string
          recruiter: string | null
          recruiter_id: string
          recruiting_coordinator: string | null
          scoring_criteria_loading: boolean
          scoring_param_status:
            | Database["public"]["Enums"]["job_scoring_param_status"]
            | null
          screening_questions: Json[] | null
          screening_setting: Json | null
          screening_template: string | null
          skills: string[] | null
          slug: string
          sourcer: string | null
          start_video: Json | null
          status: Database["public"]["Enums"]["public_job_status"]
          updated_at: string | null
          video_assessment: boolean
          workplace_type:
            | Database["public"]["Enums"]["public_job_workplace"]
            | null
        }
        Insert: {
          active_status?: Json
          assessment?: boolean | null
          company?: string | null
          company_details?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          description_hash?: number
          draft?: Json | null
          email_template?: Json
          end_video?: Json | null
          experience_in_months?: number | null
          hiring_manager?: string | null
          id?: string
          interview_coordinator?: string | null
          interview_instructions?: string | null
          interview_plan?: Json | null
          interview_success?: string | null
          intro_videos?: Json | null
          is_ats_sync?: boolean
          jd_changed?: boolean | null
          jd_json?: Json | null
          job_criteria?: Json | null
          job_details_embedding?: string | null
          job_title?: string | null
          job_type?: Database["public"]["Enums"]["public_job_type"] | null
          location?: string | null
          location_json?: Json | null
          logo?: string | null
          new_screening_setting?: Json
          overview?: string | null
          parameter_weights?: Json
          phone_screen_enabled?: boolean | null
          phone_screening?: Json | null
          posted_by?: string
          recruiter?: string | null
          recruiter_id: string
          recruiting_coordinator?: string | null
          scoring_criteria_loading?: boolean
          scoring_param_status?:
            | Database["public"]["Enums"]["job_scoring_param_status"]
            | null
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          screening_template?: string | null
          skills?: string[] | null
          slug?: string
          sourcer?: string | null
          start_video?: Json | null
          status?: Database["public"]["Enums"]["public_job_status"]
          updated_at?: string | null
          video_assessment?: boolean
          workplace_type?:
            | Database["public"]["Enums"]["public_job_workplace"]
            | null
        }
        Update: {
          active_status?: Json
          assessment?: boolean | null
          company?: string | null
          company_details?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          description_hash?: number
          draft?: Json | null
          email_template?: Json
          end_video?: Json | null
          experience_in_months?: number | null
          hiring_manager?: string | null
          id?: string
          interview_coordinator?: string | null
          interview_instructions?: string | null
          interview_plan?: Json | null
          interview_success?: string | null
          intro_videos?: Json | null
          is_ats_sync?: boolean
          jd_changed?: boolean | null
          jd_json?: Json | null
          job_criteria?: Json | null
          job_details_embedding?: string | null
          job_title?: string | null
          job_type?: Database["public"]["Enums"]["public_job_type"] | null
          location?: string | null
          location_json?: Json | null
          logo?: string | null
          new_screening_setting?: Json
          overview?: string | null
          parameter_weights?: Json
          phone_screen_enabled?: boolean | null
          phone_screening?: Json | null
          posted_by?: string
          recruiter?: string | null
          recruiter_id?: string
          recruiting_coordinator?: string | null
          scoring_criteria_loading?: boolean
          scoring_param_status?:
            | Database["public"]["Enums"]["job_scoring_param_status"]
            | null
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          screening_template?: string | null
          skills?: string[] | null
          slug?: string
          sourcer?: string | null
          start_video?: Json | null
          status?: Database["public"]["Enums"]["public_job_status"]
          updated_at?: string | null
          video_assessment?: boolean
          workplace_type?:
            | Database["public"]["Enums"]["public_job_workplace"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "public_jobs_hiring_manager_fkey"
            columns: ["hiring_manager"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_hiring_manager_fkey"
            columns: ["hiring_manager"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_hiring_manager_fkey"
            columns: ["hiring_manager"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_interview_coordinator_fkey"
            columns: ["interview_coordinator"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_interview_coordinator_fkey"
            columns: ["interview_coordinator"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_interview_coordinator_fkey"
            columns: ["interview_coordinator"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiter_fkey"
            columns: ["recruiter"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiter_fkey"
            columns: ["recruiter"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiter_fkey"
            columns: ["recruiter"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_jobs_recruiting_coordinator_fkey"
            columns: ["recruiting_coordinator"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiting_coordinator_fkey"
            columns: ["recruiting_coordinator"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_recruiting_coordinator_fkey"
            columns: ["recruiting_coordinator"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_sourcer_fkey"
            columns: ["sourcer"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_sourcer_fkey"
            columns: ["sourcer"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_jobs_sourcer_fkey"
            columns: ["sourcer"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_public_jobs_screening_template_fkey"
            columns: ["screening_template"]
            isOneToOne: false
            referencedRelation: "screening_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_bank: {
        Row: {
          answer: Json | null
          created_at: string
          description: Json | null
          duration: number | null
          embeddings: string | null
          id: string
          level: Database["public"]["Enums"]["question_level"] | null
          question: Json | null
          required: boolean
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          answer?: Json | null
          created_at?: string
          description?: Json | null
          duration?: number | null
          embeddings?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"] | null
          question?: Json | null
          required?: boolean
          type?: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          answer?: Json | null
          created_at?: string
          description?: Json | null
          duration?: number | null
          embeddings?: string | null
          id?: string
          level?: Database["public"]["Enums"]["question_level"] | null
          question?: Json | null
          required?: boolean
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: []
      }
      recruiter: {
        Row: {
          ai_avatar: Json | null
          application_process: string | null
          ashby_key: string | null
          ashby_last_synced: string | null
          ashby_sync_token: string | null
          assistant_id: string | null
          ats_familiar: string | null
          audio_avatar_id: number
          available_roles: string[]
          benefits: string | null
          company_overview: string | null
          company_values: string | null
          company_website: string | null
          created_at: string
          departments: string[]
          domain_admin_email: string | null
          e_o_statement: string | null
          email: string | null
          email_template: Json
          employee_size: string | null
          employment_type: Json
          google_workspace_domain: string | null
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
          scheduling_reason: Json | null
          scheduling_settings: Json | null
          service_json: string | null
          socials: Json | null
          technology_score: string[]
          use_of_purpose: Json | null
          video_assessment: boolean | null
          workplace_type: Json
          zoom_auth: string | null
        }
        Insert: {
          ai_avatar?: Json | null
          application_process?: string | null
          ashby_key?: string | null
          ashby_last_synced?: string | null
          ashby_sync_token?: string | null
          assistant_id?: string | null
          ats_familiar?: string | null
          audio_avatar_id?: number
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          created_at?: string
          departments?: string[]
          domain_admin_email?: string | null
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employee_size?: string | null
          employment_type?: Json
          google_workspace_domain?: string | null
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
          scheduling_reason?: Json | null
          scheduling_settings?: Json | null
          service_json?: string | null
          socials?: Json | null
          technology_score?: string[]
          use_of_purpose?: Json | null
          video_assessment?: boolean | null
          workplace_type?: Json
          zoom_auth?: string | null
        }
        Update: {
          ai_avatar?: Json | null
          application_process?: string | null
          ashby_key?: string | null
          ashby_last_synced?: string | null
          ashby_sync_token?: string | null
          assistant_id?: string | null
          ats_familiar?: string | null
          audio_avatar_id?: number
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          created_at?: string
          departments?: string[]
          domain_admin_email?: string | null
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employee_size?: string | null
          employment_type?: Json
          google_workspace_domain?: string | null
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
          scheduling_reason?: Json | null
          scheduling_settings?: Json | null
          service_json?: string | null
          socials?: Json | null
          technology_score?: string[]
          use_of_purpose?: Json | null
          video_assessment?: boolean | null
          workplace_type?: Json
          zoom_auth?: string | null
        }
        Relationships: []
      }
      recruiter_relation: {
        Row: {
          created_at: string
          created_by: string
          id: number
          is_active: boolean
          manager_id: string | null
          recruiter_id: string
          role: Database["public"]["Enums"]["user_roles"]
          role_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: number
          is_active?: boolean
          manager_id?: string | null
          recruiter_id: string
          role: Database["public"]["Enums"]["user_roles"]
          role_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
          is_active?: boolean
          manager_id?: string | null
          recruiter_id?: string
          role?: Database["public"]["Enums"]["user_roles"]
          role_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_recruiter_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_recruiter_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_recruiter_relation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recruiter_relation_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_relation_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recruiter_relation_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recruiter_relation_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recruiter_relation_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_relation_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      recruiter_user: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          email_auth: Json | null
          email_outreach_templates: Json[] | null
          employment: Database["public"]["Enums"]["employment_type_enum"]
          first_name: string | null
          interview_location: string | null
          is_suspended: boolean
          join_status: string
          joined_at: string | null
          last_name: string | null
          linked_in: string | null
          phone: string | null
          position: string | null
          profile_image: string | null
          schedule_auth: Json | null
          scheduling_settings: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          email_auth?: Json | null
          email_outreach_templates?: Json[] | null
          employment?: Database["public"]["Enums"]["employment_type_enum"]
          first_name?: string | null
          interview_location?: string | null
          is_suspended?: boolean
          join_status?: string
          joined_at?: string | null
          last_name?: string | null
          linked_in?: string | null
          phone?: string | null
          position?: string | null
          profile_image?: string | null
          schedule_auth?: Json | null
          scheduling_settings?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          email_auth?: Json | null
          email_outreach_templates?: Json[] | null
          employment?: Database["public"]["Enums"]["employment_type_enum"]
          first_name?: string | null
          interview_location?: string | null
          is_suspended?: boolean
          join_status?: string
          joined_at?: string | null
          last_name?: string | null
          linked_in?: string | null
          phone?: string | null
          position?: string | null
          profile_image?: string | null
          schedule_auth?: Json | null
          scheduling_settings?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      request_integration_tool: {
        Row: {
          created_at: string
          description: string | null
          id: number
          recruiter_id: string | null
          tool_name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          recruiter_id?: string | null
          tool_name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          recruiter_id?: string | null
          tool_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_request_integration_tool_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          permission_id: number
          recruiter_id: string
          role_id: string
        }
        Insert: {
          permission_id: number
          recruiter_id: string
          role_id: string
        }
        Update: {
          permission_id?: number
          recruiter_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
          recruiter_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          recruiter_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          recruiter_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
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
      "scheduling-agent-chat-history": {
        Row: {
          agent_processing: boolean
          application_id: string | null
          chat_history: Json[]
          company_id: string | null
          created_at: string
          email_from_name: string
          email_subject: string
          filter_json_id: string
          job_id: string
          task_id: string | null
          thread_id: string
        }
        Insert: {
          agent_processing?: boolean
          application_id?: string | null
          chat_history?: Json[]
          company_id?: string | null
          created_at?: string
          email_from_name: string
          email_subject: string
          filter_json_id: string
          job_id: string
          task_id?: string | null
          thread_id: string
        }
        Update: {
          agent_processing?: boolean
          application_id?: string | null
          chat_history?: Json[]
          company_id?: string | null
          created_at?: string
          email_from_name?: string
          email_subject?: string
          filter_json_id?: string
          job_id?: string
          task_id?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_scheduling-agent-chat-history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_scheduling-agent-chat-history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_scheduling-agent-chat-history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_scheduling-agent-chat-history_filter_json_id_fkey"
            columns: ["filter_json_id"]
            isOneToOne: true
            referencedRelation: "interview_filter_json"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_scheduling-agent-chat-history_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_scheduling-agent-chat-history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "new_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_answers: {
        Row: {
          answers: Json
          created_at: string
          screening_id: string
        }
        Insert: {
          answers: Json
          created_at?: string
          screening_id?: string
        }
        Update: {
          answers?: Json
          created_at?: string
          screening_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_screening_answers_screening_id_fkey"
            columns: ["screening_id"]
            isOneToOne: true
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_screening_answers_screening_id_fkey"
            columns: ["screening_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_questions: {
        Row: {
          created_at: string
          id: string
          questions: Json
          recruiter_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          questions: Json
          recruiter_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          questions?: Json
          recruiter_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_screening_questions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
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
          },
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
          },
        ]
      }
      template_question_relation: {
        Row: {
          created_at: string
          id: string
          order: number | null
          question_id: string
          template_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order?: number | null
          question_id: string
          template_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order?: number | null
          question_id?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_question_relation_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question_bank"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_question_relation_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "assessment_template"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          applied: boolean | null
          assistant_id: string | null
          candidate_email: string | null
          candidate_name: string | null
          candidate_phone: string | null
          chat_end: boolean | null
          created_at: string
          designation: string | null
          document_text: string | null
          file_url: string | null
          id: number
          thread_id: string | null
        }
        Insert: {
          applied?: boolean | null
          assistant_id?: string | null
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_phone?: string | null
          chat_end?: boolean | null
          created_at?: string
          designation?: string | null
          document_text?: string | null
          file_url?: string | null
          id?: number
          thread_id?: string | null
        }
        Update: {
          applied?: boolean | null
          assistant_id?: string | null
          candidate_email?: string | null
          candidate_name?: string | null
          candidate_phone?: string | null
          chat_end?: boolean | null
          created_at?: string
          designation?: string | null
          document_text?: string | null
          file_url?: string | null
          id?: number
          thread_id?: string | null
        }
        Relationships: []
      }
      workflow: {
        Row: {
          auto_connect: boolean
          created_at: string
          description: string | null
          id: string
          interval: number
          phase: Database["public"]["Enums"]["workflow_phase"]
          recruiter_id: string
          title: string | null
          trigger: Database["public"]["Enums"]["workflow_trigger"]
        }
        Insert: {
          auto_connect?: boolean
          created_at?: string
          description?: string | null
          id?: string
          interval?: number
          phase: Database["public"]["Enums"]["workflow_phase"]
          recruiter_id: string
          title?: string | null
          trigger: Database["public"]["Enums"]["workflow_trigger"]
        }
        Update: {
          auto_connect?: boolean
          created_at?: string
          description?: string | null
          id?: string
          interval?: number
          phase?: Database["public"]["Enums"]["workflow_phase"]
          recruiter_id?: string
          title?: string | null
          trigger?: Database["public"]["Enums"]["workflow_trigger"]
        }
        Relationships: [
          {
            foreignKeyName: "workflow_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_action: {
        Row: {
          created_at: string
          email_template_id: string
          id: string
          order: number
          payload: Json | null
          workflow_id: string
        }
        Insert: {
          created_at?: string
          email_template_id: string
          id?: string
          order: number
          payload?: Json | null
          workflow_id?: string
        }
        Update: {
          created_at?: string
          email_template_id?: string
          id?: string
          order?: number
          payload?: Json | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_action_email_template_id_fkey"
            columns: ["email_template_id"]
            isOneToOne: false
            referencedRelation: "company_email_template"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_action_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_action_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_view"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_action_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          execute_at: string
          id: number
          meta: Json | null
          started_at: string | null
          status: Database["public"]["Enums"]["application_processing_status"]
          tries: number
          workflow_action_id: string
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          execute_at: string
          id?: number
          meta?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["application_processing_status"]
          tries?: number
          workflow_action_id: string
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          execute_at?: string
          id?: number
          meta?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["application_processing_status"]
          tries?: number
          workflow_action_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_action_logs_workflow_action_id_fkey"
            columns: ["workflow_action_id"]
            isOneToOne: false
            referencedRelation: "workflow_action"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_action_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_action_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_view"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_job_relation: {
        Row: {
          created_at: string
          id: string
          job_id: string
          workflow_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id?: string
          workflow_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_job_relation_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_job_relation_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_job_relation_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflow_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      application_view: {
        Row: {
          applied_at: string | null
          badges: Json | null
          bookmarked: boolean | null
          candidate_file_id: string | null
          candidate_id: string | null
          city: string | null
          country: string | null
          created_at: string | null
          current_job_title: string | null
          email: string | null
          email_status: Json | null
          file_url: string | null
          id: string | null
          interview_score: number | null
          is_new: boolean | null
          job_id: string | null
          linkedin: string | null
          meeting_details: Json | null
          name: string | null
          phone: string | null
          processing_status:
            | Database["public"]["Enums"]["application_processing_status"]
            | null
          resume_processing_state:
            | Database["public"]["Enums"]["resume_processing_state"]
            | null
          resume_score: number | null
          state: string | null
          status: Database["public"]["Enums"]["application_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_file_id_fkey"
            columns: ["candidate_file_id"]
            isOneToOne: false
            referencedRelation: "candidate_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      debreif_meeting_interviewers: {
        Row: {
          email: string | null
          first_name: string | null
          interviewer_type:
            | Database["public"]["Enums"]["status_training"]
            | null
          is_confirmed: boolean | null
          last_name: string | null
          meeting_id: string | null
          profile_image: string | null
          session_id: string | null
          training_type: Database["public"]["Enums"]["interviewer_type"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "interview_meeting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meeting_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_details: {
        Row: {
          application_id: string | null
          break_duration: number | null
          cal_event_id: string | null
          candidate_feedback: Json | null
          confirmed_date: string | null
          created_at: string | null
          end_time: string | null
          id: string | null
          instructions: string | null
          interview_schedule_id: string | null
          meeting_json: Json | null
          meeting_link: string | null
          organizer_id: string | null
          schedule_type:
            | Database["public"]["Enums"]["interview_schedule_type"]
            | null
          session_duration: number | null
          session_id: string | null
          session_name: string | null
          session_order: number | null
          session_type: Database["public"]["Enums"]["session_type"] | null
          start_time: string | null
          status:
            | Database["public"]["Enums"]["interview_schedule_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "recruiter_user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "debreif_meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_meeting_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "meeting_interviewers"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_schedule_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_schedule_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "application_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_meeting_interview_schedule_id_fkey"
            columns: ["interview_schedule_id"]
            isOneToOne: false
            referencedRelation: "interview_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_interviewers: {
        Row: {
          email: string | null
          first_name: string | null
          interviewer_type:
            | Database["public"]["Enums"]["status_training"]
            | null
          is_confirmed: boolean | null
          last_name: string | null
          meeting_id: string | null
          profile_image: string | null
          session_id: string | null
          session_relation_id: string | null
          training_type: Database["public"]["Enums"]["interviewer_type"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "interview_meeting"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_interview_session_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meeting_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_view: {
        Row: {
          auto_connect: boolean | null
          created_at: string | null
          description: string | null
          id: string | null
          interval: number | null
          jobs: Json | null
          phase: Database["public"]["Enums"]["workflow_phase"] | null
          recruiter_id: string | null
          title: string | null
          trigger: Database["public"]["Enums"]["workflow_trigger"] | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      ashbyapplicationsync: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      ashbyjobreference: {
        Args: {
          rec_id: string
        }
        Returns: Json[]
      }
      ashbysync: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      batchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      batchsavegreenhouse: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      batchsavegreenhouse_test: {
        Args: {
          rec_id: string
        }
        Returns: Json[]
      }
      batchscorecron: {
        Args: {
          function_value: string
        }
        Returns: Json
      }
      batchtriggergreenhouse: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      calc_sim_score3: {
        Args: {
          job_ids: string[]
          skill_qry_emb: string
          edu_qry_emb: string
          exp_qry_emb: string
          resume_qry_emb: string
          max_records?: number
          ts_query?: string
          filter_companies?: string
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
          candidate_id: string
          job_id: string
          similarity: number
          sim_exp: number
          sim_res: number
          sim_skills: number
          sim_educ: number
          candfile_id: string
        }[]
      }
      calculate_resume_score: {
        Args: {
          in_score_json: Json
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
      connectassessmenttemplate: {
        Args: {
          assessmentid: string
          recruiterid: string
          templateid: string
          jobid: string
        }
        Returns: undefined
      }
      connectbulkassessmenttemplate: {
        Args: {
          assessments: string[]
          recruiterid: string
          templates: Json[]
          jobid: string
        }
        Returns: undefined
      }
      count_candidates: {
        Args: {
          job_ids: string[]
        }
        Returns: {
          total_records: number
        }[]
      }
      create_new_workflow_action_log: {
        Args: {
          workflow_id: string
          workflow_action_id: string
          interval_minutes: number
          phase: string
          meta: Json
          base_time?: string
        }
        Returns: undefined
      }
      createrecuriterrelation:
        | {
            Args: {
              in_user_id: string
              in_recruiter_id: string
            }
            Returns: boolean
          }
        | {
            Args: {
              in_user_id: string
              in_recruiter_id: string
              in_is_active: boolean
            }
            Returns: boolean
          }
      delete_session: {
        Args: {
          session_id: string
          interview_plan_id: string
        }
        Returns: undefined
      }
      duplicateassessment: {
        Args: {
          assessmentid: string
          newassessmentid: string
          recruiterid: string
          newtitle: string
        }
        Returns: undefined
      }
      emailcroncandidatedb: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      emailhandlercandidatedb: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      embeddingresume: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      fetch_interview_data: {
        Args: {
          rec_id: string
          text_search_filter?: string
          job_id_filter?: string[]
          sort_by?: string
          cord_ids?: string[]
          status_filter?: string[]
          schedule_type_filter?: string[]
          module_ids?: string[]
          page_number?: number
        }
        Returns: {
          applications: Json
          candidates: Json
          file: Json
          public_jobs: Json
          schedule: Json
          interview_session_meetings: Json
        }[]
      }
      fetch_interview_data_page_number: {
        Args: {
          rec_id: string
          application_id: string
          text_search_filter?: string
          status_filter?: string[]
          job_id_filter?: string[]
          panel_id_filter?: string[]
          sch_type?: string[]
          date_range_filter?: unknown
          sort_by?: string
        }
        Returns: number
      }
      fetch_slots_api_details: {
        Args: {
          in_plan_id: string
          in_company_id: string
        }
        Returns: {
          interview_sessions: Json
          service_json: string
        }[]
      }
      find_avail_api_details: {
        Args: {
          job_id: string
          recruiter_id: string
        }
        Returns: {
          interview_plan: Json
          service_json: Json
          interviewer: Json
          interview_modules: Json
        }[]
      }
      find_avail_api_details_updated: {
        Args: {
          job_id: string
          recruiter_id: string
        }
        Returns: {
          interview_plan: Json
          service_json: Json
          interviewer: Json
          interview_modules: Json
          shadow_ints: Json
          rshadow_ints: Json
        }[]
      }
      find_avail_api_details_updated_2: {
        Args: {
          job_id: string
          recruiter_id: string
        }
        Returns: {
          interview_plan: Json
          service_json: Json
          interviewer: Json
          interview_modules: Json
          shadow_ints: Json
          rshadow_ints: Json
          int_mod_relns: Json
        }[]
      }
      get_all_interview_session_by_user_id: {
        Args: {
          target_user_id: string
        }
        Returns: Json
      }
      get_applicant_locations: {
        Args: {
          job_id: string
        }
        Returns: {
          locations: Json
        }[]
      }
      get_candidate_info: {
        Args: {
          rec_id: string
        }
        Returns: {
          first_name: string
          last_name: string
          avatar: string
          screening_title: string
          job_title: string
        }[]
      }
      get_combined_resume_score: {
        Args: {
          jd_data: Json
          parameter_weights: Json
        }
        Returns: number
      }
      get_conversion_count: {
        Args: {
          recruiter_id: string
          type: string
        }
        Returns: {
          timeline: string
          count: number
        }[]
      }
      get_interview_data_count: {
        Args: {
          rec_id: string
          text_search_filter?: string
          job_id_filter?: string[]
          cord_ids?: string[]
          status_filter?: string[]
          schedule_type_filter?: string[]
          module_ids?: string[]
        }
        Returns: number
      }
      get_interview_data_job: {
        Args: {
          application_id_param: string
        }
        Returns: Json
      }
      get_interview_data_schedule: {
        Args: {
          schedule_id_param: string
          application_id_param: string
        }
        Returns: Json
      }
      get_interview_leaderboard: {
        Args: {
          recruiter_id: string
          type: string
        }
        Returns: {
          user_id: string
          first_name: string
          last_name: string
          profile_image: string
          user_position: string
          duration: number
          interviews: number
        }[]
      }
      get_interview_meeting_status_count: {
        Args: {
          recruiter_id: string
          type: string
        }
        Returns: {
          timeline: string
          completed: number
          cancelled: number
          not_scheduled: number
          waiting: number
          confirmed: number
          reschedule: number
        }[]
      }
      get_interview_modules: {
        Args: {
          rec_id: string
        }
        Returns: {
          interview_modules: Json
          users: Json
          upcoming_meeting_count: number
          completed_meeting_count: number
          canceled_meeting_count: number
        }[]
      }
      get_interview_schedule_by_job_id: {
        Args: {
          target_job_id: string
        }
        Returns: {
          interview_meeting: Json
          schedule: Json
          interview_session: Json
          candidates: Json
          users: Json
        }[]
      }
      get_interview_schedule_by_meeting_id: {
        Args: {
          target_meeting_id: string
        }
        Returns: {
          interview_meeting: Json
          interview_session: Json
          schedule: Json
          applications: Json
          candidates: Json
          interview_module: Json
          file: Json
          job: Json
          users: Json
          coordinator: Json
        }[]
      }
      get_interview_schedule_by_module_id: {
        Args: {
          target_module_id: string
        }
        Returns: {
          interview_meeting: Json
          users: Json
          candidate: Json
        }[]
      }
      get_interview_schedule_by_rec_id: {
        Args: {
          target_rec_id: string
        }
        Returns: {
          interview_meeting: Json
          users: Json
          candidate: Json
        }[]
      }
      get_interview_schedule_by_user_id: {
        Args: {
          target_user_id: string
        }
        Returns: {
          interview_meeting: Json
          interview_session: Json
          schedule: Json
          users: Json
        }[]
      }
      get_interview_session_data: {
        Args: {
          session_ids: string[]
          company_id: string
          meet_start_date: string
          meet_end_date: string
        }
        Returns: {
          interview_sessions: Json[]
          interviewers: Json[]
          service_cred: string
          interview_modules: Json[]
          comp_schedule_setting: Json
          int_meetings: Json[]
        }[]
      }
      get_interview_training_status_count: {
        Args: {
          recruiter_id: string
        }
        Returns: {
          id: string
          name: string
          training_status_count: Json
        }[]
      }
      get_interviewer_meetings: {
        Args: {
          target_user_id: string
        }
        Returns: {
          interviewer_meetings: Json
        }[]
      }
      get_interviewers: {
        Args: {
          rec_id: string
        }
        Returns: {
          rec_user: Json
          qualified_module_names: string[]
          training_module_names: string[]
          upcoming_meeting_count: number
          completed_meeting_count: number
        }[]
      }
      get_meetings_by_interviewer: {
        Args: {
          int_id: string
        }
        Returns: {
          meeting_id: string
          interviewer_id: string
        }[]
      }
      get_present_scheduled_jobs: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      get_recruiter_name_id: {
        Args: {
          in_application_id: string
        }
        Returns: {
          id: string
          name: string
        }[]
      }
      get_recruiter_screening_data: {
        Args: {
          recruiter_id: string
        }
        Returns: {
          first_name: string
          last_name: string
          avatar: string
          status_emails_sent: number
          screening_title: string
          job_title: string
        }[]
      }
      get_screening_candidates: {
        Args: {
          p_recruiter_id: string
        }
        Returns: {
          id: string
          first_name: string
          last_name: string
          avatar: string
          status_emails_sent: Json
          screening_title: string
          job_title: string
          created_at: string
          response: Json
          questions: Json
          public_job_id: string
          company: string
          email: string
          candidate_id: string
          email_template: Json
          result_created_at: string
          assessment_result: Json[]
          phonescreening_templateid: string
        }[]
      }
      get_test_interview: {
        Args: {
          user_test_id: string
        }
        Returns: {
          rec_user: Json
          interview_session_meetings: Json
        }[]
      }
      getallresumematches: {
        Args: {
          jobid: string
          topmatch?: number
          goodmatch?: number
          averagematch?: number
          poormatch?: number
        }
        Returns: Json
      }
      getapplicationprocessingstatuscount: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      getassessments: {
        Args: {
          recruiterid: string
        }
        Returns: {
          id: string
          created_at: string
          title: string
          description: string
          type: Database["public"]["Enums"]["template_type"]
          recruiter_id: string
          level: Database["public"]["Enums"]["question_level"]
          mode: Database["public"]["Enums"]["assessment_mode"]
          question_count: number
          duration: number
          jobs: Json
        }[]
      }
      getassessmenttemplates: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          created_at: string
          title: string
          description: string
          type: Database["public"]["Enums"]["template_type"]
          level: Database["public"]["Enums"]["question_level"]
          mode: Database["public"]["Enums"]["assessment_mode"]
          duration: number
          question_count: number
        }[]
      }
      getexperienceandtenure: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      getjob: {
        Args: {
          jobid: string
        }
        Returns: {
          active_status: Json
          assessment: boolean
          company: string
          created_at: string
          department: string
          description: string
          description_hash: number
          draft: Json
          email_template: Json
          id: string
          jd_json: Json
          job_title: string
          job_type: Database["public"]["Enums"]["public_job_type"]
          location: string
          parameter_weights: Json
          phone_screen_enabled: boolean
          posted_by: string
          recruiter_id: string
          scoring_criteria_loading: boolean
          status: Database["public"]["Enums"]["public_job_status"]
          workplace_type: Database["public"]["Enums"]["public_job_workplace"]
          hiring_manager: string
          recruiter: string
          recruiting_coordinator: string
          sourcer: string
          interview_coordinator: string
          count: Json
          processing_count: Json
        }[]
      }
      getjobapplicationcountforcandidates: {
        Args: {
          candidate_ids: string[]
        }
        Returns: {
          candidate_id: string
          job_ids: string[]
          job_titles: string[]
        }[]
      }
      getjobapplicationcountforcandidates2: {
        Args: {
          candidate_ids: string[]
        }
        Returns: {
          candidate_id: string
          job_ids: string[]
          job_titles: string[]
        }[]
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
      getjobassessments: {
        Args: {
          jobid: string
        }
        Returns: {
          id: string
          created_at: string
          title: string
          description: string
          type: Database["public"]["Enums"]["template_type"]
          recruiter_id: string
          level: Database["public"]["Enums"]["question_level"]
          mode: Database["public"]["Enums"]["assessment_mode"]
          duration: number
        }[]
      }
      getjobs: {
        Args: {
          recruiterid: string
        }
        Returns: {
          active_status: Json
          assessment: boolean
          company: string
          created_at: string
          department: string
          description: string
          description_hash: number
          draft: Json
          email_template: Json
          id: string
          jd_json: Json
          job_title: string
          job_type: Database["public"]["Enums"]["public_job_type"]
          location: string
          parameter_weights: Json
          phone_screen_enabled: boolean
          posted_by: string
          recruiter_id: string
          scoring_criteria_loading: boolean
          status: Database["public"]["Enums"]["public_job_status"]
          workplace_type: Database["public"]["Enums"]["public_job_workplace"]
          count: Json
          processing_count: Json
        }[]
      }
      getjobsv2: {
        Args: {
          recruiter_id: string
        }
        Returns: Json[]
      }
      getlocationspool: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      getoutreachemails: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      getrecruiterscreeningdata: {
        Args: {
          recruiter_id: number
        }
        Returns: {
          first_name: string
          last_name: string
          avatar: string
          status_emails_sent: string
          screening_title: string
          job_title: string
        }[]
      }
      getresumematch: {
        Args: {
          jobid: string
          section: Database["public"]["Enums"]["application_status"]
          topmatch?: number
          goodmatch?: number
          averagematch?: number
          poormatch?: number
        }
        Returns: {
          match: string
          count: number
        }[]
      }
      getresumematches: {
        Args: {
          jobid: string
          section: Database["public"]["Enums"]["application_status"]
          topmatch?: number
          goodmatch?: number
          averagematch?: number
          poormatch?: number
        }
        Returns: Json
      }
      getsectioncounts: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      getskillpools: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      getskillspool: {
        Args: {
          jobid: string
        }
        Returns: Json
      }
      greenhousecandidatesync: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      insert_debrief_session: {
        Args: {
          interview_plan_id: string
          session_order: number
          session_duration: number
          break_duration: number
          location: string
          schedule_type: Database["public"]["Enums"]["interview_schedule_type"]
          name: string
          members: Json
          members_meta: Json
        }
        Returns: undefined
      }
      insert_interview_session: {
        Args: {
          module_id: string
          interview_plan_id: string
          session_order: number
          session_duration: number
          break_duration: number
          interviewer_cnt: number
          session_type: Database["public"]["Enums"]["session_type"]
          location: string
          schedule_type: Database["public"]["Enums"]["interview_schedule_type"]
          name: string
          interview_module_relation_entries: Json
        }
        Returns: undefined
      }
      interviewing_state_active: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      job_application_filter_sort: {
        Args: {
          jb_id: string
          min_lat?: number
          min_long?: number
          max_lat?: number
          max_long?: number
          j_status?: string
          from_rec_num?: number
          end_rec_num?: number
          min_resume_score?: number
          max_resume_score?: number
          min_interview_score?: number
          max_interview_score?: number
          sort_column_text?: string
          is_sort_desc?: boolean
          text_search_qry?: string
          sort_by_schedule?: string
          is_locat_filter_on?: boolean
        }
        Returns: {
          job_app: Json
          cand: Json
          tasks: Json
          candfiles: Json
          assres: Json
          schedule: Json
          interview_session_meetings: Json
          fil_res: number
        }[]
      }
      kkkjob_application_filter_sort: {
        Args: {
          jb_id: string
          min_lat?: number
          min_long?: number
          max_lat?: number
          max_long?: number
          j_status?: string
          from_rec_num?: number
          end_rec_num?: number
          min_resume_score?: number
          max_resume_score?: number
          min_interview_score?: number
          max_interview_score?: number
          sort_column_text?: string
          is_sort_desc?: boolean
          text_search_qry?: string
          sort_by_schedule?: string
          is_locat_filter_on?: boolean
        }
        Returns: {
          job_app: Json
          cand: Json
          candfiles: Json
          assres: Json
          schedule: Json
          panel: Json
          fil_res: number
        }[]
      }
      kkkjob_application_filter_sort2: {
        Args: {
          jb_id: string
          min_lat?: number
          min_long?: number
          max_lat?: number
          max_long?: number
          j_status?: string
          from_rec_num?: number
          end_rec_num?: number
          min_resume_score?: number
          max_resume_score?: number
          min_interview_score?: number
          max_interview_score?: number
          sort_column_text?: string
          is_sort_desc?: boolean
          text_search_qry?: string
          sort_by_schedule?: string
          is_locat_filter_on?: boolean
        }
        Returns: {
          job_app: Json
          cand: Json
          candfiles: Json
          assres: Json
          schedule: Json
          panel: Json
          fil_res: number
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
      match_questions: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          question: Json
          level: string
          type: string
          duration: number
          similarity: number
        }[]
      }
      move_scheduled_jobs_sourcing_to_active: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      new_get_interview_schedule_by_meeting_id: {
        Args: {
          target_meeting_id: string
        }
        Returns: Json
      }
      new_get_interview_schedule_by_user_id: {
        Args: {
          target_user_id: string
        }
        Returns: {
          interview_meeting: Json
          users: Json
          candidate: Json
        }[]
      }
      outreachhandler: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      overviewgenerate: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      reorder_sessions: {
        Args: {
          sessions: Json
          interview_plan_id: string
        }
        Returns: undefined
      }
      retrybatchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      schedulercron: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      search_candidates: {
        Args: {
          recruiter_id_param: string
          name_param: string
        }
        Returns: {
          applications: Json
          candidate: Json
          job: Json
        }[]
      }
      search_members: {
        Args: {
          recruiter_id_param: string
          name_param: string
        }
        Returns: {
          member_info: Json
        }[]
      }
      secondretrybatchcalcresumejdscore: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      set_active_rec: {
        Args: {
          in_user_id: string
          in_recruiter_id: string
        }
        Returns: boolean
      }
      test_filter3: {
        Args: {
          rec_id: string
          location_filter: string
          name_filter: string
          job_title_filter: string
          page_size: number
          page_number: number
          sort_param?: string
          is_name_sort_desc?: boolean
          is_location_sort_desc?: boolean
          is_job_title_sort_desc?: boolean
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
          candidate_id: string
          job_id: string
          candfile_id: string
          total_results: number
        }[]
      }
      upd_get_interview_session_data: {
        Args: {
          session_ids: string[]
          company_id: string
          meet_start_date: string
          meet_end_date: string
        }
        Returns: {
          interview_sessions: Json[]
          interviewers: Json[]
          service_cred: string
          interview_modules: Json[]
          comp_schedule_setting: Json
          int_meetings: Json[]
        }[]
      }
      update_debrief_session: {
        Args: {
          session_id: string
          session_duration: number
          break_duration: number
          location: string
          schedule_type: Database["public"]["Enums"]["interview_schedule_type"]
          name: string
          members: Json
          members_meta: Json
        }
        Returns: undefined
      }
      update_interview_session: {
        Args: {
          session_id: string
          module_id: string
          session_duration: number
          break_duration: number
          interviewer_cnt: number
          session_type: Database["public"]["Enums"]["session_type"]
          location: string
          schedule_type: Database["public"]["Enums"]["interview_schedule_type"]
          name: string
          interview_module_relation_entries: Json
        }
        Returns: undefined
      }
      update_meeting_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_resume_score: {
        Args: {
          job_id: string
        }
        Returns: boolean
      }
      updatequestionorder: {
        Args: {
          start_point: number
          question_ids: string[]
        }
        Returns: undefined
      }
      workflow_action_log_cron: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      workflow_action_log_set_fail_cron: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      activity_type: "aglint" | "user" | "candidate"
      agent_type: "scheduler" | "job" | "sourcing" | "screening"
      agent_types: "scheduler" | "screening" | "job_assistant" | "sourcing"
      application_logger:
        | "email_agent"
        | "phone_agent"
        | "user"
        | "system"
        | "candidate"
      application_processing_status:
        | "not started"
        | "processing"
        | "failed"
        | "success"
      application_source:
        | "ashby"
        | "lever"
        | "greenhouse"
        | "resume_upload"
        | "manual_upload"
        | "csv_upload"
        | "apply_link"
        | "candidate_database"
      application_status:
        | "new"
        | "assessment"
        | "qualified"
        | "disqualified"
        | "screening"
        | "interview"
      assessment_mode: "classic" | "verbal" | "visual"
      cancel_type: "reschedule" | "declined"
      db_search_type: "aglint" | "candidate"
      email_fetch_status: "not fetched" | "success" | "unable to fetch"
      email_slack_types:
        | "interviewEnd_slack_interviewers"
        | "interviewerConfirmation_slack_interviewers"
        | "interviewStart_slack_interviewers"
        | "agent_email_candidate"
        | "applicantReject_email_applicant"
        | "applicationRecieved_email_applicant"
        | "confInterview_email_organizer"
        | "confirmInterview_email_applicant"
        | "debrief_email_interviewer"
        | "interReschedReq_email_recruiter"
        | "interviewCancel_email_applicant"
        | "InterviewCancelReq_email_recruiter"
        | "interviewReschedule_email_applicant"
        | "interviewStart_email_applicant"
        | "interviewStart_email_interviewers"
        | "phoneScreen_email_candidate"
        | "phoneScreenRemind_email_applicant"
        | "selfScheduleReminder_email_applicant"
        | "sendAvailReqReminder_email_applicant"
        | "sendSelfScheduleRequest_email_applicant"
        | "sendAvailabilityRequest_email_applicant"
        | "availabilityReqResend_email_candidate"
      employment_type_enum: "fulltime" | "parttime" | "contractor"
      file_type: "resume" | "coverletter" | "cv" | "image"
      icon_status_activity: "success" | "waiting" | "error"
      interview_schedule_status:
        | "waiting"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "reschedule"
        | "not_scheduled"
      interview_schedule_type:
        | "in_person_meeting"
        | "google_meet"
        | "phone_call"
        | "zoom"
      interviewer_type: "qualified" | "shadow" | "reverse_shadow"
      job_scoring_param_status: "loading" | "success"
      meeting_flow: "self_scheduling" | "candidate_request" | "debrief"
      modules: "standard" | "scheduler" | "assessment" | "jobs"
      permissions_type:
        | "jobs_create"
        | "jobs_read"
        | "jobs_update"
        | "jobs_delete"
        | "jobs_publish"
        | "jobs_unpublish"
        | "jobs_archive"
        | "jobs_restore"
        | "jobs_assignHiringManager"
        | "jobs_assignRecruiter"
        | "jobs_assignCoordinator"
        | "jobs_assignSourcer"
        | "candidates_add"
        | "candidates_read"
        | "candidates_update"
        | "candidates_delete"
        | "candidates_moveStage"
        | "profileScore_view"
        | "profileScore_update"
        | "interviews_schedule"
        | "interviews_read"
        | "interviews_update"
        | "interviews_delete"
        | "reports_generate"
        | "reports_view"
        | "reports_export"
        | "settings_view"
        | "settings_update"
        | "tasks_enabled"
        | "jobs_enabled"
        | "scheduler_enabled"
        | "sourcing_enabled"
        | "phone_screening_enabled"
        | "assessment_enabled"
        | "integrations_enabled"
        | "company_setting_enabled"
      progress_type:
        | "standard"
        | "interview_schedule"
        | "email_messages"
        | "call_completed"
        | "call_failed"
        | "email_failed"
        | "call_disconnected"
        | "email_follow_up"
        | "call_follow_up"
        | "email_follow_up_reminder"
        | "call_follow_up_reminder"
        | "request_availability_list"
      public_job_status: "draft" | "published" | "closed"
      public_job_type:
        | "contract"
        | "full time"
        | "part time"
        | "temporary"
        | "volunteer"
        | "internship"
      public_job_workplace: "hybrid" | "on site" | "off site"
      question_level: "basic" | "intermediate" | "advanced"
      question_type: "scq" | "mcq" | "qna" | "code"
      recruiter_rolesx:
        | "admin"
        | "member"
        | "interviewer"
        | "scheduler"
        | "recruiter"
      resume_processing_state:
        | "unavailable"
        | "fetching"
        | "processing"
        | "unparsable"
        | "processed"
      sender_type: "aglint" | "you" | "system" | "user"
      session_accepted_status:
        | "waiting"
        | "accepted"
        | "declined"
        | "request_reschedule"
      session_type: "panel" | "individual" | "debrief"
      status_training: "qualified" | "training"
      sub_task_status:
        | "completed"
        | "pending"
        | "in_progress"
        | "failed"
        | "closed"
      task_agent_type: "phone" | "email" | "job"
      task_priority: "high" | "low" | "medium"
      task_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "closed"
        | "not_started"
        | "scheduled"
        | "cancelled"
        | "overdue"
        | "on_hold"
        | "failed"
      task_type_enum:
        | "schedule"
        | "training"
        | "empty"
        | "availability"
        | "self_schedule"
      template_type:
        | "cognitive"
        | "language"
        | "personality"
        | "culture"
        | "programming"
        | "role"
        | "situational"
        | "software"
        | "typing"
      user_roles:
        | "admin"
        | "recruiter"
        | "interviewer"
        | "recruiting_coordinator"
        | "sourcer"
        | "hiring_manager"
      workflow_phase: "before" | "after" | "now"
      workflow_trigger:
        | "selfScheduleReminder"
        | "interviewStart"
        | "sendAvailReqReminder"
        | "interviewerConfirmation"
        | "interviewEnd"
    }
    CompositeTypes: {
      location_type: {
        city: string | null
        state: string | null
        country: string | null
      }
      my_table_type: {
        name: string | null
        age: number | null
        city: string | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

