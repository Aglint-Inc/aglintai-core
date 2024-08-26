/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { AssessmentError } from '@/devlink2/AssessmentError';
import { AssessmentListCardLoader } from '@/devlink2/AssessmentListCardLoader';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { GeneralPopupLarge } from '@/devlink3/GeneralPopupLarge';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import Loader from '@/src/components/Common/Loader';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { getTriggerOption } from '@/src/components/Workflow/[id]/body/constants';
import { JobIcon } from '@/src/components/Workflow/index/body/icons';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobDashboard } from '@/src/context/JobDashboard';
import {
  JobDashboardStore,
  useJobDashboardStore,
} from '@/src/context/JobDashboard/store';
import { useJobs } from '@/src/context/JobsContext';
import {
  useJobWorkflowConnect,
  useJobWorkflowDeleteMutations,
  useJobWorkflowDisconnect,
  useJobWorkflowUpdateMutations,
} from '@/src/queries/job-workflow';
import { useWorkflowQuery } from '@/src/queries/workflow';
import { Workflow } from '@/src/types/workflow.types';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

const JobWorkflowComp = () => {
  return (
    <Stack>
      <Stack gap={'1px'} bgcolor={'var(--neutral-6)'}>
        <JobWorkflows />
      </Stack>
      <WorkflowBrowser />
    </Stack>
  );
};

export default JobWorkflowComp;

const JobWorkflows = () => {
  const {
    job,
    devlinkProps,
    workflows: { data: jobWorkflows, status, refetch },
  } = useJobDashboard();
  const { push } = useRouter();
  const updateMutations = useJobWorkflowUpdateMutations({ id: job?.id });
  const deleteMutations = useJobWorkflowDeleteMutations({ id: job?.id });
  const { mutate } = useJobWorkflowDisconnect({ id: job?.id });
  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((e, i) => (
          <Stack bgcolor={'white'}>
            <AssessmentListCardLoader key={i} border={'none'} />
          </Stack>
        ))}
      </>
    );
  else if (status === 'error')
    return <AssessmentError onClickRetry={{ onClick: () => refetch() }} />;
  if (jobWorkflows.length === 0)
    return (
      <GlobalEmptyState
        iconName={'lan'}
        styleEmpty={{ style: { backgroundColor: 'var(--neutral-3)' } }}
        textDesc={'No workflows connected'}
      />
    );
  const cards = jobWorkflows.map((workflow) => {
    const loading =
      !!updateMutations.find(({ workflow_ids }) =>
        (workflow_ids ?? []).includes(workflow.id),
      ) ||
      !!deleteMutations.find(({ workflow_id }) => workflow_id === workflow.id);
    return (
      <OptimisticWrapper key={workflow.id} loading={loading}>
        <WorkflowCard
          key={workflow.id}
          showButtons={true}
          isCheckboxVisible={false}
          onClickDelete={{
            onClick: () =>
              mutate({
                job_id: job?.id,
                workflow_id: workflow.id,
              }),
            ...devlinkProps,
          }}
          isEditButton={false}
          onClickEdit={{
            onClick: () => push(ROUTES['/workflows/[id]']({ id: workflow.id })),
          }}
          textJobs={<></>}
          textWorkflowName={<Stack maxWidth={'420px'}>{workflow.title}</Stack>}
          textWorkflowTrigger={getTriggerOption(
            workflow.trigger,
            workflow.phase,
          )}
        />
      </OptimisticWrapper>
    );
  });
  return <>{cards}</>;
};

const WorkflowBrowser = () => {
  const { recruiter_id } = useAuthDetails();
  const {
    job,
    workflows: { data: workflows },
  } = useJobDashboard();
  const { data, status } = useWorkflowQuery({ recruiter_id });
  const {
    popup: { open },
    filters,
    resetWorkflow,
    selections,
    setSelections,
  } = useJobDashboardStore(
    ({ popup, filters, resetWorkflow, selections, setSelections }) => ({
      popup,
      filters,
      resetWorkflow,
      selections,
      setSelections,
    }),
  );
  const { mutate } = useJobWorkflowConnect({ id: job?.id });
  const workflowIds = (workflows ?? []).map(({ id }) => id);

  const handleClose = useCallback(() => {
    resetWorkflow();
  }, []);

  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;

  const count = selections.length;

  const handleClick = (action: 'insert' | 'delete', id: Workflow['id']) => {
    switch (action) {
      case 'insert':
        {
          setSelections([...selections, id]);
        }
        break;
      case 'delete':
        setSelections(selections.filter((selection) => selection !== id));
        break;
    }
  };

  const cards = data
    .filter(({ id }) => !workflowIds.includes(id))
    .filter(({ title, jobs }) => {
      return Object.entries(filters).reduce((acc, [key, value]) => {
        if (!acc) return acc;
        switch (key as keyof JobDashboardStore['filters']) {
          case 'search':
            return title
              .toLowerCase()
              .includes((value as string).toLowerCase());
          case 'job':
            return (
              filters.job.length === 0 ||
              !!jobs.reduce((acc, curr) => {
                if ((value as string[]).includes(curr.id)) acc.push(curr);
                return acc;
              }, []).length
            );
        }
      }, true);
    })
    .map(({ id, title, trigger, phase, jobs }) => {
      const checked = selections.includes(id);
      const jobCount = (jobs ?? []).length;
      return (
        <WorkflowCard
          key={id}
          isCheckboxVisible={true}
          // isChecked={checked}
          slotCheckbox={
            <RcCheckbox
              isChecked={checked}
              onclickCheck={{
                onClick: () => handleClick(checked ? 'delete' : 'insert', id),
              }}
              text={<></>}
            />
          }
          textWorkflowName={title}
          textWorkflowTrigger={getTriggerOption(trigger, phase)}
          textJobs={`Used in ${jobCount} job${jobCount === 1 ? '' : 's'}`}
          onClickDelete={{ style: { display: 'none' } }}
          isEditButton={false}
          onClickEdit={{
            onClick: () => handleClick(checked ? 'delete' : 'insert', id),
          }}
        />
      );
    });

  const handleSubmit = () => {
    if (selections.length === 0) {
      toast.error('Please add one or more templates');
      return;
    }
    mutate({ job_id: job?.id, workflow_ids: selections });
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      sx={{
        '& .MuiPaper-root': {
          width: '600px !important',
          maxWidth: '600px !important',
        },
      }}
    >
      <GeneralPopupLarge
        isIcon={false}
        onClickAction={{ onClick: () => handleSubmit() }}
        textPopupTitle={'Add Workflow'}
        textPopupButton={
          <Stack direction={'row'} gap={1}>
            Add
            <Stack
              px={'8px'}
              style={{
                display: count ? 'flex' : 'none',
                alignItems: 'center',

                backgroundColor: 'var(--white)',
                color: 'var(--accent-11)',
                borderRadius: 'var(--radius-1)',
              }}
            >
              {count}
            </Stack>
          </Stack>
        }
        isDescriptionVisibe={true}
        slotPopup={
          <Stack
            style={{
              height: 'calc(100vh - 300px)',
              gap: '8px',
              overflow: 'scroll',
            }}
          >
            {cards.length ? cards : <WorkflowEmpty />}
          </Stack>
        }
        onClickClose={{ onClick: () => handleClose() }}
        textDescription={<Filters />}
      />
    </Dialog>
  );
};

const Filters = () => {
  const {
    filters: { search, ...filters },
    setFilters,
  } = useJobDashboardStore(({ filters, setFilters }) => ({
    filters,
    setFilters,
  }));
  const options = useFilterOptions();
  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(([key, value]) => ({
        active: value.length,
        name: key,
        value: value,
        type: 'filter',
        iconname: '',
        icon: <FilterIcon filter={key as FilterIconProps['filter']} />,
        setValue: (newValue) =>
          setFilters({ [key]: structuredClone(newValue) }),
        options: options[key] ?? [],
      })),
    [filters],
  );

  const component = useMemo(
    () => (
      <FilterHeader
        filters={safeFilters}
        search={{
          value: search,
          setValue: (newValue) => setFilters({ search: newValue }),
          placeholder: 'Search workflow',
        }}
      />
    ),
    [safeFilters, search],
  );
  return component;
};

type FilterIconProps = {
  filter: keyof Omit<JobDashboardStore['filters'], 'search'>;
};
const FilterIcon = ({ filter }: FilterIconProps) => {
  switch (filter) {
    case 'job':
      return <JobIcon />;
  }
};

type FilterOptions = {
  // eslint-disable-next-line no-unused-vars
  [id in FilterIconProps['filter']]: { id: string; label: string }[];
};
const useFilterOptions = (): FilterOptions => {
  const {
    jobs: { data },
  } = useJobs();
  const job = (data ?? []).map((job) => ({
    id: job.id,
    label: job.job_title,
  }));
  return { job };
};
