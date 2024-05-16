import { supabase, supabaseWrap } from '../config/supabase';

export const logJobApplicationStatus = async (
  log: string,
  applicationId = '',
  isSaveToDb = false
) => {
  if (!isSaveToDb) {
    console.log(log);
  } else {
    console.log(log, applicationId);
  }
  if (!isSaveToDb) return;
  try {
    const [application] = supabaseWrap(
      await supabase
        .from('job_applications')
        .select('api_logs')
        .eq('application_id', applicationId)
    ) as any;

    let allLogs = [
      {
        message: log,
        date: new Date().toISOString(),
      },
    ];
    if (application.api_logs?.logs)
      allLogs = [...application.api_logs.logs, ...allLogs];

    supabaseWrap(
      await supabase
        .from('job_applications')
        .update({
          api_logs: {
            logs: allLogs,
          },
        })
        .eq('application_id', applicationId)
    );
  } catch (err) {
    console.log(err);
  }
};
