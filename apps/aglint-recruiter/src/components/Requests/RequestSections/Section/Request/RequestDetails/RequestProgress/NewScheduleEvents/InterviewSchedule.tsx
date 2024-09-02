/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import React from 'react';

import { ScheduleProgress } from '@/devlink2/ScheduleProgress';
import { useRequest } from '@/src/context/RequestContext';

import { workflowCopy } from '../utils/copy';
import { apiTargetToEvents } from '../utils/progressMaps';
import { useNewScheduleRequestPr } from '.';
import { RequestProgress } from '@/devlink2';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { ACTION_TRIGGER_MAP } from '@/src/components/Workflow/constants';
import { IconButtonSoft } from '@/devlink';
import {
  createRequestWorkflowAction,
  deleteRequestWorkflowAction,
} from '../../utils';
import { DatabaseEnums } from '@aglint/shared-types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';
type TenseType = 'past' | 'present' | 'future' | 'error';

const InterviewSchedule = () => {
  const { reqTriggerActionsMap: triggerActionMp, currentRequest } =
    useNewScheduleRequestPr();
  const { recruiter } = useAuthDetails();
  const { request_progress, request_workflow } = useRequest();

  const event_status = request_progress.data.find(
    (d) => d.event_type === 'CAND_CONFIRM_SLOT',
  );

  let tense: TenseType = 'past';
  if (event_status && event_status.status === 'completed') {
    tense = 'past';
  } else {
    tense = 'future';
  }

  const handleAddAction = async (
    target_api: DatabaseEnums['email_slack_types'],
  ) => {
    try {
      await createRequestWorkflowAction({
        wAction: {
          target_api: target_api as any,
          order: 0,
          action_type: 'slack',
        },
        recruiter_id: recruiter.id,
        request_id: currentRequest.id,
      });
      await request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to add action');
    }
  };

  const handleDeleteScheduleAction = async (workflowActionId: string) => {
    try {
      await deleteRequestWorkflowAction(workflowActionId);
      await request_workflow.refetch();
    } catch (err) {
      toast.error('Failed to remove action');
    }
  };
  return (
    <RequestProgress
      circleIndicator={tense === 'past' ? 'success' : 'neutral'}
      textRequestProgress={'On Inteview is Scheduled'}
      slotProgress={
        <>
          <Stack ml={4}>
            <></>
            {/* {eventWActions
              .map((eA) => {
                return apiTargetToEvents[eA.target_api];
              })
              .flat()
              .map((ev) => {
                const eventProg = reqProgressMap[ev];
                let tense: ProgressTenseType = 'future';
                if (eventProg) {
                  tense = progressStatusToTense(eventProg[0].status);
                }
                return (
                  <p key={ev}>
                    <TextWithIcon
                      textContent={workflowCopy[ev][tense]}
                      iconSize={3}
                      fontSize={1}
                      color={getProgressColor(tense)}
                      iconName={
                        tense === 'past' ? (
                          <CheckCircleFilled />
                        ) : tense === 'future' ? (
                          'circle'
                        ) : (
                          <LottieAnimations
                            animation='loading_spinner'
                            size={1.2}
                          />
                        )
                      }
                    />
                  </p>
                );
              })} */}
          </Stack>
          {ACTION_TRIGGER_MAP.candidateBook.map((action, idx) => {
            return apiTargetToEvents[action.value.target_api].map((ev) => {
              const addedAction = (triggerActionMp['candidateBook'] ?? []).find(
                (a) => a.target_api === action.value.target_api,
              );
              return (
                <>
                  <ScheduleProgress
                    textProgress={workflowCopy[ev].future}
                    status={'circle'}
                    slotRightIcon={
                      <>
                        <ShowCode.When isTrue={tense === 'future'}>
                          <ShowCode.When isTrue={!addedAction}>
                            <IconButtonSoft
                              iconName={'add'}
                              size={1}
                              color={'neutral'}
                              onClickButton={{
                                onClick: () => {
                                  handleAddAction(action.value.target_api);
                                },
                              }}
                            />
                          </ShowCode.When>
                          <ShowCode.When isTrue={Boolean(addedAction)}>
                            <IconButtonSoft
                              iconName={'delete'}
                              size={1}
                              color={'error'}
                              onClickButton={{
                                onClick: () => {
                                  handleDeleteScheduleAction(addedAction.id);
                                },
                              }}
                            />
                          </ShowCode.When>
                        </ShowCode.When>
                        <ShowCode.When isTrue={tense === 'past'}>
                          <IconButtonSoft
                            iconName={'add'}
                            size={1}
                            color={'neutral'}
                            onClickButton={{
                              onClick: () => {
                                //
                              },
                            }}
                          />
                        </ShowCode.When>
                      </>
                    }
                  />
                </>
              );
            });
          })}
        </>
      }
    />
  );
};

export default InterviewSchedule;
