import {
  type GroupReqProgress,
  type ProgressNodeType,
  type RequesProgressMetaType,
} from '@request/components/RequestProgress/types';

import { type ReqNodesParamsType } from '../getRequestFormattedDetails';

export const getScheduleNodes = ({
  reqParams,
  scheduleFlow,
  grouped_progress,
  requestTargetMp,
  requestprogMp,
}: ReqNodesParamsType) => {
  const scheduleProgressNodes: RequesProgressMetaType['scheduleProgressNodes'] =
    [];
  const {
    availbilityGroupPrgs,
    interviewScheduledGroupPrgs,
    selectScheduleGroupPrgs,
  } = getCategorizedProgress({ grouped_progress, reqParams });

  const getSelectScheduleFlow = () => {
    const selectScheduleFlow: RequesProgressMetaType['scheduleProgressNodes'][0] =
      {
        type: 'SELECT_SCHEDULE',
        status: 'not_started',
        grouped_progress: [...selectScheduleGroupPrgs],
        workflows: [],
        banners: [],
      };

    if (scheduleFlow === null && reqParams.is_workflow_enabled) {
      selectScheduleFlow.banners.push('CHOOSE_SCHEDULE_FLOW');
    }

    const status_event = reqParams.request_progress.find(
      (p) =>
        p.is_progress_step === false &&
        (p.event_type === 'SELF_SCHEDULE_LINK' ||
          p.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK'),
    );
    if (status_event) {
      selectScheduleFlow.status = status_event.status;
    }

    if (
      requestprogMp['REQ_CAND_AVAIL_EMAIL_LINK'] &&
      requestprogMp['REQ_CAND_AVAIL_EMAIL_LINK'].length === 0
    ) {
      selectScheduleFlow.status =
        requestprogMp['REQ_CAND_AVAIL_EMAIL_LINK'].find(
          (p) => p.is_progress_step === false,
        )?.status ?? 'not_started';
    }

    if (
      requestTargetMp['onRequestSchedule'] &&
      requestTargetMp['onRequestSchedule'].actions.length > 0 &&
      !(
        requestprogMp['SELF_SCHEDULE_LINK'] ||
        requestprogMp['REQ_CAND_AVAIL_EMAIL_LINK']
      )
    ) {
      selectScheduleFlow.workflows.push({
        ...requestTargetMp['onRequestSchedule'],
      });
    }

    if (selectScheduleFlow.status == 'completed') {
      return selectScheduleFlow;
    }
    // banners and workflow
    if (
      scheduleFlow === 'selfSchedule' &&
      !requestprogMp['SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE']
    ) {
      // banner and workflow
      if (
        requestTargetMp['selfScheduleReminder'] &&
        requestTargetMp['selfScheduleReminder'].actions.length > 0
      ) {
        selectScheduleFlow.workflows.push({
          ...requestTargetMp['selfScheduleReminder'],
        });
      } else {
        selectScheduleFlow.banners.push('SELFSCHEDULE_REMINDER');
      }
    } else if (
      scheduleFlow === 'availability' &&
      !requestprogMp['SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK']
    ) {
      if (
        requestTargetMp['sendAvailReqReminder'] &&
        requestTargetMp['sendAvailReqReminder'].actions.length > 0
      ) {
        selectScheduleFlow.workflows.push({
          ...requestTargetMp['sendAvailReqReminder'],
        });
      } else {
        selectScheduleFlow.banners.push('AVAILABILITY_REMINDER');
      }
    }

    return selectScheduleFlow;
  };

  const getInterviewScheduledFlow = () => {
    const interviewScheduled: RequesProgressMetaType['scheduleProgressNodes'][0] =
      {
        type: 'INTERVIEW_SCHEDULED',
        status: 'not_started',
        grouped_progress: [...interviewScheduledGroupPrgs],
        workflows: [],
        banners: [],
      };

    const status_event = reqParams.request_progress.find(
      (p) =>
        p.is_progress_step === false &&
        (p.event_type === 'CAND_CONFIRM_SLOT' ||
          p.event_type === 'RECRUITER_SCHEDULED'),
    );
    if (status_event) {
      interviewScheduled.status = status_event.status;
    }

    if (interviewScheduled.status == 'completed') {
      return interviewScheduled;
    }
    // banners and workflow
    if (!requestprogMp['SEND_INTERVIEWER_ATTENDANCE_RSVP']) {
      if (
        requestTargetMp['candidateBook'] &&
        requestTargetMp['candidateBook'].actions.length > 0
      ) {
        interviewScheduled.workflows.push({
          ...requestTargetMp['candidateBook'],
        });
      } else {
        interviewScheduled.banners.push('SLACK_CONFIRMATION');
      }
    }

    return interviewScheduled;
  };

  const getAvailbilityFlow = () => {
    const availScheduleProgressNodes: RequesProgressMetaType['scheduleProgressNodes'] =
      [
        {
          type: 'CAND_AVAIL_REC',
          status: 'not_started',
          grouped_progress: [],
          workflows: [],
          banners: [],
        },
      ];

    let idx = 0;
    for (const groupProg of availbilityGroupPrgs) {
      availScheduleProgressNodes[idx].grouped_progress.push(groupProg);
      if (
        groupProg.heading_progress.event_type ===
        'CANDIDATE_AVAILABILITY_RE_REQUESTED'
      ) {
        availScheduleProgressNodes.push({
          type: 'CAND_AVAIL_REC',
          status: 'not_started',
          grouped_progress: [],
          workflows: [],
          banners: [],
        });
        idx += 1;
      } else if (groupProg.heading_progress.event_type === 'CAND_AVAIL_REC') {
        availScheduleProgressNodes[idx].status = 'completed';
      }
    }

    for (const progNode of availScheduleProgressNodes) {
      if (progNode.status === 'completed') continue;

      if (
        !requestprogMp['SELF_SCHEDULE_LINK'] ||
        !requestprogMp['SLOT_SUGGESTION']
      ) {
        if (
          requestTargetMp['onReceivingAvailReq'] &&
          requestTargetMp['onReceivingAvailReq'].actions.length > 0
        ) {
          progNode.workflows.push({
            ...requestTargetMp['onReceivingAvailReq'],
          });
        } else {
          progNode.banners.push('AVAILABILITY_RECIEVED');
        }
      }
    }

    return availScheduleProgressNodes;
  };

  scheduleProgressNodes.push(getSelectScheduleFlow());
  if (scheduleFlow === 'availability') {
    const availNodes = getAvailbilityFlow();
    availNodes.forEach((node) => {
      scheduleProgressNodes.push(node);
    });
  }
  scheduleProgressNodes.push(getInterviewScheduledFlow());

  return scheduleProgressNodes;
};

const getCategorizedProgress = ({
  grouped_progress,
  reqParams,
}: Pick<ReqNodesParamsType, 'grouped_progress' | 'reqParams'>) => {
  const headingProgEvents = reqParams.request_progress.filter(
    (p) => p.is_progress_step === false,
  );

  let currentProgressNode: ProgressNodeType = 'SELECT_SCHEDULE';
  const selectScheduleGroupPrgs: GroupReqProgress[] = [];
  const availbilityGroupPrgs: GroupReqProgress[] = [];
  const interviewScheduledGroupPrgs: GroupReqProgress[] = [];

  for (const headingProg of headingProgEvents) {
    if (headingProg.event_type === 'CAND_AVAIL_REC') {
      currentProgressNode = 'CAND_AVAIL_REC';
    } else if (
      headingProg.event_type === 'CAND_CONFIRM_SLOT' ||
      headingProg.event_type === 'RECRUITER_SCHEDULED'
    ) {
      currentProgressNode = 'INTERVIEW_SCHEDULED';
    }
    const grouProgress = grouped_progress.find(
      (g) => g.group_id === headingProg.grouped_progress_id,
    );
    if (!grouProgress) {
      console.error('Error in grouping progress');
      continue;
    }
    if (currentProgressNode === 'SELECT_SCHEDULE') {
      selectScheduleGroupPrgs.push(grouProgress);
    } else if (currentProgressNode === 'CAND_AVAIL_REC') {
      availbilityGroupPrgs.push(grouProgress);
    } else if (currentProgressNode === 'INTERVIEW_SCHEDULED') {
      interviewScheduledGroupPrgs.push(grouProgress);
    }
    //
  }

  return {
    selectScheduleGroupPrgs,
    availbilityGroupPrgs,
    interviewScheduledGroupPrgs,
  };
};
