/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Skeleton } from '@components/ui/skeleton';
import { Command } from 'cmdk';
import {
  Edit2,
  Lightbulb,
  Loader2,
  PlusCircle,
  RefreshCcw,
  X,
} from 'lucide-react';
import { CircleDot } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import {
  type ChangeEventHandler,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ScoreWheel, {
  type ScoreWheelParams,
} from '@/components/Common/ScoreWheel';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { TourProvider, useTour } from '@/context/TourContext';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { distributeScoreWeights } from '@/job/utils';
import ROUTES from '@/utils/routing/routes';
import { capitalize, capitalizeSentence } from '@/utils/text/textUtils';

type Sections = 'experience' | 'education' | 'skills';

export const JobProfileScoreDashboard = () => {
  const { isScoringEnabled } = useRolesAndPermissions();
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && isScoringEnabled && job?.status !== 'closed' ? (
      <TourProvider>
        <ProfileScorePage />
      </TourProvider>
    ) : (
      // TODO: When we move to app router, we should move to separate component
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Job Not Found</h1>
          <p className='text-gray-600'>
            The job you&apos;re looking for doesn&apos;t exist or you don`&apost
            have permission to view it.
          </p>
        </div>
      </div>
    )
  ) : (
    // TODO: When we move to app router, we should move to separate skeleton component
    <div className='container mx-auto p-6 flex flex-col space-y-6'>
      <div className='flex justify-between items-center'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-10 w-10 rounded-full' />
      </div>
      <div className='flex gap-6'>
        <div className='w-1/4'>
          <Skeleton className='h-[calc(100vh-200px)] w-full' />
        </div>
        <div className='w-3/4 space-y-4'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-full' />
          <div className='flex gap-6'>
            <div className='flex-1'>
              <Skeleton className='h-64 w-full' />
            </div>
            <div className='w-1/3 space-y-4'>
              <Skeleton className='h-40 w-full' />
              <Skeleton className='h-40 w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileScorePage = () => {
  return (
    <>
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-2xl font-bold mb-2'>Job Settings</h1>
              <BreadCrumbs />
            </div>
            <Settings />
          </div>

          <div className='flex gap-6 mb-6'>
            <div className='w-1/4'>
              <JobsSideNavV2 />
            </div>
            <div className='w-3/4'>
              <h2 className='text-xl font-bold mb-2'>Profile Scoring</h2>
              <p className='text-sm text-gray-600 mb-4'>
                Profile scoring helps evaluate candidates objectively, assigning
                numerical values to their qualifications and experience to
                streamline the hiring process and identify the best-fit
                applicants efficiently.
              </p>
              <div className='flex'>
                <div className='flex-1'>
                  <ProfileScore />
                </div>
                <div className='w-1/3'>
                  <Tips />
                  <ProfileScoreControls />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileScoreControls = () => {
  const { job, handleJobAsyncUpdate } = useJob();
  const initialRef = useRef(false);
  const initialSubmitRef = useRef(false);
  const jd_json = job.draft.jd_json;
  const parameter_weights = job.parameter_weights as ScoreWheelParams;
  const disabled = {
    experience: (jd_json?.rolesResponsibilities ?? []).length === 0,
    skills: (jd_json?.skills ?? []).length === 0,
    education: (jd_json?.educations ?? []).length === 0,
  };
  const allDisabled =
    disabled.education && disabled.skills && disabled.experience;
  const [weights, setWeight] = useState<ScoreWheelParams>(parameter_weights);
  const safeWeights = Object.entries(weights).reduce((acc, [key, value]) => {
    acc[key] = +value;
    return acc;
  }, {} as ScoreWheelParams);
  const sum = Object.values(safeWeights).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const hasChanged = Object.entries(safeWeights).reduce((acc, [key, value]) => {
    if (!acc && value !== parameter_weights[key]) return true;
    return acc;
  }, false);
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const entry = e.target.value as any;
    const safeEntry = +entry;
    const newSum = sum - weights[e.target.name] + safeEntry;
    if (entry === null || entry === '')
      setWeight((prev) => ({ ...prev, [e.target.name]: null }));
    else if (safeEntry < 0)
      setWeight((prev) => ({ ...prev, [e.target.name]: 0 }));
    else if (newSum > 100)
      setWeight((prev) => ({
        ...prev,
        [e.target.name]: 100 - newSum + safeEntry,
      }));
    else setWeight((prev) => ({ ...prev, [e.target.name]: safeEntry }));
  };
  const handleReset = () => {
    const obj = distributeScoreWeights(job.draft.jd_json);
    setWeight(obj);
  };
  const handleSubmit = async () => {
    await handleJobAsyncUpdate({ parameter_weights: safeWeights });
  };
  useEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true;
      return;
    }
    handleReset();
  }, Object.values(disabled));
  useEffect(() => {
    if (!initialSubmitRef.current) {
      initialSubmitRef.current = true;
      return;
    }
    if (hasChanged && (sum === 100 || allDisabled)) {
      const timeout = setTimeout(() => handleSubmit(), 400);
      return () => clearTimeout(timeout);
    }
  }, Object.values(safeWeights));
  return (
    <div
      className={`sticky top-0 right-0 min-h-[calc(100vh-60px)] p-4 ${
        job.scoring_criteria_loading ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      <div className='space-y-4'>
        <div className='flex justify-end'>
          <Button variant='outline' size='sm' onClick={() => handleReset()}>
            <RefreshCcw className='mr-2 h-4 w-4' /> Reset
          </Button>
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-row w-4/5 justify-center items-center gap-10'>
            <ScoreWheel id={'ScoreWheelSetting'} parameter_weights={weights} />
          </div>
        </div>
        <div className='space-y-2'>
          <Input
            type='number'
            name='experience'
            value={weights.experience}
            onChange={(e) => handleChange(e)}
            disabled={disabled.experience}
            className='w-20 bg-white'
          />
          <Input
            type='number'
            name='skills'
            value={weights.skills}
            onChange={(e) => handleChange(e)}
            disabled={disabled.skills}
            className='w-20 bg-white'
          />
          <Input
            type='number'
            name='education'
            value={weights.education}
            onChange={(e) => handleChange(e)}
            disabled={disabled.education}
            className='w-20 bg-white'
          />
        </div>
        {/* <Tips /> */}
      </div>
    </div>
  );
};

const ProfileScore = () => {
  const { job } = useJob();
  const parameter_weights = job.parameter_weights as ScoreWheelParams;

  return (
    <div className='space-y-4'>
      <Banners />
      {job.scoring_criteria_loading ? (
        <div className='space-y-4'>
          <Skeleton className='h-52 w-full' />
        </div>
      ) : (
        <Card className='w-full'>
          <CardContent className='pt-6'>
            <Accordion type='single' defaultValue='experience' collapsible>
              <AccordionItem value='experience'>
                <AccordionTrigger>
                  <SectionHeader
                    type='experience'
                    weight={parameter_weights.experience}
                    color='#30aabc'
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <SectionContent type='experience' />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='skills'>
                <AccordionTrigger>
                  <SectionHeader
                    type='skills'
                    weight={parameter_weights.skills}
                    color='#886bd8'
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <SectionContent type='skills' />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='education'>
                <AccordionTrigger>
                  <SectionHeader
                    type='education'
                    weight={parameter_weights.education}
                    color='#5d7df5'
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <SectionContent type='education' />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
      {job.scoring_criteria_loading && (
        <div>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      )}
    </div>
  );
};

const SectionHeader: FC<{ type: Sections; weight: number; color: string }> = ({
  type,
  weight,
  color,
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <CircleDot className='h-4 w-4' style={{ color }} />
      <span className='font-medium'>{capitalize(type)}</span>
      <span className='text-sm text-gray-500'>({weight}%)</span>
    </div>
  );
};

const SectionContent: FC<{ type: Sections }> = ({ type }) => {
  const {
    job: { draft },
    handleJobUpdate,
  } = useJob();
  const { jd_json } = draft;
  const section: keyof typeof jd_json =
    type === 'experience'
      ? 'rolesResponsibilities'
      : type === 'education'
        ? 'educations'
        : 'skills';

  const [newTags, setNewTags] = useState('');

  const handleAddTags = () => {
    if (newTags.trim() !== '') {
      const tagsArray = newTags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');
      const newItems = tagsArray.map((tag) => ({
        id: nanoid(),
        field: tag,
        isMustHave: false,
      }));
      handleJobUpdate({
        draft: {
          ...draft,
          jd_json: {
            ...jd_json,
            [section]: [...jd_json[section], ...newItems],
          },
        },
      });
      setNewTags('');
    }
  };

  const handleTagChange = (index: number, updatedItem: any) => {
    const newSection = jd_json[section].map((item, i) =>
      i === index ? updatedItem : item,
    );
    handleJobUpdate({
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: newSection },
      },
    });
  };

  const handleTagDelete = (index: number) => {
    const newSection = jd_json[section].filter((_, i) => i !== index);
    handleJobUpdate({
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: newSection },
      },
    });
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {jd_json[section].map((item, index) => (
          <Tag
            key={item.id}
            item={item}
            onChange={(updatedItem) => handleTagChange(index, updatedItem)}
            onDelete={() => handleTagDelete(index)}
          />
        ))}
      </div>
      <div className='flex items-center'>
        <Input
          placeholder={`Add new ${type} (comma-separated for multiple)`}
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTags();
            }
          }}
          className='flex-grow'
        />
        <Button
          size='sm'
          onClick={handleAddTags}
          variant='outline'
          className='ml-2'
        >
          <PlusCircle className='h-4 w-4 mr-1' />
          Add
        </Button>
      </div>
    </div>
  );
};

const Tag: FC<{
  item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number];
  // eslint-disable-next-line no-unused-vars
  onChange: (updatedItem: any) => void;
  onDelete: () => void;
}> = ({ item, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.field);

  const handleSubmit = () => {
    if (value.trim() !== '') {
      onChange({ ...item, field: value.trim() });
      setIsEditing(false);
    }
  };

  return (
    <div className='group relative inline-block'>
      {isEditing ? (
        <div className='flex items-center bg-white border rounded-md overflow-hidden'>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className='w-full h-8 p-1 text-sm border-none focus:ring-0'
          />
          <button
            onClick={handleSubmit}
            className='px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
            title='Press Enter to save'
          >
            <Command className='h-4 w-4' />
          </button>
        </div>
      ) : (
        <div className='inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
          {item.field}
          <button
            onClick={() => setIsEditing(true)}
            className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'
          >
            <Edit2 className='h-4 w-4' />
          </button>
          <button
            onClick={onDelete}
            className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
};

const Banners = () => {
  const { push } = useRouter();
  const { job, handleRegenerateJd, status } = useJob();
  if (status.loading) return <></>;
  if (status.description_error)
    return (
      <Alert variant='error'>
        <AlertTitle>Job description is unavailable</AlertTitle>
        <AlertDescription>
          <Button onClick={() => push(`/jobs/${job.id}/edit`)}>View</Button>
        </AlertDescription>
      </Alert>
    );
  if (status.jd_json_error)
    return (
      <Alert>
        <AlertTitle>No profile score criterias set.</AlertTitle>
        <AlertDescription>
          <Button onClick={() => handleRegenerateJd(job)}>Generate</Button>
        </AlertDescription>
      </Alert>
    );
  if (status.description_changed && !status.scoring_criteria_changed)
    return (
      <Alert>
        <AlertTitle>Job description has changed.</AlertTitle>
        <AlertDescription>
          Regenerate to update scoring criteria.
          <div className='mt-2'>
            <Button variant='outline' className='mr-2'>
              Ignore
            </Button>
            <Button onClick={() => handleRegenerateJd(job)}>Regenerate</Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  return <></>;
};

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href='#'
            onClick={() => push(ROUTES['/jobs/[job]']({ job: job?.id }))}
          >
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile Score</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Tips = () => {
  const {
    tour: { data },
    handleCreateTourLog,
  } = useTour();
  const firstVisit = useMemo(
    () => !(data ?? ['profile_score_intro']).includes('profile_score_intro'),
    [data],
  );
  const handleTip = useCallback(() => {
    if (firstVisit) handleCreateTourLog({ type: 'profile_score_intro' });
  }, [handleCreateTourLog, firstVisit]);
  return (
    <>
      <div className='bg-white rounded-md flex flex-col gap-1 p-3'>
        <p className='text-info font-semibold text-sm'>How It Works</p>
        <p className='text-sm text-muted-foreground'>
          Adjust the weightage for Experience, Skills, and Education to
          customize the profile score. The total must equal 100%. Use the input
          fields to set percentages. Click &quot;Reset&quot; to restore default
          settings.
        </p>
      </div>

      {firstVisit && (
        <div className='mt-4'>
          <div className='bg-purple-100 p-4 rounded-md flex items-start space-x-4'>
            <Lightbulb className='w-6 h-6 text-purple-500 flex-shrink-0' />
            <div className='flex-grow'>
              <h4 className='text-lg font-semibold text-purple-700 mb-1'>
                Pro Tip
              </h4>
              <p className='text-sm text-purple-600'>
                Tailor the evaluation criteria to match the specific needs of
                the role you are hiring for by adjusting the weightages.
              </p>
            </div>
            <button
              onClick={handleTip}
              className='text-purple-500 hover:text-purple-700 focus:outline-none'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
