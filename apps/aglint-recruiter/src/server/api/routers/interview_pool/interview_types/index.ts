import isBetween from 'dayjs/plugin/isBetween';
import { z } from 'zod';

import {
  //   type PrivateProcedure,
  //   privateProcedure,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import dayjs from '@/utils/dayjs';

dayjs.extend(isBetween);

export const interviewPoolModuleSchema = z.object({
  recruiter_id: z.string().uuid(),
});

const query = async ({
  ctx: { adminDb },
  input: { recruiter_id },
}: PublicProcedure<typeof interviewPoolModuleSchema>) => {
  const interview_types = (
    await adminDb
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  const allMeetings = (
    await adminDb
      .from('meeting_details')
      .select(
        'id,module_id,session_duration,status,start_time,end_time,application_status_view(processing_status)',
      )
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  // https://chatgpt.com/c/66e5c82e-03a4-800e-ae0d-8c899339ca0b
  function mergeMeetingsWithModules(
    modules: typeof interview_types,
    meetings: typeof allMeetings,
  ) {
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    return modules.map((module) => {
      const moduleMeetings = meetings.filter(
        (meeting) =>
          meeting.module_id === module.id &&
          (meeting.status === 'completed' ||
            meeting.status === 'confirmed' ||
            meeting.status === 'cancelled'),
      );

      const averageMeetingDuration =
        moduleMeetings.length > 0
          ? moduleMeetings.reduce(
              (sum, meeting) => sum + meeting.session_duration,
              0,
            ) / moduleMeetings.length
          : 0;

      const thisMonthCompletedCount = moduleMeetings.filter(
        (meeting) =>
          dayjs(meeting.start_time).isBetween(
            startOfMonth,
            endOfMonth,
            null,
            '[)',
          ) && meeting.status === 'completed',
      ).length;

      const thisMonthScheduledCount = moduleMeetings.filter(
        (meeting) =>
          dayjs(meeting.start_time).isBetween(
            startOfMonth,
            endOfMonth,
            null,
            '[)',
          ) && meeting.status === 'confirmed',
      ).length;

      const thisMonthCancelledCount = moduleMeetings.filter(
        (meeting) =>
          dayjs(meeting.start_time).isBetween(
            startOfMonth,
            endOfMonth,
            null,
            '[)',
          ) && meeting.status === 'cancelled',
      ).length;

      // const interviewTypeMeetings = moduleMeetings.map((module) => {
      //   const { application_status_view, ...details } = module;
      //   return {
      //     ...details,
      //     application_status: application_status_view?.processing_status,
      //   };
      // });

      //pass rate cal
      const totalApplications = moduleMeetings?.length;
      const successfulApplications = moduleMeetings.filter(
        (meeting) =>
          meeting.application_status_view.processing_status === 'success',
      ).length;
      const passedRate =
        totalApplications > 0
          ? (successfulApplications / totalApplications) * 100
          : 0;

      return {
        ...module,
        meetings: moduleMeetings,
        average_meeting_duration: averageMeetingDuration,
        this_month_completed_count: thisMonthCompletedCount,
        this_month_scheduled_count: thisMonthScheduledCount,
        this_month_cancelled_count: thisMonthCancelledCount,
        passed_rate: Math.round(passedRate),
      };
    });
  }

  return mergeMeetingsWithModules(interview_types, allMeetings);
};

export const interviewPools = publicProcedure
  .input(interviewPoolModuleSchema)
  .query(query);
