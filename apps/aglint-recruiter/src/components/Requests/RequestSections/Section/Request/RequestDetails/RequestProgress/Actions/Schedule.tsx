import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useMemo, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NoWorkflow } from '@/devlink2/NoWorkflow';
import { WorkflowItem } from '@/devlink3/WorkflowItem';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UISelect from '@/src/components/Common/Uiselect';
import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { setIsSelfScheduleDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';
import { ACTION_TRIGGER_MAP } from '@/src/components/Workflow/constants';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { useNewScheduleRequestPr } from '../NewScheduleEvents';
import { TargetAPIBody, WActionProps } from '../WorkflowComps/TargetAPIBody';

const ScheduleFlows = () => {
  const { recruiter } = useAuthDetails();
  const { reqTriggerActionsMap, companyEmailTemplates, currentRequest } =
    useNewScheduleRequestPr();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    DatabaseEnums['email_slack_types']
  >(
    reqTriggerActionsMap['onRequestSchedule']
      ? reqTriggerActionsMap['onRequestSchedule'][0].target_api
      : (ACTION_TRIGGER_MAP['onRequestSchedule'][0].value.target_api as any),
  );

  const handleSaveScheduleFlow = async (
    wAction: DatabaseTableInsert['workflow_action'],
  ) => {
    try {
      let wTrigger: DatabaseTable['workflow'];
      [wTrigger] = supabaseWrap(
        await supabase
          .from('workflow')
          .select()
          .eq('request_id', currentRequest.id)
          .eq('trigger', 'onRequestSchedule'),
        false,
      );
      if (!wTrigger) {
        [wTrigger] = supabaseWrap(
          await supabase
            .from('workflow')
            .insert({
              request_id: currentRequest.id,
              trigger: 'onRequestSchedule',
              phase: 'after',
              recruiter_id: recruiter.id,
              interval: 0,
              workflow_type: 'job',
            })
            .select(),
        );
      }

      supabaseWrap(
        await supabase
          .from('workflow_action')
          .insert([
            {
              ...wAction,
              workflow_id: wTrigger.id,
            },
          ])
          .select(),
      );

      supabaseWrap(await supabaseAdmin.from('workflow_action').insert([]));
    } catch (err) {
      //
    }
  };

  const selectedActionsDetails = useMemo(() => {
    let details: WActionProps['action'];
    let existing_workflow_action = reqTriggerActionsMap['onRequestSchedule']
      ? reqTriggerActionsMap['onRequestSchedule'][0]
      : null;
    if (existing_workflow_action) {
      details = existing_workflow_action;
    } else {
      const emailSlackTemplate = companyEmailTemplates.find(
        (temp) =>
          temp.type ===
          ACTION_TRIGGER_MAP['onRequestSchedule'][0].value.target_api,
      );
      details = {
        action_type: ACTION_TRIGGER_MAP['onRequestSchedule'][0].value
          .action_type as any,
        created_at: '',
        id: '',
        order: 0,
        target_api: ACTION_TRIGGER_MAP['onRequestSchedule'][0].value
          .target_api as any,
        workflow_id: '',
        payload: {
          body: emailSlackTemplate?.body || '',
          subject: emailSlackTemplate?.subject || '',
        },
      };
    }

    return details;
  }, [reqTriggerActionsMap, selectedAction, companyEmailTemplates]);

  return (
    <>
      <Stack rowGap={2}>
        <Stack width={'100%'} direction={'row'} justifyContent={'end'} gap={2}>
          <NoWorkflow
            textDesc={
              'There are no workflows set. please select an action to proceed manually or add action from above.'
            }
            slotButton={
              <>
                <ButtonSolid
                  size={1}
                  color={'accent'}
                  onClickButton={{
                    onClick: () => {
                      setCandidateAvailabilityDrawerOpen(true);
                    },
                  }}
                  textButton={'Send Availability Link'}
                />
                <ButtonSoft
                  size={1}
                  color={'accent'}
                  onClickButton={{
                    onClick: () => {
                      setIsSelfScheduleDrawerOpen(true);
                    },
                  }}
                  textButton={'Send SelfScheduling Link'}
                />
              </>
            }
          />
        </Stack>
        <Stack direction={'row'} justifyContent={'start'}>
          <ButtonGhost
            size={1}
            isLeftIcon={true}
            iconName={'add_circle'}
            textButton={'Add Ai Actions'}
            onClickButton={{
              onClick: () => {
                setIsDrawerOpen(true);
              },
            }}
          />
        </Stack>
        <MuiPopup
          props={{
            open: isDrawerOpen,
            maxWidth: 'sm',
            fullWidth: true,
            onClose: () => {
              setIsDrawerOpen(false);
            },
          }}
        >
          <>
            <WorkflowItem
              textWorkflowType={'Action'}
              textTypeDescription={'An action to be performed'}
              slotWorkflowIcon={<ActionIcon />}
              isDeleteVisible={false}
              onClickDelete={() => {
                //
              }}
              slotInputFields={
                <>
                  <UISelect
                    label='Do this'
                    onChange={(e) => {
                      setSelectedAction(e.target.value as any);
                    }}
                    value={selectedAction}
                    menuOptions={ACTION_TRIGGER_MAP['onRequestSchedule'].map(
                      (action) => ({
                        name: action.name,
                        value: action.value.target_api,
                      }),
                    )}
                  />
                  <TargetAPIBody action={selectedActionsDetails} />
                  <ButtonSolid
                    textButton='Add Action'
                    onClickButton={{
                      onClick: () => {
                        handleSaveScheduleFlow({
                          action_type:
                            selectedActionsDetails.action_type as any,
                          target_api: selectedActionsDetails.target_api as any,
                          payload: selectedActionsDetails.payload as any,
                          order: 0,
                        });
                      },
                    }}
                  />
                </>
              }
            />
          </>
        </MuiPopup>
      </Stack>
    </>
  );
};

export default ScheduleFlows;

const ActionIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='4' />
      <path
        d='M7.4502 6.8375C7.3502 6.7875 7.2502 6.7875 7.1502 6.8375C7.0502 6.9 7.0002 6.9875 7.0002 7.1V13.7C7.0002 13.8125 7.0502 13.9 7.1502 13.9625C7.2502 14.0125 7.3502 14.0125 7.4502 13.9625L12.8502 10.6625C12.9502 10.6 13.0002 10.5125 13.0002 10.4C13.0002 10.2875 12.9502 10.2 12.8502 10.1375L7.4502 6.8375ZM6.86895 6.3125C7.16895 6.15 7.46895 6.15625 7.76895 6.33125L13.1689 9.63125C13.4439 9.80625 13.5877 10.0625 13.6002 10.4C13.5877 10.7375 13.4439 10.9937 13.1689 11.1687L7.76895 14.4688C7.46895 14.6438 7.16895 14.65 6.86895 14.4875C6.56895 14.3125 6.4127 14.05 6.4002 13.7V7.1C6.4127 6.75 6.56895 6.4875 6.86895 6.3125Z'
        fill='#cc4e00'
      />
    </svg>
  );
};
ActionIcon.displayName = 'ActionIcon';
