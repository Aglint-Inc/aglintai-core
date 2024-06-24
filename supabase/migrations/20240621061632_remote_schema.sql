set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_email_templates(recruiter_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    template_data text;
    template_row text[];
    template_type text;
    template_id uuid;
    template_created_at timestamp with time zone;
    template_from_name text;
    template_subject text;
    template_body text;
BEGIN
    -- Sample CSV data as text (assuming you have it loaded or read from somewhere)
    template_data := 'debrief_email_interviewer,0a853069-11e1-4535-b934-a4d6c63de108,2024-05-29 14:31:34.671027+00,{ { interviewerFirstName } },d353b3a0-3e19-45d0-8623-4bd35577f548,Invitation to Debrief Session for { { candidateName } }\''s Interview for {{jobRole}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"interviewerFirstName\">{{interviewerFirstName}}</span>,</p><p></p><p>Please join the debrief session to discuss <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{candidateName}}</span>\''s interview for <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{jobRole}}</span>. Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{companyName}}</span> Recruitment Team</p>"
applicantReject_email_applicant,5ea9c5ab-5db7-4dbd-a7d9-3ab746c1f06e,2024-06-10 09:13:04.296532+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Your application at {{ companyName }},"<p>Hi {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>{{ companyName }}</p>"
interviewStart_slack_interviewers,5982f1ac-a435-467f-96c3-c56582ed8ba8,2024-06-07 09:55:31.009397+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Interview reminder,"Interview reminder"
phoneScreen_email_candidate,4e0609a2-33db-436d-83a3-3d39da234a0e,2024-05-30 07:09:49.95669+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}},"<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>"
interviewEnd_slack_interviewers,80fe6406-7f15-4205-9037-7a0df51cf2b8,2024-06-06 14:20:30.664329+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Slack RSVP Message,"Coding Interview scheduled with candidate: Aman Aman - Staff Frontend Engineer Meeting Place: google_meet Meeting Time: June 10 04:00 AM - 04:30 AM IST Duration: 30 Minutes"
interviewerConfirmation_slack_interviewers,b51a20bb-ae5a-4dc3-a6e5-96a6b8a952b7,2024-06-06 09:21:32.785312+00,,d353b3a0-3e19-45d0-8623-4bd35577f548,Confirmation Slack Message To Interviewer,"Initial Screening scheduled with candidate: Muharrem Muharrem - Staff Software Engineer Meeting Place: google_meet Meeting Time: June 13 04:30 AM - 05:00 AM IST Duration: 30 Minutes"
interviewCancel_email_applicant,3bef4198-e7d7-48cd-b127-61d23dfbe309,2024-05-30 07:14:36.704522+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Cancellation: {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
interviewStart_email_applicant,80587302-95f6-49e9-b467-b954937ef996,2024-06-05 07:03:07.427382+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Reminder: {{jobRole}} Position at {{companyName}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateFirstName\">{{ candidateFirstName }}</span>,</p><p></p><p style=\"text-align: start\">This is a friendly reminder of your upcoming interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> scheduled for <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"startDate\">{{ startDate }}</span> <strong>at</strong> <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"time\">{{ time }}</span>.</p><p style=\"text-align: start\"></p><p style=\"text-align: start\">We look forward to a successful interview!</p><p style=\"text-align: start\"></p><p style=\"text-align: start\">Warm regards,</p><p style=\"text-align: start\">The <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> Team</p>"
selfScheduleReminder_email_applicant,68d46030-fc59-4b69-b388-4ccd02a3d685,2024-06-11 04:22:27.85218+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Reminder: Schedule Your Interview for {{jobRole}} at {{companyName}},"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateFirstName\">{{ candidateFirstName }}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>.</p><p></p><p>Please use the following link to schedule your interview: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"selfScheduleLink\">{{ selfScheduleLink }}</span></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
rescheduleRequest_email_candidate,bb456baf-8ca5-4c15-bd95-235e9b4cb889,2024-06-06 09:33:08.96832+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Request to Reschedule Interview for {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>We need to reschedule your interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span>. Please use the link below to select a new date and time that works for you.</p><p></p><p>Reschedule your interview: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"rescheduleLink\">{{ rescheduleLink }}</span></p><p>Sorry for any inconvenience this may cause, and we look forward to speaking with you soon.</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
rescheduleConfirm_email_candidate,1352fa6a-9799-4765-9d98-3a20a5aa1e88,2024-05-28 05:24:14.334442+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Interview Rescheduled for {{jobRole}} Position,"<p>Dear <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"candidateName\">{{ candidateName }}</span>,</p><p></p><p>Your interview for the <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"jobRole\">{{ jobRole }}</span> position at <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span> has been rescheduled as per your request.</p><p></p><p>Please find the new details below:</p><p>Date: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"newDate\">{{ newDate }}</span></p><p>Time: <span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"newTime\">{{ newTime }}</span></p><p></p><p>Looking forward to our conversation!</p><p></p><p>Best regards,</p><p><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"recruiterName\">{{ recruiterName }}</span><br><span class=\"temp-variable\" data-type=\"temp-variable\" data-id=\"companyName\">{{ companyName }}</span></p>"
offerSend_email_candidate,16d95a4c-0af2-4ba6-996d-5c0a7ac03f5c,2024-06-12 04:36:56.188787+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Congratulations! You\''ve Been Selected for the {{ jobTitle }} Position at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>We are delighted to inform you that you have been selected for the {{ jobTitle }} position at {{ companyName }}.</p><p>Please find the attached offer letter for your review. If you have any questions or need further information, do not hesitate to reach out.</p><p>We are excited to have you join our team and look forward to your positive response.</p><p>Best regards,</p><p>{{ recruiterFullName }}</p>"
applicantReject_email_candidate,ebd38e2c-eeb7-46c6-b1c3-0fbd8a234a01,2024-06-10 09:27:50.265145+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Update on Your Application at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position at {{ companyName }} and for taking the time to apply and interview with us.</p><p>We regret to inform you that we have decided to move forward with another candidate for this position.</p><p>We appreciate your effort and interest in our company and wish you all the best in your future endeavors.</p><p>Best regards,</p><p>{{ recruiterName }}</p>"
firstRound_email_candidate,6ef32992-fad7-4b0a-b321-11853ae89ef6,2024-05-27 09:44:41.226378+00,{{ recruiterName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Next Steps: First Round Interview for {{ jobTitle }} at {{ companyName }},"<p>Dear {{ candidateFirstName }},</p><p>Congratulations! We were impressed by your application for the {{ jobTitle }} position at {{ companyName }} and would like to invite you to the first round of interviews.</p><p>Below are the details:</p><p>Date: {{ interviewDate }}</p><p>Time: {{ interviewTime }}</p><p>Location: {{ interviewLocation }}</p><p>We look forward to learning more about your qualifications and experience during this interview.</p><p>Best regards,</p><p>{{ recruiterName }}</p>"
offerAccept_email_candidate,9983a586-f75c-4f7e-b032-d0e7b9d450cf,2024-06-11 09:19:21.74592+00,{{ recruiterFullName }},d353b3a0-3e19-45d0-8623-4bd35577f548,Welcome to {{ companyName }}!,"<p>Dear {{ candidateFirstName }},</p><p>We are thrilled to welcome you to {{ companyName }} as our new {{ jobTitle }}!</p><p>Your start date is {{ startDate }}. Please find attached the details of your onboarding process.</p><p>Looking forward to working with you!</p><p>Best regards,</p><p>{{ recruiterFullName }}</p>"
';

    -- Split the CSV data into individual rows
    FOREACH template_row SLICE 1 IN ARRAY string_to_array(template_data, '\n')
    LOOP
        -- Split each row into columns
        template_row := string_to_array(template_row, ',');

        -- Assign variables from the row
        template_type := template_row[1];
        template_id := template_row[2]::uuid;
        template_created_at := template_row[3]::timestamp with time zone;
        template_from_name := template_row[4];
        -- template_to_id := template_row[5]::uuid;
        template_subject := template_row[6];
        template_body := template_row[7];

        -- Insert the data into the email_templates table
        INSERT INTO email_templates (
            template_type, 
          
            from_name, 
            recruiter_id, 
            subject, 
            body
        )
        VALUES (
            template_type,
            template_from_name, 
            recruiter_id, 
            template_subject, 
            template_body
        );
    END LOOP;
END;
$function$
;


