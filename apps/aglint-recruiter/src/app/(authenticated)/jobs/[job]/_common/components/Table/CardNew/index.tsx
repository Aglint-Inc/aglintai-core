// import OptimisticWrapper from '@components/loadingWapper';
import { memo, useCallback, useMemo } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useRouterPro } from '@/hooks/useRouterPro';
import {
  useApplications,
  useApplicationsActions,
  useApplicationsStore,
  useJob,
} from '@/job/hooks';
import type { Application } from '@/job/types';
import { useJobsContext } from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';

import { TableRow } from '../TableRow';

const ApplicationCard = memo(
  ({ application }: { application: Application }) => {
    const router = useRouterPro();
    const { manageJob } = useJobsContext();
    const {
      job: { status },
    } = useJob();

    const { applications } = useApplications();
    const cascadeVisibilites = useApplicationsStore((state) =>
      state.cascadeVisibilites(),
    );
    const checklist = useApplicationsStore((state) => state.checklist);
    const { setChecklist } = useApplicationsActions();
    const { isScoringEnabled } = useRolesAndPermissions();
    const { pressed: shift } = useKeyPress('Shift');
    const { isShowFeature } = useFlags();
    const isChecked = useMemo(
      () => checklist.includes(application.id!),
      [application, checklist],
    );

    const handleCheck = useCallback(() => {
      if (isChecked)
        setChecklist(checklist.filter((id) => id !== application.id));
      else {
        if (shift && checklist.length) {
          //
          const indexes = [
            applications.findIndex(({ id }) => id === application.id),
          ];
          for (let i = 0; i < applications.length && indexes.length !== 2; i++)
            // eslint-disable-next-line security/detect-object-injection
            if (checklist.includes((applications[i]?.id ?? null)!))
              indexes.push(i);
          indexes.sort((a, b) => a - b);
          setChecklist(
            Array.from(
              new Set([
                ...checklist,
                ...applications
                  .slice(indexes[0], indexes[1] + 1)
                  .map(({ id }) => id),
              ]),
            ) as typeof checklist,
          );
        } else setChecklist([...checklist!, application.id!]);
      }
    }, [checklist, isChecked, application, shift, applications, setChecklist]);

    const checkEnabled = useMemo(
      () =>
        (application?.resume_processing_state === 'processed' ||
          application?.resume_processing_state === 'unscorable') &&
        manageJob,
      [application?.resume_processing_state, manageJob],
    );

    const handleClickCandidate = () => {
      router.push(
        `${ROUTES['/jobs/[job]/[application]']({
          application_id: application.id!,
          job: application.job_id!,
        })}${
          application.status === 'interview' && isShowFeature('SCHEDULING')
            ? `?tab=interview`
            : `?tab=scoring`
        }`,
      );
    };

    return (
      // <OptimisticWrapper loading={applicationLoading}>
      <TableRow
        application={application}
        isChecked={isChecked}
        onCheck={handleCheck}
        onClickCandidate={handleClickCandidate}
        isResumeMatchVisible={isScoringEnabled}
        isInterviewVisible={cascadeVisibilites.interview}
        checkEnabled={checkEnabled}
        status={status!}
      />
      // </OptimisticWrapper>
    );
  },
);

ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;
