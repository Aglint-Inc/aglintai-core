/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import { useCallback, useState } from 'react';

import { AssessmentCard } from '@/devlink2/AssessmentCard';
import { AssessmentEmpty } from '@/devlink2/AssessmentEmpty';
import { AssessmentError } from '@/devlink2/AssessmentError';
import { AssessmentListCardLoader } from '@/devlink2/AssessmentListCardLoader';
import { BrowseAssessment } from '@/devlink2/BrowseAssessment';
import { EmptyAssessmentList } from '@/devlink2/EmptyAssessmentList';
import { SelectButton } from '@/devlink2/SelectButton';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobDetails } from '@/src/context/JobDashboard';
import {
  useJobWorkflowConnect,
  useJobWorkflowDeleteMutations,
  useJobWorkflowDisconnect,
  useJobWorkflowUpdateMutations,
} from '@/src/queries/job-workflow';
import { useWorkflowQuery, Workflow } from '@/src/queries/workflow';

import AUIButton from '../Common/AUIButton';
import Loader from '../Common/Loader';
import SearchField from '../JobApplicationsDashboard/SearchField';
import OptimisticWrapper from '../NewAssessment/Common/wrapper/loadingWapper';
import { getTriggerOption } from '../Workflow/[id]/body/trigger';

const JobWorkflowComp = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <WorkflowBrowser open={open} onClose={() => setOpen(false)} />
      <Stack direction={'column'} padding={4} gap={2}>
        <JobWorkflows onOpen={() => setOpen(true)} />
      </Stack>
    </>
  );
};

export default JobWorkflowComp;

const JobWorkflows = ({ onOpen }: { onOpen: () => void }) => {
  const {
    job,
    workflows: { data: jobWorkflows, status, refetch },
  } = useJobDetails();
  const updateMutations = useJobWorkflowUpdateMutations({ job_id: job?.id });
  const deleteMutations = useJobWorkflowDeleteMutations({ job_id: job?.id });
  const { mutate } = useJobWorkflowDisconnect({ job_id: job?.id });
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
        onClickBrowseAssessment={{ onClick: () => onOpen() }}
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
          onClickEdit={{ style: { display: 'none' } }}
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
  return (
    <>
      {cards}
      <Stack width={'200px'} alignSelf={'flex-end'}>
        <AUIButton onClick={() => onOpen()}>Add workflow</AUIButton>
      </Stack>
    </>
  );
};

const WorkflowBrowser = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { recruiter_id } = useAuthDetails();
  const { job } = useJobDetails();
  const { data, status } = useWorkflowQuery({ recruiter_id });
  const { mutate } = useJobWorkflowConnect({ job_id: job?.id });
  const [selections, setSelections] = useState<Workflow[]>([]);
  const [filter, setFilter] = useState('');
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSelections([]);
      setFilter('');
    }, 400);
  }, []);

  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;

  const count = selections.length;

  const workflows = data
    .filter(({ jobs }) => !jobs.includes(job?.id))
    .filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()));

  const handleClick = (action: 'insert' | 'delete', workflow: Workflow) => {
    switch (action) {
      case 'insert':
        {
          setSelections((prev) => structuredClone([...prev, workflow]));
        }
        break;
      case 'delete':
        setSelections((prev) =>
          structuredClone(prev.filter(({ id }) => id !== workflow.id)),
        );
        break;
    }
  };

  const handleAddTemplates = () => {
    mutate({ job_id: job?.id, workflow_ids: selections.map(({ id }) => id) });
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
      <BrowseAssessment
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
      />
    </Dialog>
  );
};

const AllBrowserCards = ({
  workflows,
  selections,
  handleClick,
}: {
  workflows: Workflow[];
  selections: Workflow[];
  // eslint-disable-next-line no-unused-vars
  handleClick: (action: 'insert' | 'delete', workflow: Workflow) => void;
}) => {
  return (
    <>
      {workflows.map((workflow) => (
        <BrowserCard
          key={workflow.id}
          workflow={workflow}
          handleClick={handleClick}
          selections={selections}
        />
      ))}
    </>
  );
};

const BrowserCard = ({
  workflow,
  handleClick,
  selections,
}: {
  workflow: Workflow;
  selections: Workflow[];
  handleClick: (
    // eslint-disable-next-line no-unused-vars
    action: 'insert' | 'delete',
    // eslint-disable-next-line no-unused-vars
    workflow: Workflow,
  ) => void;
}) => {
  const isSelected = !!selections.find(({ id }) => id === workflow.id);
  return (
    <AssessmentCard
      key={workflow.id}
      textAssessmentName={workflow.title}
      textDescription={<></>}
      slotDurationAndLevel={<></>}
      slotAssessmentType={<></>}
      onClickCard={{
        onClick: () => handleClick(isSelected ? 'delete' : 'insert', workflow),
      }}
      slotAssessmentStatus={
        <SelectButton
          isSelected={isSelected}
          textButton={isSelected ? 'Selected' : 'Select'}
        />
      }
      isActive={isSelected}
    />
  );
};
