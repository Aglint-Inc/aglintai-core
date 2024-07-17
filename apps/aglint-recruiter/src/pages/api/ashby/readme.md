api/batchsave calls rpc ashbyjobreference which pick all candidates in the application_reference table which are there for jobs added to our public_jobs. public_job and ashby job reference is saved in job_reference table.

api/cron is called 1 hour once per recruiter who has added ashby_key. This api is triggered directly from supabase once an hour. This will trigger api/syncapplications which get all fresh candidates using an sync_token. It will check the application was there in db if already exist it updates if not it will create application_reference which inturn create job_application by calling batchsave. 

api/createapplication accepts ashby application json. In that json we get ashby candidate id where we get personal details. Also we get ashby handle id from which we fetch resume and store it in our db.
