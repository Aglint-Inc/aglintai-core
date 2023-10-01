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
      activity_logs: {
        Row: {
          created_at: string
          credit_used: number
          id: number
          is_active: boolean | null
          item_id: string | null
          log_message: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          credit_used?: number
          id?: number
          is_active?: boolean | null
          item_id?: string | null
          log_message: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          credit_used?: number
          id?: number
          is_active?: boolean | null
          item_id?: string | null
          log_message?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ai_content_feedback: {
        Row: {
          ai_content: Json[] | null
          created_at: string | null
          employee_id: string | null
          feedback: string | null
          feedback_type: string | null
          issue_id: string
          module_name: string
        }
        Insert: {
          ai_content?: Json[] | null
          created_at?: string | null
          employee_id?: string | null
          feedback?: string | null
          feedback_type?: string | null
          issue_id?: string
          module_name?: string
        }
        Update: {
          ai_content?: Json[] | null
          created_at?: string | null
          employee_id?: string | null
          feedback?: string | null
          feedback_type?: string | null
          issue_id?: string
          module_name?: string
        }
        Relationships: []
      }
      cal_dot_com: {
        Row: {
          created_at: string
          key_text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          key_text: string
          user_id: string
        }
        Update: {
          created_at?: string
          key_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cal_dot_com_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      candidate_plan: {
        Row: {
          employee_id: string | null
          plan_id: string | null
          services: Json | null
          stripe_cust_id: string
        }
        Insert: {
          employee_id?: string | null
          plan_id?: string | null
          services?: Json | null
          stripe_cust_id: string
        }
        Update: {
          employee_id?: string | null
          plan_id?: string | null
          services?: Json | null
          stripe_cust_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_plan_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      career_coach: {
        Row: {
          about: string | null
          access_token: string | null
          achievement: string | null
          achievements: Json[] | null
          availability: boolean
          average_attendance: number | null
          banner_image: string | null
          cal_id: string | null
          calendly_avatar: string | null
          calendly_email: string | null
          calendly_event: Json | null
          calendly_name: string | null
          calendly_organization: string | null
          calendly_user: string | null
          coach_id: string
          created_at: string | null
          educations: Json[] | null
          email: string | null
          experiences: Json[] | null
          expertise: string[] | null
          id: number
          intro_video: string | null
          karma_points: number | null
          language: string[] | null
          level: string | null
          mentoring_minute: number | null
          name: string | null
          onboarding_step: number | null
          profession: string | null
          profile_picture: string | null
          questions: Json[] | null
          refresh_token: string | null
          scheduling_url: string | null
          sessions_completed: number | null
          slug: string | null
          user_id: string | null
          work_place: string | null
        }
        Insert: {
          about?: string | null
          access_token?: string | null
          achievement?: string | null
          achievements?: Json[] | null
          availability?: boolean
          average_attendance?: number | null
          banner_image?: string | null
          cal_id?: string | null
          calendly_avatar?: string | null
          calendly_email?: string | null
          calendly_event?: Json | null
          calendly_name?: string | null
          calendly_organization?: string | null
          calendly_user?: string | null
          coach_id?: string
          created_at?: string | null
          educations?: Json[] | null
          email?: string | null
          experiences?: Json[] | null
          expertise?: string[] | null
          id?: number
          intro_video?: string | null
          karma_points?: number | null
          language?: string[] | null
          level?: string | null
          mentoring_minute?: number | null
          name?: string | null
          onboarding_step?: number | null
          profession?: string | null
          profile_picture?: string | null
          questions?: Json[] | null
          refresh_token?: string | null
          scheduling_url?: string | null
          sessions_completed?: number | null
          slug?: string | null
          user_id?: string | null
          work_place?: string | null
        }
        Update: {
          about?: string | null
          access_token?: string | null
          achievement?: string | null
          achievements?: Json[] | null
          availability?: boolean
          average_attendance?: number | null
          banner_image?: string | null
          cal_id?: string | null
          calendly_avatar?: string | null
          calendly_email?: string | null
          calendly_event?: Json | null
          calendly_name?: string | null
          calendly_organization?: string | null
          calendly_user?: string | null
          coach_id?: string
          created_at?: string | null
          educations?: Json[] | null
          email?: string | null
          experiences?: Json[] | null
          expertise?: string[] | null
          id?: number
          intro_video?: string | null
          karma_points?: number | null
          language?: string[] | null
          level?: string | null
          mentoring_minute?: number | null
          name?: string | null
          onboarding_step?: number | null
          profession?: string | null
          profile_picture?: string | null
          questions?: Json[] | null
          refresh_token?: string | null
          scheduling_url?: string | null
          sessions_completed?: number | null
          slug?: string | null
          user_id?: string | null
          work_place?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_coach_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      career_coach_assignment: {
        Row: {
          assignment_id: string
          coach_id: string
          created_at: string | null
          employee: string | null
          employee_id: string
          id: number
          status: string | null
        }
        Insert: {
          assignment_id?: string
          coach_id: string
          created_at?: string | null
          employee?: string | null
          employee_id: string
          id?: number
          status?: string | null
        }
        Update: {
          assignment_id?: string
          coach_id?: string
          created_at?: string | null
          employee?: string | null
          employee_id?: string
          id?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_coach_assignment_coach_id_fkey"
            columns: ["coach_id"]
            referencedRelation: "career_coach"
            referencedColumns: ["coach_id"]
          },
          {
            foreignKeyName: "career_coach_assignment_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      coach_meetings: {
        Row: {
          answers: Json[] | null
          assignment_id: string
          coach_meeting_id: string
          created_at: string | null
          event: string
          invite: string | null
          name: string | null
          scheduled: string
          status: string | null
          user_id: string
        }
        Insert: {
          answers?: Json[] | null
          assignment_id: string
          coach_meeting_id?: string
          created_at?: string | null
          event: string
          invite?: string | null
          name?: string | null
          scheduled: string
          status?: string | null
          user_id: string
        }
        Update: {
          answers?: Json[] | null
          assignment_id?: string
          coach_meeting_id?: string
          created_at?: string | null
          event?: string
          invite?: string | null
          name?: string | null
          scheduled?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_meetings_assignment_id_fkey"
            columns: ["assignment_id"]
            referencedRelation: "career_coach_assignment"
            referencedColumns: ["assignment_id"]
          },
          {
            foreignKeyName: "coach_meetings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      commonly_ask_history: {
        Row: {
          company: string | null
          created_at: string | null
          employee_id: string | null
          exp_level: string
          gjob_id: string | null
          id: string
          qna: Json | null
          role: string | null
          tracker_job_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          employee_id?: string | null
          exp_level?: string
          gjob_id?: string | null
          id?: string
          qna?: Json | null
          role?: string | null
          tracker_job_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          employee_id?: string | null
          exp_level?: string
          gjob_id?: string | null
          id?: string
          qna?: Json | null
          role?: string | null
          tracker_job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commonly_ask_history_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "commonly_ask_history_tracker_job_id_fkey"
            columns: ["tracker_job_id"]
            referencedRelation: "job_tracker"
            referencedColumns: ["job_id"]
          }
        ]
      }
      commonly_ask_qna: {
        Row: {
          created_at: string | null
          exp_level: string
          id: string
          qna: Json[] | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          exp_level?: string
          id?: string
          qna?: Json[] | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          exp_level?: string
          id?: string
          qna?: Json[] | null
          role?: string | null
        }
        Relationships: []
      }
      company: {
        Row: {
          address1: string | null
          address2: string | null
          archive: boolean | null
          city: string | null
          company_email: string | null
          company_id: string
          country: string | null
          created_at: string | null
          custom: Json[] | null
          default_coach_id: string | null
          default_plan_id: string | null
          departments: string[] | null
          designations: string[] | null
          doing_business_as: string | null
          fein: string | null
          go_live: string | null
          id: number
          industry_type: string | null
          is_onboarding: boolean | null
          is_test: boolean | null
          is_trial: boolean | null
          locations: string[] | null
          logo: string | null
          name: string | null
          no_of_emp: string | null
          region: string | null
          status: string | null
          team: string[] | null
          team_id: number[] | null
          theme: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          archive?: boolean | null
          city?: string | null
          company_email?: string | null
          company_id?: string
          country?: string | null
          created_at?: string | null
          custom?: Json[] | null
          default_coach_id?: string | null
          default_plan_id?: string | null
          departments?: string[] | null
          designations?: string[] | null
          doing_business_as?: string | null
          fein?: string | null
          go_live?: string | null
          id?: number
          industry_type?: string | null
          is_onboarding?: boolean | null
          is_test?: boolean | null
          is_trial?: boolean | null
          locations?: string[] | null
          logo?: string | null
          name?: string | null
          no_of_emp?: string | null
          region?: string | null
          status?: string | null
          team?: string[] | null
          team_id?: number[] | null
          theme?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          archive?: boolean | null
          city?: string | null
          company_email?: string | null
          company_id?: string
          country?: string | null
          created_at?: string | null
          custom?: Json[] | null
          default_coach_id?: string | null
          default_plan_id?: string | null
          departments?: string[] | null
          designations?: string[] | null
          doing_business_as?: string | null
          fein?: string | null
          go_live?: string | null
          id?: number
          industry_type?: string | null
          is_onboarding?: boolean | null
          is_test?: boolean | null
          is_trial?: boolean | null
          locations?: string[] | null
          logo?: string | null
          name?: string | null
          no_of_emp?: string | null
          region?: string | null
          status?: string | null
          team?: string[] | null
          team_id?: number[] | null
          theme?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_company: {
        Row: {
          contact_company_id: string
          created_at: string | null
          domain: string | null
          email: string | null
          employee_id: string | null
          last_updated_at: string | null
          linkedin: string | null
          location: string | null
          master_company_id: string | null
          name: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          contact_company_id?: string
          created_at?: string | null
          domain?: string | null
          email?: string | null
          employee_id?: string | null
          last_updated_at?: string | null
          linkedin?: string | null
          location?: string | null
          master_company_id?: string | null
          name?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          contact_company_id?: string
          created_at?: string | null
          domain?: string | null
          email?: string | null
          employee_id?: string | null
          last_updated_at?: string | null
          linkedin?: string | null
          location?: string | null
          master_company_id?: string | null
          name?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_company_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "contact_company_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_people_contact_company_id_fkey"
            columns: ["contact_company_id"]
            referencedRelation: "contact_company"
            referencedColumns: ["contact_company_id"]
          }
        ]
      }
      contact_people: {
        Row: {
          company: string | null
          contact_company_id: string | null
          contact_id: string
          created_at: string | null
          email: string | null
          employee_id: string | null
          first_name: string | null
          last_name: string | null
          last_updated_at: string | null
          location: string | null
          note: string | null
          phone_number: string | null
          profile_picture: string | null
          role: string | null
          social_link: string | null
          tracker_id: string | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          contact_company_id?: string | null
          contact_id?: string
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          first_name?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          location?: string | null
          note?: string | null
          phone_number?: string | null
          profile_picture?: string | null
          role?: string | null
          social_link?: string | null
          tracker_id?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          contact_company_id?: string | null
          contact_id?: string
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          first_name?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          location?: string | null
          note?: string | null
          phone_number?: string | null
          profile_picture?: string | null
          role?: string | null
          social_link?: string | null
          tracker_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_people_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "contact_people_tracker_id_fkey"
            columns: ["tracker_id"]
            referencedRelation: "job_tracker"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "contact_people_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cover_letter: {
        Row: {
          company_name: string | null
          cover_id: string
          coverletter: string | null
          created_at: string | null
          email: string | null
          employee_id: string | null
          favorite: boolean | null
          hiring_person: string | null
          id: number
          job_id: string | null
          job_title: string | null
          title: string | null
          tone: string | null
        }
        Insert: {
          company_name?: string | null
          cover_id?: string
          coverletter?: string | null
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          favorite?: boolean | null
          hiring_person?: string | null
          id?: number
          job_id?: string | null
          job_title?: string | null
          title?: string | null
          tone?: string | null
        }
        Update: {
          company_name?: string | null
          cover_id?: string
          coverletter?: string | null
          created_at?: string | null
          email?: string | null
          employee_id?: string | null
          favorite?: boolean | null
          hiring_person?: string | null
          id?: number
          job_id?: string | null
          job_title?: string | null
          title?: string | null
          tone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cover_letter_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      cover_letter_new: {
        Row: {
          analysis: Json | null
          body: string | null
          cover_id: string
          created_at: string | null
          employee_id: string
          experiences: Json[] | null
          jobs: Json | null
          resume: Json | null
          skills: Json[] | null
          title: string | null
          used_token: Json[]
        }
        Insert: {
          analysis?: Json | null
          body?: string | null
          cover_id?: string
          created_at?: string | null
          employee_id: string
          experiences?: Json[] | null
          jobs?: Json | null
          resume?: Json | null
          skills?: Json[] | null
          title?: string | null
          used_token?: Json[]
        }
        Update: {
          analysis?: Json | null
          body?: string | null
          cover_id?: string
          created_at?: string | null
          employee_id?: string
          experiences?: Json[] | null
          jobs?: Json | null
          resume?: Json | null
          skills?: Json[] | null
          title?: string | null
          used_token?: Json[]
        }
        Relationships: [
          {
            foreignKeyName: "cover_letter_new_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      employee: {
        Row: {
          address: Json | null
          archive: boolean | null
          coach_id: string | null
          company_id: string | null
          created_at: string | null
          dashboard_actions: Json | null
          department: string | null
          designation: string | null
          dob: string | null
          email: string
          employee_id: string
          experience_level: string | null
          first_name: string
          image: string | null
          joining_date: string | null
          last_name: string | null
          name: string | null
          name_json: Json | null
          onboarding: boolean | null
          onboarding_steps: Json[]
          op_end_date: string | null
          op_start_date: string | null
          out_place: boolean | null
          paid_plan: boolean | null
          phone: string | null
          salary: string | null
          salary_currency: string | null
          signup_email_sent: boolean | null
          social: Json[]
          status: string | null
          t_and_c: boolean | null
          team: string[] | null
          user_id: string | null
          utm_campaign: string | null
          utm_source: string | null
          website: Json[]
          years_of_experience: string | null
        }
        Insert: {
          address?: Json | null
          archive?: boolean | null
          coach_id?: string | null
          company_id?: string | null
          created_at?: string | null
          dashboard_actions?: Json | null
          department?: string | null
          designation?: string | null
          dob?: string | null
          email: string
          employee_id?: string
          experience_level?: string | null
          first_name?: string
          image?: string | null
          joining_date?: string | null
          last_name?: string | null
          name?: string | null
          name_json?: Json | null
          onboarding?: boolean | null
          onboarding_steps?: Json[]
          op_end_date?: string | null
          op_start_date?: string | null
          out_place?: boolean | null
          paid_plan?: boolean | null
          phone?: string | null
          salary?: string | null
          salary_currency?: string | null
          signup_email_sent?: boolean | null
          social?: Json[]
          status?: string | null
          t_and_c?: boolean | null
          team?: string[] | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
          website?: Json[]
          years_of_experience?: string | null
        }
        Update: {
          address?: Json | null
          archive?: boolean | null
          coach_id?: string | null
          company_id?: string | null
          created_at?: string | null
          dashboard_actions?: Json | null
          department?: string | null
          designation?: string | null
          dob?: string | null
          email?: string
          employee_id?: string
          experience_level?: string | null
          first_name?: string
          image?: string | null
          joining_date?: string | null
          last_name?: string | null
          name?: string | null
          name_json?: Json | null
          onboarding?: boolean | null
          onboarding_steps?: Json[]
          op_end_date?: string | null
          op_start_date?: string | null
          out_place?: boolean | null
          paid_plan?: boolean | null
          phone?: string | null
          salary?: string | null
          salary_currency?: string | null
          signup_email_sent?: boolean | null
          social?: Json[]
          status?: string | null
          t_and_c?: boolean | null
          team?: string[] | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
          website?: Json[]
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_coach_id_fkey"
            columns: ["coach_id"]
            referencedRelation: "career_coach"
            referencedColumns: ["coach_id"]
          },
          {
            foreignKeyName: "employee_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "employee_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback: {
        Row: {
          anonymus: string | null
          created_at: string | null
          feedback_id: string | null
          id: number
          last_read: Json | null
          last_updated: string
          message: Json[] | null
          receiver_id: string | null
          sender_id: string | null
          title: string | null
        }
        Insert: {
          anonymus?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: number
          last_read?: Json | null
          last_updated?: string
          message?: Json[] | null
          receiver_id?: string | null
          sender_id?: string | null
          title?: string | null
        }
        Update: {
          anonymus?: string | null
          created_at?: string | null
          feedback_id?: string | null
          id?: number
          last_read?: Json | null
          last_updated?: string
          message?: Json[] | null
          receiver_id?: string | null
          sender_id?: string | null
          title?: string | null
        }
        Relationships: []
      }
      followup_emails: {
        Row: {
          activity_id: number | null
          body: string | null
          body_text: string | null
          company_name: string | null
          created_at: string | null
          date: string | null
          designation: string | null
          email_to: string | null
          employee_id: string | null
          followup_email_id: string
          hiring_manager: string | null
          job_tracker_id: string | null
          sent: boolean
        }
        Insert: {
          activity_id?: number | null
          body?: string | null
          body_text?: string | null
          company_name?: string | null
          created_at?: string | null
          date?: string | null
          designation?: string | null
          email_to?: string | null
          employee_id?: string | null
          followup_email_id?: string
          hiring_manager?: string | null
          job_tracker_id?: string | null
          sent?: boolean
        }
        Update: {
          activity_id?: number | null
          body?: string | null
          body_text?: string | null
          company_name?: string | null
          created_at?: string | null
          date?: string | null
          designation?: string | null
          email_to?: string | null
          employee_id?: string | null
          followup_email_id?: string
          hiring_manager?: string | null
          job_tracker_id?: string | null
          sent?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "followup_emails_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "followup_emails_job_tracker_id_fkey"
            columns: ["job_tracker_id"]
            referencedRelation: "job_tracker"
            referencedColumns: ["job_id"]
          }
        ]
      }
      interview_preparation: {
        Row: {
          ai_feedback: string | null
          ai_interviewer_id: number | null
          company: string | null
          complete: boolean | null
          context: Json | null
          conversation: Json | null
          created_at: string | null
          duration: string
          employee_id: string | null
          favorite: boolean
          feedback: Json[]
          gjob_id: string | null
          id: string
          resume_id: string | null
          role: string | null
          skills: string | null
          total_token_used: number
          tracker_job_id: string | null
        }
        Insert: {
          ai_feedback?: string | null
          ai_interviewer_id?: number | null
          company?: string | null
          complete?: boolean | null
          context?: Json | null
          conversation?: Json | null
          created_at?: string | null
          duration?: string
          employee_id?: string | null
          favorite?: boolean
          feedback?: Json[]
          gjob_id?: string | null
          id?: string
          resume_id?: string | null
          role?: string | null
          skills?: string | null
          total_token_used?: number
          tracker_job_id?: string | null
        }
        Update: {
          ai_feedback?: string | null
          ai_interviewer_id?: number | null
          company?: string | null
          complete?: boolean | null
          context?: Json | null
          conversation?: Json | null
          created_at?: string | null
          duration?: string
          employee_id?: string | null
          favorite?: boolean
          feedback?: Json[]
          gjob_id?: string | null
          id?: string
          resume_id?: string | null
          role?: string | null
          skills?: string | null
          total_token_used?: number
          tracker_job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_preparation_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "interview_preparation_tracker_job_id_fkey"
            columns: ["tracker_job_id"]
            referencedRelation: "job_tracker"
            referencedColumns: ["job_id"]
          }
        ]
      }
      jd_match: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          job_json: Json | null
          result_json: Json | null
          resume_id: string | null
          resume_json: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          job_json?: Json | null
          result_json?: Json | null
          resume_id?: string | null
          resume_json?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          job_json?: Json | null
          result_json?: Json | null
          resume_id?: string | null
          resume_json?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jd_match_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      job_applications: {
        Row: {
          profile_image: any
          application_id: string
          branch: string | null
          cgpa: string | null
          college_name: string | null
          company: string | null
          conversation: Json[] | null
          created_at: string
          email: string
          email_campaign: string | null
          emails: Json | null
          feedback: Json | any
          first_name: string
          id: number
          interview_duration: string | null
          interviewing_date: string | null
          is_email_sent: boolean | null
          is_sign_up: boolean | null
          job_id: string
          job_location: string | null
          job_title: string | null
          json_resume: Json | null
          last_name: string
          linkedin: string | null
          phone: string | null
          resume: string | null
          score: number
          status: string | null
          used_token: Json[]
          usn: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          application_id?: string
          branch?: string | null
          cgpa?: string | null
          college_name?: string | null
          company?: string | null
          conversation?: Json[] | null
          created_at?: string
          email: string
          email_campaign?: string | null
          emails?: Json | null
          feedback?: Json | null
          first_name: string
          id?: number
          interview_duration?: string | null
          interviewing_date?: string | null
          is_email_sent?: boolean | null
          is_sign_up?: boolean | null
          job_id: string
          job_location?: string | null
          job_title?: string | null
          json_resume?: Json | null
          last_name: string
          linkedin?: string | null
          phone?: string | null
          resume?: string | null
          score?: number
          status?: string | null
          used_token?: Json[]
          usn?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          application_id?: string
          branch?: string | null
          cgpa?: string | null
          college_name?: string | null
          company?: string | null
          conversation?: Json[] | null
          created_at?: string
          email?: string
          email_campaign?: string | null
          emails?: Json | null
          feedback?: Json | null
          first_name?: string
          id?: number
          interview_duration?: string | null
          interviewing_date?: string | null
          is_email_sent?: boolean | null
          is_sign_up?: boolean | null
          job_id?: string
          job_location?: string | null
          job_title?: string | null
          json_resume?: Json | null
          last_name?: string
          linkedin?: string | null
          phone?: string | null
          resume?: string | null
          score?: number
          status?: string | null
          used_token?: Json[]
          usn?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      job_tracker: {
        Row: {
          about: string | null
          annual_salary: string | null
          archive: boolean | null
          behavioral_based: Json[] | null
          bysearch: boolean | null
          company_logo: string | null
          company_name: string
          created_at: string | null
          descriptions: string | null
          employee_id: string | null
          entire_json: Json | null
          id: number
          interviewqna: Json[] | null
          job_id: string
          job_search_id: string | null
          job_title: string | null
          job_updated_time: string | null
          latlng: Json[] | null
          link: string | null
          location: string | null
          locations: string | null
          notes: string | null
          posted_date: string | null
          role_based: Json[] | null
          salary_negotiation_qna: Json[] | null
          status: string
          tags: Json[] | null
        }
        Insert: {
          about?: string | null
          annual_salary?: string | null
          archive?: boolean | null
          behavioral_based?: Json[] | null
          bysearch?: boolean | null
          company_logo?: string | null
          company_name: string
          created_at?: string | null
          descriptions?: string | null
          employee_id?: string | null
          entire_json?: Json | null
          id?: number
          interviewqna?: Json[] | null
          job_id?: string
          job_search_id?: string | null
          job_title?: string | null
          job_updated_time?: string | null
          latlng?: Json[] | null
          link?: string | null
          location?: string | null
          locations?: string | null
          notes?: string | null
          posted_date?: string | null
          role_based?: Json[] | null
          salary_negotiation_qna?: Json[] | null
          status: string
          tags?: Json[] | null
        }
        Update: {
          about?: string | null
          annual_salary?: string | null
          archive?: boolean | null
          behavioral_based?: Json[] | null
          bysearch?: boolean | null
          company_logo?: string | null
          company_name?: string
          created_at?: string | null
          descriptions?: string | null
          employee_id?: string | null
          entire_json?: Json | null
          id?: number
          interviewqna?: Json[] | null
          job_id?: string
          job_search_id?: string | null
          job_title?: string | null
          job_updated_time?: string | null
          latlng?: Json[] | null
          link?: string | null
          location?: string | null
          locations?: string | null
          notes?: string | null
          posted_date?: string | null
          role_based?: Json[] | null
          salary_negotiation_qna?: Json[] | null
          status?: string
          tags?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "job_tracker_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      job_tracking_activities: {
        Row: {
          category: string | null
          completed: boolean | null
          created_at: string | null
          date: string | null
          description: string | null
          employee_id: string | null
          end_date: string | null
          id: number
          job_company_logo: string | null
          job_id: string | null
          job_title: string | null
          linked_job: string | null
          modified_by: string | null
          notes: string | null
          role: string | null
          start_date: string | null
          title: string | null
          todo: boolean | null
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: number
          job_company_logo?: string | null
          job_id?: string | null
          job_title?: string | null
          linked_job?: string | null
          modified_by?: string | null
          notes?: string | null
          role?: string | null
          start_date?: string | null
          title?: string | null
          todo?: boolean | null
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: number
          job_company_logo?: string | null
          job_id?: string | null
          job_title?: string | null
          linked_job?: string | null
          modified_by?: string | null
          notes?: string | null
          role?: string | null
          start_date?: string | null
          title?: string | null
          todo?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "job_tracking_activities_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      jobs: {
        Row: {
          created_at: string
          employer_logo: string | null
          employer_name: string | null
          employer_website: string | null
          is_public: boolean
          job_apply_is_direct: boolean | null
          job_apply_link: string | null
          job_apply_quality_score: string | null
          job_benefits: string[] | null
          job_city: string | null
          job_country: string | null
          job_description: string | null
          job_employment_type: string | null
          job_experience_in_place_of_education: boolean | null
          job_google_link: string | null
          job_highlights: Json | null
          job_id: string
          job_is_remote: boolean | null
          job_latitude: string | null
          job_longitude: string | null
          job_max_salary: number | null
          job_min_salary: number | null
          job_offer_expiration_datetime_utc: string | null
          job_offer_expiration_timestamp: number | null
          job_onet_job_zone: string | null
          job_onet_soc: string | null
          job_posted_at_datetime_utc: string | null
          job_posted_at_timestamp: number | null
          job_posting_language: string | null
          job_publisher: string | null
          job_required_education: Json | null
          job_required_experience: Json | null
          job_required_skills: string | null
          job_salary_currency: string | null
          job_salary_period: string | null
          job_search_id: string | null
          job_state: string | null
          job_title: string | null
          last_updated_at: string
          queries: string[] | null
        }
        Insert: {
          created_at?: string
          employer_logo?: string | null
          employer_name?: string | null
          employer_website?: string | null
          is_public?: boolean
          job_apply_is_direct?: boolean | null
          job_apply_link?: string | null
          job_apply_quality_score?: string | null
          job_benefits?: string[] | null
          job_city?: string | null
          job_country?: string | null
          job_description?: string | null
          job_employment_type?: string | null
          job_experience_in_place_of_education?: boolean | null
          job_google_link?: string | null
          job_highlights?: Json | null
          job_id?: string
          job_is_remote?: boolean | null
          job_latitude?: string | null
          job_longitude?: string | null
          job_max_salary?: number | null
          job_min_salary?: number | null
          job_offer_expiration_datetime_utc?: string | null
          job_offer_expiration_timestamp?: number | null
          job_onet_job_zone?: string | null
          job_onet_soc?: string | null
          job_posted_at_datetime_utc?: string | null
          job_posted_at_timestamp?: number | null
          job_posting_language?: string | null
          job_publisher?: string | null
          job_required_education?: Json | null
          job_required_experience?: Json | null
          job_required_skills?: string | null
          job_salary_currency?: string | null
          job_salary_period?: string | null
          job_search_id?: string | null
          job_state?: string | null
          job_title?: string | null
          last_updated_at?: string
          queries?: string[] | null
        }
        Update: {
          created_at?: string
          employer_logo?: string | null
          employer_name?: string | null
          employer_website?: string | null
          is_public?: boolean
          job_apply_is_direct?: boolean | null
          job_apply_link?: string | null
          job_apply_quality_score?: string | null
          job_benefits?: string[] | null
          job_city?: string | null
          job_country?: string | null
          job_description?: string | null
          job_employment_type?: string | null
          job_experience_in_place_of_education?: boolean | null
          job_google_link?: string | null
          job_highlights?: Json | null
          job_id?: string
          job_is_remote?: boolean | null
          job_latitude?: string | null
          job_longitude?: string | null
          job_max_salary?: number | null
          job_min_salary?: number | null
          job_offer_expiration_datetime_utc?: string | null
          job_offer_expiration_timestamp?: number | null
          job_onet_job_zone?: string | null
          job_onet_soc?: string | null
          job_posted_at_datetime_utc?: string | null
          job_posted_at_timestamp?: number | null
          job_posting_language?: string | null
          job_publisher?: string | null
          job_required_education?: Json | null
          job_required_experience?: Json | null
          job_required_skills?: string | null
          job_salary_currency?: string | null
          job_salary_period?: string | null
          job_search_id?: string | null
          job_state?: string | null
          job_title?: string | null
          last_updated_at?: string
          queries?: string[] | null
        }
        Relationships: []
      }
      jobs_search_history: {
        Row: {
          active: boolean | null
          created_at: string
          date_posted: string | null
          employee_id: string | null
          experience: string | null
          job_type: string | null
          jobs_search_history_id: string
          jobs_suggestions: string[] | null
          last_updated_at: string
          query: string | null
          remote: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          date_posted?: string | null
          employee_id?: string | null
          experience?: string | null
          job_type?: string | null
          jobs_search_history_id?: string
          jobs_suggestions?: string[] | null
          last_updated_at?: string
          query?: string | null
          remote?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          date_posted?: string | null
          employee_id?: string | null
          experience?: string | null
          job_type?: string | null
          jobs_search_history_id?: string
          jobs_suggestions?: string[] | null
          last_updated_at?: string
          query?: string | null
          remote?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_search_history_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      jobs_updation: {
        Row: {
          created_at: string
          jobs_updation_id: string
          last_updated_at: string
          query: string | null
        }
        Insert: {
          created_at?: string
          jobs_updation_id?: string
          last_updated_at?: string
          query?: string | null
        }
        Update: {
          created_at?: string
          jobs_updation_id?: string
          last_updated_at?: string
          query?: string | null
        }
        Relationships: []
      }
      linkedin_profile_cache: {
        Row: {
          company: string
          created_at: string
          id: number
          location: string
          results: string[]
          role: string
          updated_at: string | null
        }
        Insert: {
          company?: string
          created_at?: string
          id?: number
          location?: string
          results?: string[]
          role?: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          id?: number
          location?: string
          results?: string[]
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      linkedin_profiles: {
        Row: {
          about: string | null
          city: string | null
          company: string | null
          company_domain: string | null
          company_employee_range: string | null
          company_industry: string | null
          company_linkedin_url: string | null
          company_logo_url: string | null
          company_website: string | null
          company_year_founded: string | null
          connections_count: string | null
          country: string | null
          created_at: string
          current_company_join_month: string | null
          current_company_join_year: string | null
          educations: Json[] | null
          experiences: Json[] | null
          first_name: string | null
          followers_count: string | null
          full_name: string | null
          headline: string | null
          hq_city: string | null
          hq_country: string | null
          hq_region: string | null
          job_title: string | null
          languages: string | null
          last_name: string | null
          last_updated_at: string
          linkedin_profiles_id: string
          linkedin_url: string | null
          location: string | null
          profile_id: string | null
          profile_image_url: string | null
          public_id: string | null
          school: string | null
          skills: string | null
          state: string | null
        }
        Insert: {
          about?: string | null
          city?: string | null
          company?: string | null
          company_domain?: string | null
          company_employee_range?: string | null
          company_industry?: string | null
          company_linkedin_url?: string | null
          company_logo_url?: string | null
          company_website?: string | null
          company_year_founded?: string | null
          connections_count?: string | null
          country?: string | null
          created_at?: string
          current_company_join_month?: string | null
          current_company_join_year?: string | null
          educations?: Json[] | null
          experiences?: Json[] | null
          first_name?: string | null
          followers_count?: string | null
          full_name?: string | null
          headline?: string | null
          hq_city?: string | null
          hq_country?: string | null
          hq_region?: string | null
          job_title?: string | null
          languages?: string | null
          last_name?: string | null
          last_updated_at?: string
          linkedin_profiles_id?: string
          linkedin_url?: string | null
          location?: string | null
          profile_id?: string | null
          profile_image_url?: string | null
          public_id?: string | null
          school?: string | null
          skills?: string | null
          state?: string | null
        }
        Update: {
          about?: string | null
          city?: string | null
          company?: string | null
          company_domain?: string | null
          company_employee_range?: string | null
          company_industry?: string | null
          company_linkedin_url?: string | null
          company_logo_url?: string | null
          company_website?: string | null
          company_year_founded?: string | null
          connections_count?: string | null
          country?: string | null
          created_at?: string
          current_company_join_month?: string | null
          current_company_join_year?: string | null
          educations?: Json[] | null
          experiences?: Json[] | null
          first_name?: string | null
          followers_count?: string | null
          full_name?: string | null
          headline?: string | null
          hq_city?: string | null
          hq_country?: string | null
          hq_region?: string | null
          job_title?: string | null
          languages?: string | null
          last_name?: string | null
          last_updated_at?: string
          linkedin_profiles_id?: string
          linkedin_url?: string | null
          location?: string | null
          profile_id?: string | null
          profile_image_url?: string | null
          public_id?: string | null
          school?: string | null
          skills?: string | null
          state?: string | null
        }
        Relationships: []
      }
      manage_member: {
        Row: {
          archive: boolean
          company_id: string | null
          created_at: string | null
          description: string | null
          id: number
          members: string[]
          team_id: string | null
          team_name: string
        }
        Insert: {
          archive: boolean
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          members: string[]
          team_id?: string | null
          team_name: string
        }
        Update: {
          archive?: boolean
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          members?: string[]
          team_id?: string | null
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "manage_member_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "company"
            referencedColumns: ["company_id"]
          }
        ]
      }
      master_company: {
        Row: {
          domain: string | null
          linkedin: string | null
          location: string[] | null
          master_company_id: string
          name: string | null
        }
        Insert: {
          domain?: string | null
          linkedin?: string | null
          location?: string[] | null
          master_company_id?: string
          name?: string | null
        }
        Update: {
          domain?: string | null
          linkedin?: string | null
          location?: string[] | null
          master_company_id?: string
          name?: string | null
        }
        Relationships: []
      }
      module_credit: {
        Row: {
          credit: number
          id: string
          name: string
        }
        Insert: {
          credit?: number
          id?: string
          name: string
        }
        Update: {
          credit?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      new_resume: {
        Row: {
          basics: Json
          created_at: string
          id: string
          image: string
          is_public: boolean
          meta_data: Json
          name: string
          sections: Json
          short_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          basics?: Json
          created_at?: string
          id?: string
          image?: string
          is_public: boolean
          meta_data?: Json
          name: string
          sections?: Json
          short_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          basics?: Json
          created_at?: string
          id?: string
          image?: string
          is_public?: boolean
          meta_data?: Json
          name?: string
          sections?: Json
          short_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "new_resume_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          employee_id: string | null
          heading: string | null
          id: number
          seen: boolean | null
          senderdetails: Json | null
          text: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          heading?: string | null
          id?: number
          seen?: boolean | null
          senderdetails?: Json | null
          text?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          heading?: string | null
          id?: number
          seen?: boolean | null
          senderdetails?: Json | null
          text?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          description: string | null
          employee_id: string | null
          id: string
          is_active: boolean | null
          language: Json[] | null
          skill: Json[] | null
          title: string | null
        }
        Insert: {
          description?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          language?: Json[] | null
          skill?: Json[] | null
          title?: string | null
        }
        Update: {
          description?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          language?: Json[] | null
          skill?: Json[] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      profile_contact: {
        Row: {
          address: string | null
          birthday: string | null
          email: string | null
          employee_id: string | null
          id: string
          phone_number: string | null
          social: Json | null
          website: Json[] | null
        }
        Insert: {
          address?: string | null
          birthday?: string | null
          email?: string | null
          employee_id?: string | null
          id?: string
          phone_number?: string | null
          social?: Json | null
          website?: Json[] | null
        }
        Update: {
          address?: string | null
          birthday?: string | null
          email?: string | null
          employee_id?: string | null
          id?: string
          phone_number?: string | null
          social?: Json | null
          website?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_contact_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      profile_education: {
        Row: {
          created_at: string | null
          degree_name: string | null
          end_date: string | null
          field_of_study: string | null
          gpa: string | null
          id: string
          location: string | null
          order_index: number
          profile_id: string | null
          skill: Json[] | null
          start_date: string | null
          university_name: string | null
        }
        Insert: {
          created_at?: string | null
          degree_name?: string | null
          end_date?: string | null
          field_of_study?: string | null
          gpa?: string | null
          id?: string
          location?: string | null
          order_index: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
          university_name?: string | null
        }
        Update: {
          created_at?: string | null
          degree_name?: string | null
          end_date?: string | null
          field_of_study?: string | null
          gpa?: string | null
          id?: string
          location?: string | null
          order_index?: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
          university_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_education_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_experience: {
        Row: {
          company: string | null
          created_at: string | null
          currently_working: boolean | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          location_type: string | null
          order_index: number
          profile_id: string | null
          skill: Json[] | null
          start_date: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          currently_working?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          location_type?: string | null
          order_index: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          currently_working?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          location_type?: string | null
          order_index?: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_experience_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_loc: {
        Row: {
          created_at: string | null
          description: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issued_by: string | null
          name: string | null
          order_index: number
          profile_id: string | null
          skill: Json[] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issued_by?: string | null
          name?: string | null
          order_index: number
          profile_id?: string | null
          skill?: Json[] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issued_by?: string | null
          name?: string | null
          order_index?: number
          profile_id?: string | null
          skill?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_loc_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_project: {
        Row: {
          affiliation: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string | null
          order_index: number
          profile_id: string | null
          skill: Json[] | null
          start_date: string | null
        }
        Insert: {
          affiliation?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          order_index: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
        }
        Update: {
          affiliation?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          order_index?: number
          profile_id?: string | null
          skill?: Json[] | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_project_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile_setting: {
        Row: {
          emails: Json[] | null
          employee_id: string
          notifications: Json[] | null
        }
        Insert: {
          emails?: Json[] | null
          employee_id: string
          notifications?: Json[] | null
        }
        Update: {
          emails?: Json[] | null
          employee_id?: string
          notifications?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_setting_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
      progress_status: {
        Row: {
          coach_onboarding: Json
          created_at: string
          employee_id: string
          interview: Json
          onboarding: Json
          profile: Json
          resume: Json
          user_id: string
        }
        Insert: {
          coach_onboarding?: Json
          created_at?: string
          employee_id: string
          interview?: Json
          onboarding?: Json
          profile?: Json
          resume?: Json
          user_id: string
        }
        Update: {
          coach_onboarding?: Json
          created_at?: string
          employee_id?: string
          interview?: Json
          onboarding?: Json
          profile?: Json
          resume?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_status_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "progress_status_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      public_jobs: {
        Row: {
          benefits: string[] | null
          company: string | null
          company_details: string | null
          created_at: string
          description: string | null
          id: string
          is_campus: boolean
          job_criteria: Json | null
          job_title: string | null
          job_type: string | null
          location: string | null
          logo: string | null
          overview: string | null
          posted_by: string
          qualifications: string[] | null
          recruiter_id: string
          requirements: string[] | null
          responsibilities: string[] | null
          screening_questions: Json[] | null
          screening_setting: Json | null
          skills: string[] | null
          slug: string
          status: string | null
          workplace_type: string | null
        }
        Insert: {
          benefits?: string[] | null
          company?: string | null
          company_details?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_campus?: boolean
          job_criteria?: Json | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          overview?: string | null
          posted_by?: string
          qualifications?: string[] | null
          recruiter_id?: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          skills?: string[] | null
          slug?: string
          status?: string | null
          workplace_type?: string | null
        }
        Update: {
          benefits?: string[] | null
          company?: string | null
          company_details?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_campus?: boolean
          job_criteria?: Json | null
          job_title?: string | null
          job_type?: string | null
          location?: string | null
          logo?: string | null
          overview?: string | null
          posted_by?: string
          qualifications?: string[] | null
          recruiter_id?: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          screening_questions?: Json[] | null
          screening_setting?: Json | null
          skills?: string[] | null
          slug?: string
          status?: string | null
          workplace_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_jobs_fkey"
            columns: ["recruiter_id"]
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          }
        ]
      }
      queries: {
        Row: {
          assignment_id: string | null
          created_at: string | null
          description: string | null
          id: string
          new: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          assignment_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          new?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          assignment_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          new?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "queries_assignment_id_fkey"
            columns: ["assignment_id"]
            referencedRelation: "career_coach_assignment"
            referencedColumns: ["assignment_id"]
          }
        ]
      }
      query_messages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          query_id: string | null
          sender: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          query_id?: string | null
          sender?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          query_id?: string | null
          sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "query_messages_queries_id_fkey"
            columns: ["query_id"]
            referencedRelation: "queries"
            referencedColumns: ["id"]
          }
        ]
      }
      recruiter: {
        Row: {
          address: Json | null
          application_process: string | null
          available_roles: string[]
          benefits: string | null
          company_overview: string | null
          company_values: string | null
          company_website: string | null
          departments: string[]
          e_o_statement: string | null
          email: string | null
          email_template: Json
          employment_type: Json
          hr_contact: Json | null
          id: string
          industry: string | null
          logo: string | null
          m_v_statement: string | null
          name: string | null
          office_locations: string[]
          phone_number: string | null
          primary_contact: Json | null
          recruiter_type: string | null
          socials: Json
          technology_score: string[]
          user_id: string
          workplace_type: Json
        }
        Insert: {
          address?: Json | null
          application_process?: string | null
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          departments?: string[]
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employment_type?: Json
          hr_contact?: Json | null
          id?: string
          industry?: string | null
          logo?: string | null
          m_v_statement?: string | null
          name?: string | null
          office_locations?: string[]
          phone_number?: string | null
          primary_contact?: Json | null
          recruiter_type?: string | null
          socials?: Json
          technology_score?: string[]
          user_id: string
          workplace_type?: Json
        }
        Update: {
          address?: Json | null
          application_process?: string | null
          available_roles?: string[]
          benefits?: string | null
          company_overview?: string | null
          company_values?: string | null
          company_website?: string | null
          departments?: string[]
          e_o_statement?: string | null
          email?: string | null
          email_template?: Json
          employment_type?: Json
          hr_contact?: Json | null
          id?: string
          industry?: string | null
          logo?: string | null
          m_v_statement?: string | null
          name?: string | null
          office_locations?: string[]
          phone_number?: string | null
          primary_contact?: Json | null
          recruiter_type?: string | null
          socials?: Json
          technology_score?: string[]
          user_id?: string
          workplace_type?: Json
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      referral_coach: {
        Row: {
          coach_id: string | null
          referral_code: string | null
        }
        Insert: {
          coach_id?: string | null
          referral_code?: string | null
        }
        Update: {
          coach_id?: string | null
          referral_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_coach_coach_id_fkey"
            columns: ["coach_id"]
            referencedRelation: "career_coach"
            referencedColumns: ["coach_id"]
          },
          {
            foreignKeyName: "referral_coach_referral_code_fkey"
            columns: ["referral_code"]
            referencedRelation: "referrals"
            referencedColumns: ["referral_code"]
          }
        ]
      }
      referral_code_signup: {
        Row: {
          created_at: string
          id: number
          referral_code: string
          signup_status: string | null
          user_email: string
        }
        Insert: {
          created_at?: string
          id?: number
          referral_code: string
          signup_status?: string | null
          user_email: string
        }
        Update: {
          created_at?: string
          id?: number
          referral_code?: string
          signup_status?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_code_signup_referral_code_fkey"
            columns: ["referral_code"]
            referencedRelation: "referrals"
            referencedColumns: ["referral_code"]
          }
        ]
      }
      referrals: {
        Row: {
          id: string
          name: string
          referral_code: string | null
          signup_count: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          referral_code?: string | null
          signup_count?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          referral_code?: string | null
          signup_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      resume: {
        Row: {
          archive: boolean
          completion_status: Json | null
          content_metadata: Json
          country: string | null
          created_at: string | null
          customization: Json | null
          email: string | null
          employee_id: string | null
          experience_level: string | null
          field: string | null
          first_edit: boolean
          full_name: string | null
          linkedin_url: string | null
          phone_number: string | null
          portfolio_link: string | null
          profession: string | null
          profile_picture: string | null
          resume_id: string
          template: string | null
          template_image: string | null
          title: string
        }
        Insert: {
          archive?: boolean
          completion_status?: Json | null
          content_metadata?: Json
          country?: string | null
          created_at?: string | null
          customization?: Json | null
          email?: string | null
          employee_id?: string | null
          experience_level?: string | null
          field?: string | null
          first_edit?: boolean
          full_name?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          portfolio_link?: string | null
          profession?: string | null
          profile_picture?: string | null
          resume_id?: string
          template?: string | null
          template_image?: string | null
          title: string
        }
        Update: {
          archive?: boolean
          completion_status?: Json | null
          content_metadata?: Json
          country?: string | null
          created_at?: string | null
          customization?: Json | null
          email?: string | null
          employee_id?: string | null
          experience_level?: string | null
          field?: string | null
          first_edit?: boolean
          full_name?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          portfolio_link?: string | null
          profession?: string | null
          profile_picture?: string | null
          resume_id?: string
          template?: string | null
          template_image?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "resume_template_fkey"
            columns: ["template"]
            referencedRelation: "resume_templates"
            referencedColumns: ["resume_templates_id"]
          }
        ]
      }
      resume_certification: {
        Row: {
          created_at: string | null
          institute: string | null
          name: string | null
          order_index: number
          relevant: string | null
          resume_certification_id: string
          resume_id: string
          year: string | null
        }
        Insert: {
          created_at?: string | null
          institute?: string | null
          name?: string | null
          order_index?: number
          relevant?: string | null
          resume_certification_id?: string
          resume_id: string
          year?: string | null
        }
        Update: {
          created_at?: string | null
          institute?: string | null
          name?: string | null
          order_index?: number
          relevant?: string | null
          resume_certification_id?: string
          resume_id?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_certification_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_custom_sections: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          items_list: Json[] | null
          order_index: number | null
          resume_custom_sections_id: string | null
          resume_id: string
          section_title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          items_list?: Json[] | null
          order_index?: number | null
          resume_custom_sections_id?: string | null
          resume_id: string
          section_title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          items_list?: Json[] | null
          order_index?: number | null
          resume_custom_sections_id?: string | null
          resume_id?: string
          section_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_custom_sections_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_education: {
        Row: {
          created_at: string | null
          degree_name: string | null
          gpa: string | null
          location: string | null
          order_index: number
          resume_education_id: string
          resume_id: string
          university_name: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          degree_name?: string | null
          gpa?: string | null
          location?: string | null
          order_index?: number
          resume_education_id?: string
          resume_id: string
          university_name?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          degree_name?: string | null
          gpa?: string | null
          location?: string | null
          order_index?: number
          resume_education_id?: string
          resume_id?: string
          university_name?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_education_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_experience: {
        Row: {
          company: string | null
          content_meta_data: Json | null
          created_at: string | null
          end_date: string | null
          history: Json[] | null
          location: string | null
          order_index: number
          responsibilities: string | null
          resume_experience_id: string
          resume_id: string
          role: string | null
          start_date: string | null
        }
        Insert: {
          company?: string | null
          content_meta_data?: Json | null
          created_at?: string | null
          end_date?: string | null
          history?: Json[] | null
          location?: string | null
          order_index: number
          responsibilities?: string | null
          resume_experience_id?: string
          resume_id: string
          role?: string | null
          start_date?: string | null
        }
        Update: {
          company?: string | null
          content_meta_data?: Json | null
          created_at?: string | null
          end_date?: string | null
          history?: Json[] | null
          location?: string | null
          order_index?: number
          responsibilities?: string | null
          resume_experience_id?: string
          resume_id?: string
          role?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_experience_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_project: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          order_index: number
          organization: string | null
          resume_id: string
          resume_project_id: string
          start_date: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          order_index?: number
          organization?: string | null
          resume_id: string
          resume_project_id?: string
          start_date?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          order_index?: number
          organization?: string | null
          resume_id?: string
          resume_project_id?: string
          start_date?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_project_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_skill: {
        Row: {
          content_meta_data: Json | null
          created_at: string | null
          experience_level: number | null
          order_index: number
          resume_id: string
          resume_skill_id: string
          skill: string | null
        }
        Insert: {
          content_meta_data?: Json | null
          created_at?: string | null
          experience_level?: number | null
          order_index?: number
          resume_id: string
          resume_skill_id?: string
          skill?: string | null
        }
        Update: {
          content_meta_data?: Json | null
          created_at?: string | null
          experience_level?: number | null
          order_index?: number
          resume_id?: string
          resume_skill_id?: string
          skill?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_skill_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_summary: {
        Row: {
          content_meta_data: Json | null
          created_at: string | null
          history: Json[] | null
          resume_id: string
          resume_summary_id: string
          summary: string | null
        }
        Insert: {
          content_meta_data?: Json | null
          created_at?: string | null
          history?: Json[] | null
          resume_id: string
          resume_summary_id?: string
          summary?: string | null
        }
        Update: {
          content_meta_data?: Json | null
          created_at?: string | null
          history?: Json[] | null
          resume_id?: string
          resume_summary_id?: string
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_summary_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      resume_templates: {
        Row: {
          created_at: string | null
          custom_styles: Json | null
          customizations: Json[] | null
          image: string | null
          order_index: number
          resume_templates_id: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string | null
          custom_styles?: Json | null
          customizations?: Json[] | null
          image?: string | null
          order_index?: number
          resume_templates_id?: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string | null
          custom_styles?: Json | null
          customizations?: Json[] | null
          image?: string | null
          order_index?: number
          resume_templates_id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      review_resume: {
        Row: {
          coach_id: string
          coach_last_updated: string | null
          created_at: string | null
          deadline: string | null
          emp_last_updated: string | null
          employee_id: string
          experience_level: string | null
          id: number
          notes: string | null
          resume_id: string
          review: Json[]
          review_resume_id: string | null
          status: string
        }
        Insert: {
          coach_id: string
          coach_last_updated?: string | null
          created_at?: string | null
          deadline?: string | null
          emp_last_updated?: string | null
          employee_id: string
          experience_level?: string | null
          id?: number
          notes?: string | null
          resume_id: string
          review?: Json[]
          review_resume_id?: string | null
          status?: string
        }
        Update: {
          coach_id?: string
          coach_last_updated?: string | null
          created_at?: string | null
          deadline?: string | null
          emp_last_updated?: string | null
          employee_id?: string
          experience_level?: string | null
          id?: number
          notes?: string | null
          resume_id?: string
          review?: Json[]
          review_resume_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_resume_coach_id_fkey"
            columns: ["coach_id"]
            referencedRelation: "career_coach"
            referencedColumns: ["coach_id"]
          },
          {
            foreignKeyName: "review_resume_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "review_resume_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resume"
            referencedColumns: ["resume_id"]
          }
        ]
      }
      salary_estimation: {
        Row: {
          api_response: Json | null
          created_at: string | null
          id: number
          job_title: string | null
          location: string | null
        }
        Insert: {
          api_response?: Json | null
          created_at?: string | null
          id?: number
          job_title?: string | null
          location?: string | null
        }
        Update: {
          api_response?: Json | null
          created_at?: string | null
          id?: number
          job_title?: string | null
          location?: string | null
        }
        Relationships: []
      }
      session_feedback: {
        Row: {
          created_at: string
          details: Json
          feedback: string | null
          feedback_by: string
          feedback_for: string
          ratings: Json | null
          session_feedback_id: string
          type: string
        }
        Insert: {
          created_at?: string
          details: Json
          feedback?: string | null
          feedback_by: string
          feedback_for: string
          ratings?: Json | null
          session_feedback_id?: string
          type: string
        }
        Update: {
          created_at?: string
          details?: Json
          feedback?: string | null
          feedback_by?: string
          feedback_for?: string
          ratings?: Json | null
          session_feedback_id?: string
          type?: string
        }
        Relationships: []
      }
      support_ticket: {
        Row: {
          action_pending: Json
          assign_to: string | null
          attachments: string[] | null
          company_id: string | null
          content: Json[]
          created_at: string | null
          id: string
          job_id: string | null
          priority: string
          state: string
          title: string
          type: string[]
          updated_at: string | null
          user_id: string
          user_name: string
        }
        Insert: {
          action_pending?: Json
          assign_to?: string | null
          attachments?: string[] | null
          company_id?: string | null
          content?: Json[]
          created_at?: string | null
          id?: string
          job_id?: string | null
          priority?: string
          state?: string
          title: string
          type: string[]
          updated_at?: string | null
          user_id: string
          user_name: string
        }
        Update: {
          action_pending?: Json
          assign_to?: string | null
          attachments?: string[] | null
          company_id?: string | null
          content?: Json[]
          created_at?: string | null
          id?: string
          job_id?: string | null
          priority?: string
          state?: string
          title?: string
          type?: string[]
          updated_at?: string | null
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "recruiter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "public_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      url_auth: {
        Row: {
          auth_token: string
          created_at: string | null
          ip: string
        }
        Insert: {
          auth_token?: string
          created_at?: string | null
          ip: string
        }
        Update: {
          auth_token?: string
          created_at?: string | null
          ip?: string
        }
        Relationships: []
      }
      user_credit: {
        Row: {
          created_at: string | null
          credit: number
          customer_id: string
          last_updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credit?: number
          customer_id?: string
          last_updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          credit?: number
          customer_id?: string
          last_updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credit_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_feedback: {
        Row: {
          created_at: string | null
          description: string | null
          employee_id: string | null
          rating: number | null
          title: string | null
          type: string | null
          user_feedback_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          employee_id?: string | null
          rating?: number | null
          title?: string | null
          type?: string | null
          user_feedback_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          employee_id?: string | null
          rating?: number | null
          title?: string | null
          type?: string | null
          user_feedback_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employee"
            referencedColumns: ["employee_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      chat_notification_upsert: {
        Args: {
          in_assignment_id: string
          in_sender_id: string
          in_receiver_id: string
          in_message: string
        }
        Returns: boolean
      }
      duplicate_resume: {
        Args: {
          existing_resume_id: string
        }
        Returns: undefined
      }
      get_job_application_count: {
        Args: {
          table_name: string
          filter_column: string
          filter_value: string
        }
        Returns: number
      }
      getquerieswithmessagesbyassignmentid: {
        Args: {
          assignmentid: string
        }
        Returns: {
          id: string
          created_at: string
          title: string
          description: string
          assignment_id: string
          new: string
          updated_at: string
          messages: Json[]
        }[]
      }
      increment_signup_count:
        | {
            Args: {
              ref_code: string
              user_email: string
            }
            Returns: {
              id: string
              name: string
              referral_code: string | null
              signup_count: number | null
              user_id: string | null
            }
          }
        | {
            Args: {
              ref_code: string
            }
            Returns: {
              id: string
              name: string
              referral_code: string | null
              signup_count: number | null
              user_id: string | null
            }
          }
      insert_referral: {
        Args: {
          new_name: string
        }
        Returns: {
          id: string
          name: string
          referral_code: string | null
          signup_count: number | null
          user_id: string | null
        }
      }
      test_all_rows: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          employer_logo: string | null
          employer_name: string | null
          employer_website: string | null
          is_public: boolean
          job_apply_is_direct: boolean | null
          job_apply_link: string | null
          job_apply_quality_score: string | null
          job_benefits: string[] | null
          job_city: string | null
          job_country: string | null
          job_description: string | null
          job_employment_type: string | null
          job_experience_in_place_of_education: boolean | null
          job_google_link: string | null
          job_highlights: Json | null
          job_id: string
          job_is_remote: boolean | null
          job_latitude: string | null
          job_longitude: string | null
          job_max_salary: number | null
          job_min_salary: number | null
          job_offer_expiration_datetime_utc: string | null
          job_offer_expiration_timestamp: number | null
          job_onet_job_zone: string | null
          job_onet_soc: string | null
          job_posted_at_datetime_utc: string | null
          job_posted_at_timestamp: number | null
          job_posting_language: string | null
          job_publisher: string | null
          job_required_education: Json | null
          job_required_experience: Json | null
          job_required_skills: string | null
          job_salary_currency: string | null
          job_salary_period: string | null
          job_search_id: string | null
          job_state: string | null
          job_title: string | null
          last_updated_at: string
          queries: string[] | null
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
