ALTER TABLE public.company_email_template (
    CONSTRAINT company_email_template_ukey UNIQUE (recruiter_id, type)
)