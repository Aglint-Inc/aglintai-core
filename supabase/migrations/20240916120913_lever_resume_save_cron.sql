select cron.unschedule('lever-resume-save');

select
  cron.schedule(
    'lever-resume-save',
    '10 seconds', 
    $$
    select lever_resume_save();
    $$
); 