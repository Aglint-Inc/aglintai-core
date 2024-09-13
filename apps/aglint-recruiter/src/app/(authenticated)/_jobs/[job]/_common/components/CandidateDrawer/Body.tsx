import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CandidateSideDrawer } from '@devlink/CandidateSideDrawer';
import { ResumeErrorBlock } from '@devlink2/ResumeErrorBlock';
import ResumeWait from '@public/lottie/ResumeWait';
import { CheckCircle2, FileIcon, RefreshCw, UploadCloud } from 'lucide-react';
import { type ReactNode, useCallback, useState } from 'react';

import Loader from '@/components/Common/Loader';
import { useApplication } from '@/context/ApplicationContext';
import { useApplicationStore } from '@/context/ApplicationContext/store';

import { Activity } from './Activity';
import { Details } from './Details';
import { Meta } from './Meta';
import { Resume } from './Resume';
import { TopBar } from './TopBar';

type Props = {
  topBar: ReactNode;
  meta: ReactNode;
  resume: ReactNode;
  details: ReactNode;
  interview: ReactNode;
  tabs: ReactNode;
  tasks: ReactNode;
  activity: ReactNode;
};

const Body = (props: Partial<Props> & { showTabs?: boolean }) => {
  const blocker = useBlocker();
  if (blocker)
    return (
      <CandidateSideDrawer
        slotTopBar={props.topBar ?? <TopBar />}
        slotBasicInfo={blocker}
        isTabs={false}
        slotNewTabPill={<></>}
        slotTabContent={<></>}
      />
    );
  return (
    <CandidateSideDrawer
      slotTopBar={props.topBar ?? <TopBar />}
      slotBasicInfo={props.meta ?? <Meta />}
      slotNewTabPill={
        props.tabs ?? (
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='resume'>Resume</TabsTrigger>
            <TabsTrigger value='details'>Details</TabsTrigger>
            <TabsTrigger value='activity'>Activity</TabsTrigger>
          </TabsList>
        )
      }
      slotTabContent={
        <TabContent
          interview={props.interview}
          details={props.details}
          resume={props.resume}
        />
      }
    />
  );
};

Body.TopBar = TopBar;
Body.Meta = Meta;
Body.Resume = Resume;
Body.Details = Details;
Body.Activity = Activity;

export { Body };

const TabContent = (
  props: Partial<
    Pick<Props, 'details' | 'interview' | 'tasks' | 'activity' | 'resume'>
  >,
) => {
  const tab = useApplicationStore(({ tab }) => tab);
  return (
    <TabsContent value={tab.toLowerCase()}>
      {tab === 'Resume' && (props.resume ?? <Resume />)}
      {tab === 'Details' && (props.details ?? <Details />)}
      {tab === 'Activity' && (props.activity ?? <Activity />)}
    </TabsContent>
  );
};

const useBlocker = () => {
  const { details, meta } = useApplication();
  if (details.status === 'error' || meta.status === 'error')
    return (
      <div className='w-[700px]'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-red-500'>An error occurred. Please try again.</p>
          <Button
            variant='default'
            onClick={() => {
              details.refetch();
              meta.refetch();
            }}
            className='mt-4'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Retry
          </Button>
        </div>
      </div>
    );
  switch (meta?.data?.resume_processing_state) {
    case 'fetching':
    case 'processing':
      return <ResumeErrorBlock slotLottie={<ResumeWait />} />;
    case 'unavailable':
      return <Unavailable />;
    case 'unparsable':
      return <Unparsable />;
  }
  return undefined;
};

const Unparsable = () => {
  const { handleResumeReUpload, handleDeleteApplication } = useApplication();
  const setPreview = useApplicationStore(({ setPreview }) => setPreview);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(async () => {
    if (!loading && file) {
      setLoading(true);
      await handleResumeReUpload([file]);
      setLoading(false);
    }
  }, [file, loading, handleResumeReUpload]);

  const handleDelete = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      await handleDeleteApplication();
      setLoading(false);
    }
  }, [loading, handleDeleteApplication]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <OptimisticWrapper loading={loading}>
        {file ? (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-2'>Upload resume</h2>
            <p className='mb-4'>Upload the resume to score the candidate</p>
            <div className='flex flex-col items-center gap-4'>
              <ResumeUploadComp
                value={file}
                handleChange={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e) => {
                    const selectedFile = (e.target as HTMLInputElement)
                      .files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  };
                  input.click();
                }}
                label={false}
              />
              <Button onClick={handleUpload}>Upload resume</Button>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-2'>Resume not parsable</h2>
            <p className='mb-4'>
              The system is unable to parse the candidate&apos;s resume. Please
              review it manually and proceed accordingly.
            </p>
            <div className='flex flex-col items-center gap-4'>
              <ResumeUploadComp
                value={file}
                handleChange={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e) => {
                    const selectedFile = (e.target as HTMLInputElement)
                      .files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  };
                  input.click();
                }}
                label={false}
              />
              <div className='flex gap-2'>
                <Button variant='outline' onClick={() => setPreview(true)}>
                  <FileIcon className='mr-2 h-4 w-4' />
                  Preview
                </Button>
                <Button variant='destructive' onClick={handleDelete}>
                  Delete application
                </Button>
              </div>
            </div>
          </div>
        )}
      </OptimisticWrapper>
      {loading && (
        <div className='absolute'>
          <Loader />
        </div>
      )}
    </div>
  );
};

const Unavailable = () => {
  const { handleResumeReUpload, handleDeleteApplication } = useApplication();

  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(async () => {
    if (!loading && file) {
      setLoading(true);
      await handleResumeReUpload([file]);
      setLoading(false);
    }
  }, [file, loading, handleResumeReUpload]);

  const handleDelete = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      await handleDeleteApplication();
      setLoading(false);
    }
  }, [loading, handleDeleteApplication]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <OptimisticWrapper loading={loading}>
        {file ? (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-2'>Upload resume</h2>
            <p className='mb-4'>Upload the resume to score the candidate</p>
            <div className='flex flex-col items-center gap-4'>
              <ResumeUploadComp
                value={file}
                handleChange={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e) => {
                    const selectedFile = (e.target as HTMLInputElement)
                      .files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  };
                  input.click();
                }}
                label={false}
              />
              <Button onClick={handleUpload}>Upload resume</Button>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-2'>Resume not found</h2>
            <p className='mb-4'>
              Unable to find the candidate resume. Upload the resume to score
              the candidate
            </p>
            <div className='flex flex-col items-center gap-4'>
              <ResumeUploadComp
                value={file}
                handleChange={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e) => {
                    const selectedFile = (e.target as HTMLInputElement)
                      .files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  };
                  input.click();
                }}
                label={false}
              />
              <Button variant='destructive' onClick={handleDelete}>
                Delete application
              </Button>
            </div>
          </div>
        )}
      </OptimisticWrapper>
      {loading && (
        <div className='absolute'>
          <Loader />
        </div>
      )}
    </div>
  );
};

const ResumeUploadComp = ({
  value,
  handleChange,
  error = false,
  label = true,
}: {
  value: File | undefined;
  handleChange: () => void;
  error?: boolean;
  label?: boolean;
}) => {
  return (
    <div className='space-y-2'>
      {label && (
        <Label htmlFor='resume' className='flex items-center gap-1'>
          Upload Resume <span className='text-red-500'>*</span>
        </Label>
      )}
      <div
        onClick={handleChange}
        className={`border border-dashed rounded-md p-8 cursor-pointer flex items-center justify-center space-x-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } bg-gray-50`}
      >
        {value ? (
          <FileIcon className='h-5 w-5' />
        ) : (
          <UploadCloud className='h-6 w-6' />
        )}
        <span
          className={`text-sm ${error ? 'text-red-500' : 'text-gray-600'} ${
            value ? 'font-medium' : ''
          }`}
        >
          {value ? value.name : 'Upload candidate resume [PDF/DOCX]'}
        </span>
        {value && <CheckCircle2 className='h-4 w-4 text-green-600' />}
      </div>
      {error && (
        <p className='text-red-500 text-sm'>
          Please upload the candidate resume
        </p>
      )}
    </div>
  );
};
