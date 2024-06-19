/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { AssessmentError } from '@/devlink2/AssessmentError';
import { AssessmentListCardLoader } from '@/devlink2/AssessmentListCardLoader';
import { EmptyAssessmentList } from '@/devlink2/EmptyAssessmentList';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { GeneralPopupLarge } from '@/devlink3/GeneralPopupLarge';
import { JobsWorkflow } from '@/devlink3/JobsWorkflow';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobDetails } from '@/src/context/JobDashboard';
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
import { useWorkflowQuery, Workflow } from '@/src/queries/workflow';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import Loader from '../Common/Loader';
import OptimisticWrapper from '../NewAssessment/Common/wrapper/loadingWapper';
import { getTriggerOption } from '../Workflow/[id]/body/trigger';
import { JobIcon } from '../Workflow/index/body/icons';

const JobWorkflowComp = () => {
  const { push } = useRouter();
  const {
    workflows: { data: jobWorkflows },
  } = useJobDetails();
  const { setPopup } = useJobDashboardStore(({ setPopup }) => ({
    setPopup,
  }));
  return (
    <>
      <JobsWorkflow
        onClickCreateWorkflow={{ onClick: () => push(ROUTES['/workflows']()) }}
        isVisible={(jobWorkflows ?? []).length !== 0}
        onClickAddWorkflow={{ onClick: () => setPopup({ open: true }) }}
        slotWorflows={<JobWorkflows />}
      />
      <WorkflowBrowser />
    </>
  );
};

export default JobWorkflowComp;

const JobWorkflows = () => {
  const {
    job,
    workflows: { data: jobWorkflows, status, refetch },
  } = useJobDetails();
  const { push } = useRouter();
  const { setPopup } = useJobDashboardStore(({ setPopup }) => ({
    setPopup,
  }));
  const updateMutations = useJobWorkflowUpdateMutations({ id: job?.id });
  const deleteMutations = useJobWorkflowDeleteMutations({ id: job?.id });
  const { mutate } = useJobWorkflowDisconnect({ id: job?.id });
  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((e, i) => (
          <AssessmentListCardLoader key={i} />
        ))}
      </>
    );
  else if (status === 'error')
    return <AssessmentError onClickRetry={{ onClick: () => refetch() }} />;
  if (jobWorkflows.length === 0)
    return (
      <EmptyAssessmentList
        onClickBrowseAssessment={{ onClick: () => setPopup({ open: true }) }}
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
          onClickDelete={{
            onClick: () =>
              mutate({
                job_id: job?.id,
                workflow_id: workflow.id,
              }),
          }}
          onClickEdit={{
            onClick: () => push(ROUTES['/workflows/[id]']({ id: workflow.id })),
          }}
          textJobs={<></>}
          textWorkflowName={workflow.title}
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
  } = useJobDetails();
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
                if ((value as string[]).includes(curr.job_id)) acc.push(curr);
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
          isChecked={checked}
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
          width: '992px !important',
          maxWidth: '992px !important',
        },
      }}
    >
      <GeneralPopupLarge
        isIcon={false}
        onClickAction={{ onClick: () => handleSubmit() }}
        textPopupTitle={'Add Workflow'}
        textPopupButton={
          <Stack direction={'row'} gap={2}>
            Add
            <Stack
              style={{
                display: count ? 'flex' : 'none',
                alignItems: 'center',

                backgroundColor: 'var(--white)',
                color: '#2596be',
                borderRadius: 'var(--radius-4)',
                width: '20px',
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
              height: 'calc(100vh - 120px)',
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
      {/* <BrowseAssessment
        onClickAddSelectedTemplates={{ onClick: () => handleAddTemplates() }}
        textTemplatesCount={`${count} workflow${
          count === 1 ? '' : 's'
        } selected`}
        isSelected={count !== 0}
        onClickClose={{ onClick: () => handleClose() }}
        slotBrowseCard={
          workflows.length !== 0 && (
            <AllBrowserCards
              workflows={workflows}
              selections={selections}
              handleClick={handleClick}
            />
          )
        }
        slotEmpty={
          workflows.length === 0 && <AssessmentEmpty isCreateNew={false} />
        }
        slotSearch={
          <SearchField
            val={filter}
            handleSearch={async (val) => setFilter(val ?? '')}
          />
        }
      /> */}
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
