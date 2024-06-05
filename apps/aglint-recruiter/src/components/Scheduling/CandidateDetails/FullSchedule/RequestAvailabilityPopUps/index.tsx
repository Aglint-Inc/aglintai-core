import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import Icon from '@/src/components/Common/Icons/Icon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import toast from '@/src/utils/toast';

import {
  setRequestSessionIds,
  useSchedulingApplicationStore,
} from '../../store';
import { useAvailabilityContext } from './RequestAvailabilityContext';
import RequestAvailabilityDrawer from './RequestAvailabilityDrawer';

function RequestAvailabilityPopUps() {
  const router = useRouter();
  const { availabilities } = useSchedulingApplicationStore();

  const { setSelectedRequestAvailability } = useAvailabilityContext();

  function openDrawer(id: string) {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const updatedQuery = {
      ...currentQuery,
      request_availability_id: id,
    };
    router.replace({
      pathname: currentPath,
      query: updatedQuery,
    });
  }

  function handleRequestAgain(ids: string[]) {
    setRequestSessionIds(ids);
    const currentPath = router.pathname;
    const currentQuery = router.query;
    const updatedQuery = {
      ...currentQuery,
      candidate_request_availability: 'true',
    };
    router.replace({
      pathname: currentPath,
      query: updatedQuery,
    });
  }

  return (
    <div>
      <RequestAvailabilityDrawer />
      <Stack direction={'column'} gap={1}>
        {availabilities.length > 0 &&
          availabilities.map((item) => {
            return (
              <>
                <ShowCode>
                  <ShowCode.When isTrue={!item.slots}>
                    <GeneralBanner
                      titleColorProps={{
                        style: {
                          color: 'var(--warning-11)',
                        },
                      }}
                      textHeading={
                        'Waiting for candidates availability submission'
                      }
                      textDesc={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `Candidate received a link to choose multiple options for ${item.session_ids.map((ele) => `<b>${ele.name}</b>`)} Interviews.`,
                          }}
                        ></div>
                      }
                      slotHeadingIcon={
                        <Icon height='15' width='' variant='Clock' />
                      }
                      slotButton={
                        <>
                          <ButtonSolid
                            textButton={'Resend invite'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                          />
                          <ButtonSoft
                            textButton={'Copy invite'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                navigator.clipboard.writeText(item.id);
                                toast.message('Invited link copied!');
                              },
                            }}
                          />
                        </>
                      }
                    />
                  </ShowCode.When>
                  <ShowCode.Else>
                    <GeneralBanner
                      titleColorProps={{
                        style: {
                          color: 'var(--info-11)',
                        },
                      }}
                      textHeading={'Candidate submitted availability'}
                      textDesc={
                        'These are the options that selected by the candidate. Click schedule to view and pick one schedule for the interview.'
                      }
                      slotHeadingIcon={
                        <Icon height={'16'} width={'20'} variant='Check' />
                      }
                      slotButton={
                        <>
                          <ButtonSolid
                            textButton={'Schedule'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                openDrawer(item.id);
                                setSelectedRequestAvailability(item);
                              },
                            }}
                          />
                          <ButtonSoft
                            textButton={'Request again'}
                            isLoading={false}
                            isLeftIcon={false}
                            isRightIcon={false}
                            size={1}
                            onClickButton={{
                              onClick: () =>
                                handleRequestAgain(
                                  item.session_ids.map((ele) => ele.id),
                                ),
                            }}
                          />
                        </>
                      }
                    />
                  </ShowCode.Else>
                </ShowCode>
              </>
            );
          })}
      </Stack>
    </div>
  );
}

export default RequestAvailabilityPopUps;
