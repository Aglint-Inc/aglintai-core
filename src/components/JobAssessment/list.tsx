/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  AssesmentCardLoader,
  AssessmentCard,
  AssessmentEmpty,
  AssessmentError,
  AssessmentJob,
  AssessmentListCard as AssessmentListCardDev,
  AssessmentListCardLoader,
  BrowseAssessment,
  EmptyAssessmentList,
  SelectButton,
} from '@/devlink2';
import { useJobs } from '@/src/context/JobsContext';
import { Assessment, AssessmentTemplate } from '@/src/queries/assessment/types';
import {
  useJobAssessmentsBulkConnect,
  // useJobAssessmentsConnect,
  useJobAssessmentsDisconnect,
  useJobAssessmentTemplateConnect,
} from '@/src/queries/job-assessment';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';

import { useJobAssessments } from './context';
import TipTapAIEditor from '../Common/TipTapAIEditor';
import SearchField from '../JobApplicationsDashboard/SearchField';
import { AssessmentDetails } from '../NewAssessment/AssessmentDashboard/card';
import TypeIcon from '../NewAssessment/Common/icons/types';

const JobAssessment = () => {
  const {
    assessments: {
      data: { jobAssessments },
    },
    templates: { status, data: templates },
  } = useJobAssessments();
  const [open, setOpen] = useState(false);
  const isRecommendedVisible =
    status !== 'error' &&
    (status === 'pending' || (templates?.length ?? 0) !== 0);
  return (
    <>
      <AssessmentJob
        slotAssessmentCard={<AssessmentTemplates />}
        onClickBrowseTemplates={{ onClick: () => setOpen(true) }}
        isBrowseTemplatesVisible={jobAssessments.length !== 0}
        slotInstructions={
          <AssessmentEditor
            payload='interview_instructions'
            skeletonCount={2}
          />
        }
        isRecommendedVisible={isRecommendedVisible}
        slotAssessmentList={<JobAssessments onOpen={() => setOpen(true)} />}
        slotSuccessMessage={
          <AssessmentEditor payload='interview_success' skeletonCount={1} />
        }
      />
      <AssessmentBrowser open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default JobAssessment;

const JobAssessments = ({ onOpen }: { onOpen: () => void }) => {
  const {
    assessments: {
      status,
      data: { jobAssessments },
      refetch,
    },
  } = useJobAssessments();
  const { mutate } = useJobAssessmentsDisconnect();
  const handleDisconnect = (assessment_id: Assessment['id']) => {
    mutate(assessment_id);
  };
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
  if (jobAssessments.length === 0)
    return (
      <EmptyAssessmentList
        onClickBrowseAssessment={{ onClick: () => onOpen() }}
      />
    );
  const cards = jobAssessments.map((assessment) => (
    <AssessmentListCard
      key={assessment.id}
      assessment={assessment}
      handleDisconnect={handleDisconnect}
    />
  ));
  return <>{cards}</>;
};

const AssessmentListCard = ({
  assessment,
  handleDisconnect,
}: {
  assessment: Assessment;
  // eslint-disable-next-line no-unused-vars
  handleDisconnect: (assessment_id: Assessment['id']) => void;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Stack
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AssessmentListCardDev
        onClickRemove={{ onClick: () => handleDisconnect(assessment.id) }}
        textQuestionCount={`${10} Questions`}
        slotIcons={<TypeIcon type={assessment.type} />}
        textTitle={assessment.title}
        isRemoveVisible={hover}
        isActive={hover}
      />
    </Stack>
  );
};

const AssessmentTemplates = () => {
  const {
    templates: { data, status },
  } = useJobAssessments();
  const { mutate } = useJobAssessmentTemplateConnect();
  const handleConnect = (template: AssessmentTemplate) => {
    mutate(template);
  };
  if (status === 'pending')
    return (
      <>
        {[...Array(2)].map((e, i) => (
          <AssesmentCardLoader key={i} />
        ))}
      </>
    );
  const cards = data
    .slice(0, 2)
    .map((template) => (
      <AssessmentCard
        key={template.id}
        onClickCard={{ onClick: () => handleConnect(template) }}
        textAssessmentName={template.title}
        textDescription={template.description}
        slotDurationAndLevel={
          <AssessmentDetails
            duration={template.duration}
            level={template.level}
          />
        }
        slotAssessmentType={<TypeIcon type={template.type} />}
        slotAssessmentStatus={<SelectButton />}
      />
    ));
  return <>{cards}</>;
};

const AssessmentEditor = ({
  payload,
  skeletonCount,
}: {
  payload: 'interview_instructions' | 'interview_success';
  skeletonCount: number;
}) => {
  const { job } = useCurrentJob();
  const { handleJobUpdate } = useJobs();
  const [value, setValue] = useState(job[payload]);
  const initialRef = useRef(true);
  const handleUpdate = useCallback(
    async (message: string) => {
      await handleJobUpdate(job.id, { [payload]: message });
    },
    [job.id],
  );
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      const timer = setTimeout(async () => {
        await handleUpdate(value);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [value]);
  return (
    <Stack
      style={{
        border: '1px solid #dcdcdc',
      }}
    >
      <TipTapAIEditor
        initialValue={value}
        handleChange={(message) => setValue(message)}
        placeholder='Type here'
        loader={{ isLoading: !job, count: skeletonCount }}
      />
    </Stack>
  );
};
export type BroweserSelections = {
  private: Assessment[];
  public: (AssessmentTemplate & { assessment_id: Assessment['id'] })[];
};
const AssessmentBrowser = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    assessments: {
      data: { otherAssessments },
    },
    templates: { data: templates },
  } = useJobAssessments();
  const { mutate } = useJobAssessmentsBulkConnect();
  const [section, setSection] = useState<keyof BroweserSelections>('private');
  const [selections, setSelections] = useState<BroweserSelections>({
    private: [],
    public: [],
  });
  const [filter, setFilter] = useState('');
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSelections({ private: [], public: [] });
      setFilter('');
    }, 400);
  }, []);

  const count = selections.private.length + selections.public.length;

  const assessments: BrowserAssessments = (
    section === 'public' ? templates : otherAssessments
  ).filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()));

  const handleClick = (
    action: 'insert' | 'delete',
    assessment: BrowserAssessments[number],
  ) => {
    switch (action) {
      case 'insert':
        {
          const newAssessment = { ...assessment };
          if (section === 'public')
            newAssessment['assessment_id'] = uuidv4() as string;
          setSelections((prev) => ({
            ...prev,
            [section]: [...prev[section], newAssessment],
          }));
        }
        break;
      case 'delete':
        setSelections((prev) => ({
          ...prev,
          [section]: prev[section].filter(({ id }) => id !== assessment.id),
        }));
        break;
    }
  };

  const handleAddTemplates = () => {
    mutate({ assessments: selections.private, templates: selections.public });
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
        isAglintAssessment={section === 'public'}
        isYourAssessment={section == 'private'}
        onClickAglintAssessment={{ onClick: () => setSection('public') }}
        onClickYourAssessment={{ onClick: () => setSection('private') }}
        onClickAddSelectedTemplates={{ onClick: () => handleAddTemplates() }}
        textTemplatesCount={`${count} assessment${
          count === 1 ? '' : 's'
        } selected`}
        isSelected={count !== 0}
        onClickClose={{ onClick: () => handleClose() }}
        slotBrowseCard={
          assessments.length !== 0 && (
            <AllBrowserCards
              assessments={assessments}
              selections={selections[section]}
              handleClick={handleClick}
            />
          )
        }
        slotEmpty={
          assessments.length === 0 && <AssessmentEmpty isCreateNew={false} />
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

type BrowserAssessments = Assessment[] | AssessmentTemplate[];

const AllBrowserCards = ({
  assessments,
  selections,
  handleClick,
}: {
  assessments: BrowserAssessments;
  selections: BrowserAssessments;
  // eslint-disable-next-line no-unused-vars
  handleClick: (action: 'insert' | 'delete', assessment: Assessment) => void;
}) => {
  return (
    <>
      {assessments.map((assessment) => (
        <BrowserCard
          key={assessment.id}
          assessment={assessment}
          handleClick={handleClick}
          selections={selections}
        />
      ))}
    </>
  );
};

const BrowserCard = ({
  assessment,
  handleClick,
  selections,
}: {
  assessment: BrowserAssessments[number];
  selections: BrowserAssessments;
  handleClick: (
    // eslint-disable-next-line no-unused-vars
    action: 'insert' | 'delete',
    // eslint-disable-next-line no-unused-vars
    assessment: BrowserAssessments[number],
  ) => void;
}) => {
  const isSelected = !!selections.find(({ id }) => id === assessment.id);
  return (
    <AssessmentCard
      key={assessment.id}
      textAssessmentName={assessment.title}
      textDescription={assessment.description}
      slotDurationAndLevel={
        <AssessmentDetails
          duration={assessment.duration}
          level={assessment.level}
        />
      }
      slotAssessmentType={<TypeIcon type={assessment.type} />}
      onClickCard={{
        onClick: () =>
          handleClick(isSelected ? 'delete' : 'insert', assessment),
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
