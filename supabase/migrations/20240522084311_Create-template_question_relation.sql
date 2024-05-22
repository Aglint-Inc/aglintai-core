create table "public"."template_question_relation" (
    "id" uuid default uuid_generate_v4() not null PRIMARY KEY,
    "created_at" timestamp with time zone not null default now(),
    "template_id" uuid not null REFERENCES assessment_template(id) ON UPDATE CASCADE ON DELETE CASCADE,
    "question_id" uuid not null REFERENCES question_bank(id) ON UPDATE CASCADE ON DELETE CASCADE,
    "order" numeric
);