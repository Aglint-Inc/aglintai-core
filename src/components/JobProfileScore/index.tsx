/* eslint-disable security/detect-object-injection */
import { Popover, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';

import {
  AddButton,
  ButtonPrimarySmall,
  Checkbox,
  ScoreCard,
  ScoreCardEdit,
  ScorePillMust,
  ScorePillNice,
  ScoreSetting
} from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import {
  BannerAlert,
  BannerWarning,
  BodyWithSidePanel,
  ProfileScoreSkeleton
} from '@/devlink3';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useJobs } from '@/src/context/JobsContext';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
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
        slotBody={<BodyWithSidePanel slotLeft={<ProfileScore />} />}
      />
    </>
  );
};

const ProfileScore = () => {
  const { job } = useJobDetails();
  return (
    <ScoreSetting
      slotBanner={<Banners />}
      slotScoreCardDetails={
        job.scoring_param_status === 'loading' ? (
          <ProfileScoreSkeleton />
        ) : (
          <>
            <Section type='experience' />
            <Section type='education' />
            <Section type='skills' />
          </>
        )
      }
    />
  );
};

const Banners = () => {
  const { experimental_handleGenerateJd } = useJobs();
  const {
    descriptionChanged,
    scoringPoll,
    validDescription,
    job,
    dismiss,
    setDismiss
  } = useJobDetails();
  if (scoringPoll.status === '')
    if (!validDescription)
      return (
        <BannerWarning
          isDismiss={false}
          isButton={false}
          textBanner={'Job description is unavailable'}
        />
      );
  if (!scoringPoll?.data?.scoring_param_status)
    return (
      <BannerAlert
        textBanner={'Failed to generate profile score'}
        textButton={'Retry'}
        onClickButton={{ onClick: () => experimental_handleGenerateJd(job.id) }}
      />
    );
  if (descriptionChanged)
    return dismiss ? (
      <></>
    ) : (
      <BannerWarning
        onClickDismiss={{ onClick: () => setDismiss(true) }}
        onClickButton={{ onClick: () => experimental_handleGenerateJd(job.id) }}
      />
    );
  return <></>;
};

const Section: FC<{ type: Sections }> = ({ type }) => {
  const { handleJobUpdate } = useJobs();
  const {
    job: { draft, id }
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
      draft: { ...draft, jd_json: { ...jd_json, [section]: newSection } }
    });
  };
  const handleEdit = (
    index: number,
    item: JdJsonType['rolesResponsibilities'][number]
  ) => {
    const newSection = jd_json[section].reduce(
      (acc, curr, i) => {
        if (i === index) acc.push(item);
        else acc.push(curr);
        return acc;
      },
      [] as unknown as (typeof item)[]
    );
    handleJobUpdate(id, {
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: newSection }
      }
    });
  };
  const handleCreate = (item: JdJsonType['rolesResponsibilities'][number]) => {
    handleJobUpdate(id, {
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: [...jd_json[section], item] }
      }
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
                : '#886bd8'
        }
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
          horizontal: 'left'
        }}
        sx={{
          '& .MuiPaper-outlined': {
            border: 'none',
            outline: 'none'
          }
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
                resize: 'none'
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
                onClick: () => onSubmit()
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
          horizontal: 'left'
        }}
        sx={{
          '& .MuiPaper-outlined': {
            border: 'none',
            outline: 'none'
          }
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
                resize: 'none'
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
                onClick: () => onSubmit()
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
          style: { cursor: 'pointer' }
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' }
        }}
        showArrow
      />
      <Breadcrum textName={`Profile Score`} showArrow />
    </>
  );
};

export default JobProfileScoreDashboard;
