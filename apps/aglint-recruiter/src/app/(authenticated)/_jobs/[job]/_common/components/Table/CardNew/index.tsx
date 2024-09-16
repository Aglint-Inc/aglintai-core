import OptimisticWrapper from '@components/loadingWapper';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import {
  useApplications,
  useApplicationsActions,
  useApplicationsChecklist,
} from '@/job/hooks';
import { type Application } from '@/types/applications.types';
import ROUTES from '@/utils/routing/routes';

import { TableRow } from '../TableRow';

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
    const { pressed: shift } = useKeyPress('Shift');

    const { isShowFeature } = useAuthDetails();

    const isChecked = useMemo(
      () => checklist.includes(application.id),
      [application, checklist],
    );

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

    const handleClickCandidate = () => {
      router.push(
        `${ROUTES['/jobs/[job]/application/[application_id]']({
          application_id: application.id,
          job: application.job_id,
        })}${
          application.status === 'interview' && isShowFeature('SCHEDULING')
            ? `?tab=interview`
            : `?tab=scoring`
        }`,
      );
    };

    return (
      <OptimisticWrapper loading={applicationLoading}>
        <TableRow
          application={application}
          isChecked={isChecked}
          onCheck={handleCheck}
          onClickCandidate={handleClickCandidate}
          isResumeMatchVisible={isScoringEnabled}
          isInterviewVisible={cascadeVisibilites.interview}
          checkEnabled={checkEnabled}
          status={status}
        />
      </OptimisticWrapper>
    );
  },
);

ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;
