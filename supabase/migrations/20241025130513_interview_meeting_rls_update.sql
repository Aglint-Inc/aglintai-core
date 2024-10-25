drop policy "auth only" on "public"."interview_meeting";

create policy "auth only"
on "public"."interview_meeting"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = interview_meeting.application_id))))
with check ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = interview_meeting.application_id))));



