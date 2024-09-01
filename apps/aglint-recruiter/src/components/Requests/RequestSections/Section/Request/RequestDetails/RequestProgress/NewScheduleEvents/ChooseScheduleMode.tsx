import { Stack } from '@mui/material';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { NoWorkflow } from '@/devlink2/NoWorkflow';
import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { setIsSelfScheduleDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

import { useNewScheduleRequestPr } from '.';

const ChooseScheduleMode = () => {
  const { setEditTrigger, setShowEditDialog } = useNewScheduleRequestPr();
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
                setEditTrigger('onRequestSchedule');
                setShowEditDialog(true);
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default ChooseScheduleMode;
