/* eslint-disable security/detect-object-injection */
import { Popover, Stack } from '@mui/material';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';

import { AddButton } from '@/devlink/AddButton';
import { ButtonPrimarySmall } from '@/devlink/ButtonPrimarySmall';
import { Checkbox } from '@/devlink/Checkbox';
import { ScoreCard } from '@/devlink/ScoreCard';
import { ScoreCardEdit } from '@/devlink/ScoreCardEdit';
import { ScorePercentage } from '@/devlink/ScorePercentage';
import { ScorePillMust } from '@/devlink/ScorePillMust';
import { ScorePillNice } from '@/devlink/ScorePillNice';
import { ScoreSetting } from '@/devlink/ScoreSetting';
import { ScoreWeightage } from '@/devlink/ScoreWeightage';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { Skeleton } from '@/devlink2/Skeleton';
import { BannerAlert } from '@/devlink3/BannerAlert';
import { BannerWarning } from '@/devlink3/BannerWarning';
import { BodyWithSidePanel } from '@/devlink3/BodyWithSidePanel';
import { ProfileScoreSkeleton } from '@/devlink3/ProfileScoreSkeleton';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';
import { useJobs } from '@/src/context/JobsContext';
import NotFoundPage from '@/src/pages/404';
import { Job } from '@/src/queries/jobs/types';

import Loader from '../Common/Loader';
import ScoreWheel, { ScoreWheelParams } from '../Common/ScoreWheel';
import UITextField from '../Common/UITextField';
import { capitalize } from '../JobApplicationsDashboard/utils';
import { JdJsonType } from '../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';

type Sections = 'experience' | 'education' | 'skills';

const JobProfileScoreDashboard = () => {
  const { initialLoad, job } = useJobDetails();

  return initialLoad ? (
    job !== undefined && job.status !== 'closed' ? (
      <ProfileScorePage />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const ProfileScorePage = () => {
  return (
    <>
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotBody={
          <BodyWithSidePanel
            slotLeft={<ProfileScore />}
            slotRight={<ProfileScoreControls />}
          />
        }
      />
    </>
  );
};

const ProfileScoreControls = () => {
  const { handleJobAsyncUpdate } = useJobs();
  const { handleJobApplicationRecalculate } = useJobApplications();
  const { job } = useJobDetails();
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
    await handleJobAsyncUpdate(job.id, { parameter_weights: safeWeights });
    await handleJobApplicationRecalculate();
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
    <Stack
      style={{
        opacity: job.scoring_criteria_loading ? 0.4 : 1,
        pointerEvents: job.scoring_criteria_loading ? 'none' : 'auto',
      }}
    >
      <ScoreWeightage
        onClickEqualize={{ onClick: () => handleReset() }}
        slotScoreWheel={
          <>
            <Stack
              direction={'row'}
              width={'80%'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'40px'}
            >
              <ScoreWheel
                id={'ScoreWheelSetting'}
                parameter_weights={weights}
              />
            </Stack>
          </>
        }
        slotScorePercent={
          <>
            <ScorePercentage
              colorPropsBg={{
                style: {
                  backgroundColor: '#30AABC',
                },
              }}
              textTitle={'Experience'}
              slotInputPercent={
                <>
                  <UITextField
                    name='experience'
                    type='number'
                    width='70px'
                    value={weights.experience}
                    onChange={(e) => handleChange(e)}
                    disabled={disabled.experience}
                  />
                </>
              }
            />
            <ScorePercentage
              colorPropsBg={{
                style: {
                  backgroundColor: '#886BD8',
                },
              }}
              textTitle={'Skills'}
              slotInputPercent={
                <>
                  <UITextField
                    name='skills'
                    type='number'
                    width='70px'
                    value={weights.skills}
                    onChange={(e) => handleChange(e)}
                    disabled={disabled.skills}
                  />
                </>
              }
            />
            <ScorePercentage
              colorPropsBg={{
                style: {
                  backgroundColor: '#5D7DF5',
                },
              }}
              textTitle={'Education'}
              slotInputPercent={
                <>
                  <UITextField
                    name='education'
                    type='number'
                    width='70px'
                    value={weights.education}
                    onChange={(e) => handleChange(e)}
                    disabled={disabled.education}
                  />
                </>
              }
            />
          </>
        }
      />
    </Stack>
  );
};

export const distributeScoreWeights = (jd_json: Job['draft']['jd_json']) => {
  const disabled = {
    experience: (jd_json?.rolesResponsibilities ?? []).length === 0,
    skills: (jd_json?.skills ?? []).length === 0,
    education: (jd_json?.educations ?? []).length === 0,
  };
  const count = Object.values(disabled).filter((v) => !v).length;
  const resets = Object.entries(disabled).reduce((acc, [key, value]) => {
    if (value) return { ...acc, [key]: 0 };
    return acc;
  }, {} as ScoreWheelParams);
  const { obj } = Object.entries(disabled)
    .filter(([, value]) => !value)
    .reduce(
      (acc, [key], i) => {
        const c = Math.trunc(100 / count);
        if (i === count - 1) {
          acc.obj[key] = acc.total;
          acc.total = 0;
        } else {
          acc.obj[key] = c;
          acc.total -= c;
        }
        return acc;
      },
      {
        obj: {} as ScoreWheelParams,
        total: 100,
      },
    );
  return { ...resets, ...obj };
};

const ProfileScore = () => {
  const { job } = useJobDetails();
  return (
    <ScoreSetting
      slotBanner={<Banners />}
      slotScoreCardDetails={
        job.scoring_criteria_loading ? (
          <ProfileScoreSkeleton slotSkeleton={<Skeleton />} />
        ) : (
          <>
            <Section type='experience' />
            <Section type='skills' />
            <Section type='education' />
          </>
        )
      }
    />
  );
};

const Banners = () => {
  const { push } = useRouter();
  const { experimental_handleRegenerateJd } = useJobs();
  const { status, job } = useJobDetails();
  const { dismissWarnings, setDismissWarnings } = useJobDashboardStore(
    ({ dismissWarnings, setDismissWarnings }) => ({
      dismissWarnings,
      setDismissWarnings,
    }),
  );
  if (status.loading) return <></>;
  if (status.description_error)
    return (
      <BannerWarning
        isDismiss={false}
        onClickButton={{ onClick: () => push(`/jobs/${job.id}/edit`) }}
        textButton={'View'}
        textBanner={'Job description is unavailable.'}
      />
    );
  if (status.jd_json_error)
    return (
      <BannerAlert
        textBanner={'No profile score criterias set.'}
        textButton={'Generate'}
        onClickButton={{
          onClick: () => experimental_handleRegenerateJd(job),
        }}
      />
    );
  if (status.description_changed)
    return dismissWarnings.job_description ? (
      <></>
    ) : (
      <BannerWarning
        textBanner={
          'Job description has changed. Regenerate for updated scoring criterias.'
        }
        onClickDismiss={{
          onClick: () => setDismissWarnings({ job_description: true }),
        }}
        onClickButton={{
          onClick: () => experimental_handleRegenerateJd(job),
        }}
      />
    );
  return <></>;
};

const Section: FC<{ type: Sections }> = ({ type }) => {
  const { handleJobUpdate } = useJobs();
  const {
    job: { draft, id },
  } = useJobDetails();
  const { jd_json } = draft;
  const section: keyof typeof jd_json =
    type === 'experience'
      ? 'rolesResponsibilities'
      : type === 'education'
        ? 'educations'
        : 'skills';
  const handleDelete = (index: number) => {
    const newSection = jd_json[section].filter((e, i) => i !== index);
    handleJobUpdate(id, {
      draft: { ...draft, jd_json: { ...jd_json, [section]: newSection } },
    });
  };
  const handleEdit = (
    index: number,
    item: JdJsonType['rolesResponsibilities'][number],
  ) => {
    const newSection = jd_json[section].reduce(
      (acc, curr, i) => {
        if (i === index) acc.push(item);
        else acc.push(curr);
        return acc;
      },
      [] as unknown as (typeof item)[],
    );
    handleJobUpdate(id, {
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: newSection },
      },
    });
  };
  const handleCreate = (item: JdJsonType['rolesResponsibilities'][number]) => {
    handleJobUpdate(id, {
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: [...jd_json[section], item] },
      },
    });
  };
  const pills = jd_json[section].map((item, i) => (
    <Pill
      key={i}
      type={type}
      item={item}
      handleSubmit={(e) => handleEdit(i, e)}
      handleDelete={() => handleDelete(i)}
    />
  ));
  return (
    <ScoreCard
      colorPropsHeading={{
        style: {
          backgroundColor:
            type === 'experience'
              ? '#30aabc'
              : type === 'education'
                ? '#5d7df5'
                : '#886bd8',
        },
      }}
      textHeading={capitalize(type)}
      slotScorePills={pills}
      slotAddButton={
        <AddOption type={type} handleSubmit={(e) => handleCreate(e)} />
      }
    />
  );
};

const Pill: FC<{
  type: Sections;
  item: JdJsonType['rolesResponsibilities'][number];
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (item: JdJsonType['rolesResponsibilities'][number]) => void;
  handleDelete: () => void;
}> = ({ type, item, handleSubmit, handleDelete }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.field);
  const [check, setCheck] = useState(item.isMustHave);
  const onSubmit = () => {
    handleSubmit({ ...item, field: value, isMustHave: check });
    setOpen(false);
  };
  const onDelete = () => {
    handleDelete();
    setOpen(false);
  };
  useEffect(() => {
    setValue(item.field);
    setCheck(item.isMustHave);
  }, [...Object.values(item)]);
  return (
    <Stack ref={ref}>
      {item.isMustHave ? (
        <ScorePillMust
          onClickEditText={{ onClick: () => setOpen(true) }}
          textDetails={item.field}
        />
      ) : (
        <ScorePillNice
          onClickEditText={{ onClick: () => setOpen(true) }}
          textDetails={item.field}
        />
      )}
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={ref.current}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-outlined': {
            border: 'none',
            outline: 'none',
          },
        }}
      >
        <ScoreCardEdit
          slotCheckBox={
            <Checkbox
              isChecked={check}
              onClickCheck={{ onClick: () => setCheck((prev) => !prev) }}
            />
          }
          slotTextEdit={
            <textarea
              style={{
                width: type === 'experience' ? '500px' : '250px',
                outline: 'none',
                border: 'none',
                backgroundColor: '#f8f9f9',
                resize: 'none',
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              placeholder={'Experience details'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
          isDeleteVisible={true}
          isCancelVisible={false}
          onClickDelete={{ onClick: () => onDelete() }}
          slotButtonUpdate={
            <ButtonPrimarySmall
              isDisabled={value === ''}
              textLabel={'Submit'}
              onClickButton={{
                onClick: () => onSubmit(),
              }}
            />
          }
        />
      </Popover>
    </Stack>
  );
};

const AddOption: FC<{
  type: Sections;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (item: JdJsonType['rolesResponsibilities'][number]) => void;
}> = ({ type, handleSubmit }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [check, setCheck] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setValue('');
      setCheck(false);
    }, 400);
  };
  const onSubmit = () => {
    handleSubmit({ id: nanoid(), field: value, isMustHave: check });
    handleClose();
  };
  return (
    <Stack ref={ref}>
      <AddButton
        textAddButton={`Add ${type}`}
        onClickAdd={{ onClick: () => setOpen(true) }}
      />
      <Popover
        open={open}
        onClose={() => handleClose()}
        anchorEl={ref.current}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-outlined': {
            border: 'none',
            outline: 'none',
          },
        }}
      >
        <ScoreCardEdit
          slotCheckBox={
            <Checkbox
              isChecked={check}
              onClickCheck={{ onClick: () => setCheck((prev) => !prev) }}
            />
          }
          slotTextEdit={
            <textarea
              style={{
                width: type === 'experience' ? '500px' : '250px',
                outline: 'none',
                border: 'none',
                backgroundColor: '#f8f9f9',
                resize: 'none',
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              placeholder={`Type ${type} here`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
          isDeleteVisible={false}
          isCancelVisible={true}
          onClickCancel={{ onClick: () => handleClose() }}
          slotButtonUpdate={
            <ButtonPrimarySmall
              isDisabled={value === ''}
              textLabel={'Submit'}
              onClickButton={{
                onClick: () => onSubmit(),
              }}
            />
          }
        />
      </Popover>
    </Stack>
  );
};

//TODO: Experience form must be big

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJobDetails();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Profile Score`} showArrow />
    </>
  );
};

export default JobProfileScoreDashboard;
