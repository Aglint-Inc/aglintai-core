CREATE OR REPLACE FUNCTION public.fail_processing_applications()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  with processing_applications as (
    select 
      id,
      retry
    from
      applications
    where 
      processing_status = 'processing' and 
      processing_started_at < now() - interval '5 minutes' 
  ) 
  update 
    applications
  set 
    processing_status = 'failed',
    retry = 2
  from 
    processing_applications
  where 
    applications.id = processing_applications.id;
end;
$function$
;