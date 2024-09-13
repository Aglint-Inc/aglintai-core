import OptimisticWrapper from '@components/loadingWapper';
import { CandidateListItem } from '@devlink2/CandidateListItem';
import { Bookmark, Star } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';

import StageProgress from '@/components/Scheduling/Common/StageProgress';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import {
  useApplications,
  useApplicationsActions,
  useApplicationsChecklist,
} from '@/job/hooks';
import { formatTimeStamp } from '@/job/utils/formatTimeStamp';
import { type Application } from '@/types/applications.types';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { ResumeScore } from '../../Common/ResumeScoreNew';

const ApplicationCard = memo(
  ({ application }: { application: Application }) => {
    const router = useRouter();
    const {
      cascadeVisibilites,
      job: { status },
      sectionApplication: {
        data: { pages },
      },
      manageJob,
      applicationMutations,
    } = useApplications();

    const checklist = useApplicationsChecklist();
    const { setChecklist } = useApplicationsActions();

    const { isScoringEnabled } = useRolesAndPermissions();

    const isChecked = useMemo(
      () => checklist.includes(application.id),
      [application, checklist],
    );

    const isSelected = false;
    const { pressed: shift } = useKeyPress('Shift');

    const handleCheck = useCallback(() => {
      if (isChecked)
        setChecklist(checklist.filter((id) => id !== application.id));
      else {
        if (shift && checklist.length) {
          //
          const list = pages.flatMap((page) => page);
          const indexes = [list.findIndex(({ id }) => id === application.id)];
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

    const checkEnabled = useMemo(
      () =>
        (application?.resume_processing_state === 'processed' ||
          application?.resume_processing_state === 'unscorable') &&
        manageJob,
      [application?.resume_processing_state, manageJob],
    );

    const applicationLoading = useMemo(
      () => applicationMutations.includes(application.id),
      [applicationMutations, application.id],
    );

    return (
      <OptimisticWrapper loading={applicationLoading}>
        <CandidateListItem
          isResumeMatchVisible={isScoringEnabled}
          onClickCandidate={{
            onClick: () => {
              router.push(
                `${ROUTES['/jobs/[job]/application/[application_id]']({
                  application_id: application.id,
                  job: application.job_id,
                })}${
                  application.status === 'interview'
                    ? `?tab=interview`
                    : `?tab=resume`
                }`,
              );
            },
          }}
          isHighlighted={isSelected || isChecked}
          highlightType={isSelected ? 'highlighted' : 'checked'}
          slotBookmark={<Banners application={application} />}
          isDragVisible={isChecked}
          onClickSelect={{
            onClick: checkEnabled ? () => handleCheck() : undefined,
            style: {
              opacity: checkEnabled ? 100 : 0,
            },
          }}
          isChecked={isChecked}
          slotProfileImage={<></>}
          name={capitalizeAll(application.name)}
          jobTitle={application.current_job_title || '---'}
          location={location || '---'}
          slotResumeScore={
            status === 'draft' ? (
              <>---</>
            ) : (
              <ResumeScore
                resume_processing_state={application.resume_processing_state}
                resume_score={application.resume_score}
              />
            )
          }
          isScreeningVisible={false}
          isAssessmentVisible={false}
          isInterviewVisible={cascadeVisibilites.interview}
          isDisqualifiedVisible={cascadeVisibilites.disqualified}
          slotScreening={<>---</>}
          slotAssessmentScore={<>---</>}
          slotInterviewPipline={
            <StageProgress interview_plans={application.interview_plans} />
          }
          slotDisqualified={<>---</>}
          appliedDate={appliedDate}
        />
      </OptimisticWrapper>
    );
  },
);
ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;

const Banners = ({ application }: { application: Application }) => {
  return (
    <div className='flex flex-row items-center gap-1'>
      {application?.bookmarked && <Bookmark className='w-4 h-4' />}
      {application?.is_new && <Star className='w-4 h-4' />}
    </div>
  );
};
