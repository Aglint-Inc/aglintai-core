import { useRouter } from 'next/router';

import { PageLayout, ScheduleInfo } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

import { data } from '..';

function ScheduleDetailsCard() {
  const {
    query: { schedule_id },
    back
  } = useRouter();
  const selectedItem = data.filter((item) => item.id === schedule_id)[0];

  return (
    <PageLayout
      isBackButton={true}
      onClickBack={{
        onClick: () => {
          back();
        }
      }}
      slotTopbarLeft={<>{selectedItem.name}</>}
      slotBody={
        <>
          <ScheduleInfo
            slotProfileImage={
              <MuiAvatar
                level={'Tom Odel'}
                width='20'
                variant='circular'
                fontSize='12px'
                height='20'
                src='/static/images/avatar/5.jpg'
              />
            }
          />
        </>
      }
    />
  );
}

export default ScheduleDetailsCard;
