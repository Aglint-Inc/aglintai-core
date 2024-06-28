import { Stack } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';

import { CandidateListItem } from '@/devlink2/CandidateListItem';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useKeyPress } from '@/src/context/ApplicationsContext/hooks';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { Application } from '@/src/types/applications.types';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import ResumeScore from '../../Common/ResumeScore';
import { formatTimeStamp } from '../../utils';
import { ScheduleProgress } from './ScheduleProgress';

const ApplicationCard = memo(
  ({ application }: { application: Application }) => {
    const {
      cascadeVisibilites,
      sectionApplication: {
        data: { pages },
      },
    } = useApplications();

    const { checklist, setChecklist } = useApplicationsStore(
      ({ checklist, setChecklist }) => ({
        checklist,
        setChecklist,
      }),
    );

    const { application_id } = useApplicationStore(({ drawer }) => drawer);

    const handleOpen = useApplicationStore(({ handleOpen }) => handleOpen);
    const isChecked = useMemo(
      () => checklist.includes(application.id),
      [application, checklist],
    );

    const isSelected = useMemo(
      () => application.id === application_id,
      [application_id, application],
    );

    const { pressed: shift } = useKeyPress('Shift');

    const handleCheck = useCallback(() => {
      if (isChecked)
        setChecklist(checklist.filter((id) => id !== application.id));
      else {
        if (shift && checklist.length) {
          //
          const list = pages.flatMap((page) => page);
          let indexes = [list.findIndex(({ id }) => id === application.id)];
          for (let i = 0; i < list.length && indexes.length !== 2; i++)
            // eslint-disable-next-line security/detect-object-injection
            if (checklist.includes(list[i].id)) indexes.push(i);
          indexes.sort((a, b) => a - b);
          setChecklist(
            Array.from(
              new Set([
                ...checklist,
                ...list.slice(indexes[0], indexes[1] + 1).map(({ id }) => id),
              ]),
            ),
          );
        } else setChecklist([...checklist, application.id]);
      }
    }, [checklist, isChecked, application, shift, pages, setChecklist]);

    const location = useMemo(
      () =>
        [application.city, application.country]
          .filter(Boolean)
          .join(', ')
          .trim(),
      [application.city, application.country],
    );

    const appliedDate = useMemo(
      () => formatTimeStamp(application.applied_at),
      [application.applied_at],
    );

    return (
      <CandidateListItem
        onClickCandidate={{
          onClick: () => handleOpen({ application_id: application.id }),
        }}
        isHighlighted={isSelected}
        slotBookmark={<Banners application={application} />}
        isDragVisible={isChecked}
        onClickSelect={{ onClick: handleCheck }}
        isChecked={isChecked}
        slotProfileImage={<></>}
        name={capitalizeAll(application.name)}
        jobTitle={application.current_job_title || '---'}
        location={location || '---'}
        slotResumeScore={
          <ResumeScore
            resume_processing_state={application.resume_processing_state}
            resume_score={application.resume_score}
          />
        }
        isScreeningVisible={cascadeVisibilites.screening}
        isAssessmentVisible={cascadeVisibilites.assessment}
        isInterviewVisible={cascadeVisibilites.interview}
        isDisqualifiedVisible={cascadeVisibilites.disqualified}
        slotScreening={<>---</>}
        slotAssessmentScore={<>---</>}
        slotInterviewPipline={
          <ScheduleProgress meeting_details={application.meeting_details} />
        }
        slotDisqualified={<>---</>}
        appliedDate={appliedDate}
      />
    );
  },
);
ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;

const Banners = ({ application }: { application: Application }) => {
  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
      {application?.bookmarked && <BookmarkIcon />}
      {application?.is_new && <NewIcon />}
    </Stack>
  );
};

const BookmarkIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.30098 3.25C4.31556 2.95833 4.41764 2.71042 4.60723 2.50625C4.81139 2.31667 5.05931 2.21458 5.35098 2.2H11.651C11.9426 2.21458 12.1906 2.31667 12.3947 2.50625C12.5843 2.71042 12.6864 2.95833 12.701 3.25V12.875C12.6718 13.1958 12.4968 13.3708 12.176 13.4C12.0593 13.4 11.9572 13.3708 11.8697 13.3125L8.50098 10.95L5.13223 13.3125C5.04473 13.3708 4.94264 13.4 4.82598 13.4C4.50514 13.3708 4.33014 13.1958 4.30098 12.875V3.25Z'
        fill='#F79A3E'
      />
    </svg>
  );
};

const NewIcon = () => {
  return (
    <svg
      width='33'
      height='18'
      viewBox='0 0 33 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='33' height='18' rx='4' fill='#467B7C' />
      <path
        d='M6.95941 13V5.9541H7.8139L11.6371 11.4375H11.7153V5.9541H12.5844V13H11.7299L7.90668 7.53613H7.82855V13H6.95941ZM16.4219 13.0928C14.918 13.0928 14.0098 12.0381 14.0098 10.3877V10.3828C14.0098 8.75684 14.9375 7.64355 16.3682 7.64355C17.7988 7.64355 18.668 8.70801 18.668 10.2803V10.6123H14.8789C14.9033 11.7012 15.5039 12.3359 16.4414 12.3359C17.1543 12.3359 17.5937 11.999 17.7354 11.6816L17.7549 11.6377H18.6045L18.5947 11.6768C18.4141 12.3896 17.6621 13.0928 16.4219 13.0928ZM16.3633 8.40039C15.582 8.40039 14.9863 8.93262 14.8936 9.93359H17.8037C17.7158 8.89355 17.1396 8.40039 16.3633 8.40039ZM21.0015 13L19.5269 7.73633H20.3765L21.4117 11.9453H21.4898L22.6666 7.73633H23.4722L24.649 11.9453H24.7271L25.7623 7.73633H26.607L25.1324 13H24.2779L23.1011 8.92773H23.023L21.8511 13H21.0015Z'
        fill='#F5FCFC'
      />
    </svg>
  );
};
