/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { ButtonGhost } from '@devlink/ButtonGhost';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { Checkbox } from '@devlink/Checkbox';
import { ScoreCard } from '@devlink/ScoreCard';
import { ScoreCardEdit } from '@devlink/ScoreCardEdit';
import { ScorePercentage } from '@devlink/ScorePercentage';
import { ScorePillMust } from '@devlink/ScorePillMust';
import { ScorePillNice } from '@devlink/ScorePillNice';
import { ScoreSetting } from '@devlink/ScoreSetting';
import { ScoreWeightage } from '@devlink/ScoreWeightage';
import { Text } from '@devlink/Text';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { GlobalInfo } from '@devlink2/GlobalInfo';
import { PageLayout } from '@devlink2/PageLayout';
import { Skeleton } from '@devlink2/Skeleton';
import { BannerAlert } from '@devlink3/BannerAlert';
import { BodyWithSidePanel } from '@devlink3/BodyWithSidePanel';
import { ProfileScoreSkeleton } from '@devlink3/ProfileScoreSkeleton';
import { Popover, Stack } from '@mui/material';
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

import Loader from '@/components/Common/Loader';
import ScoreWheel, {
  type ScoreWheelParams,
} from '@/components/Common/ScoreWheel';
import UITextField from '@/components/Common/UITextField';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useTour } from '@/context/TourContext';
import { JobNotFound } from '@/job/components/JobNotFound';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { distributeScoreWeights } from '@/job/utils';
import ROUTES from '@/utils/routing/routes';
import { capitalize, capitalizeSentence } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

type Sections = 'experience' | 'education' | 'skills';

export const JobProfileScoreDashboard = () => {
  const { isScoringEnabled } = useRolesAndPermissions();
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && isScoringEnabled && job?.status !== 'closed' ? (
      <ProfileScorePage />
    ) : (
      <JobNotFound />
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
        slotTopbarRight={<Settings />}
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
    <Stack
      style={{
        opacity: job.scoring_criteria_loading ? 0.4 : 1,
        pointerEvents: job.scoring_criteria_loading ? 'none' : 'auto',
      }}
      sx={{
        position: 'sticky',
        top: 0,
        right: 0,
        minHeight: 'calc(100vh - 60px)',
        boxShadow: 1,
        padding: 2,
        bgcolor: 'var(--neutral-2)',
      }}
    >
      <ScoreWeightage
        slotResetButton={
          <ButtonSoft
            color='neutral'
            textButton='Reset'
            isLeftIcon
            iconName='refresh'
            size={2}
            onClickButton={{
              onClick: () => handleReset(),
            }}
          />
        }
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
                <UITextField
                  name='experience'
                  type='number'
                  width='80px'
                  value={weights.experience}
                  onChange={(e) => handleChange(e)}
                  disabled={disabled.experience}
                  // E
                />
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
                <UITextField
                  name='skills'
                  type='number'
                  width='80px'
                  value={weights.skills}
                  onChange={(e) => handleChange(e)}
                  disabled={disabled.skills}
                  // InputProps={{
                  //   endAdornment: (
                  //     <Stack style={{ color: palette.grey[500] }}>%</Stack>
                  //   ),
                  // }}
                />
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
                <UITextField
                  name='education'
                  type='number'
                  width='80px'
                  value={weights.education}
                  onChange={(e) => handleChange(e)}
                  disabled={disabled.education}
                  // InputProps={{
                  //   endAdornment: (
                  //     <Stack style={{ color: palette.grey[500] }}>%</Stack>
                  //   ),
                  // }}
                />
              }
            />
          </>
        }
        slotBanner={<Tips />}
      />
    </Stack>
  );
};

const ProfileScore = () => {
  const { job } = useJob();
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
  const { job, handleRegenerateJd, status } = useJob();
  if (status.loading) return <></>;
  if (status.description_error)
    return (
      <GlobalBannerInline
        textContent='Job description is unavailable'
        iconName='warning'
        color={'error'}
        slotButton={
          <ButtonSolid
            textButton='View'
            size={1}
            onClickButton={{
              onClick: () => push(`/jobs/${job.id}/edit`),
            }}
          />
        }
      />
      // <BannerWarning
      //   textBanner={'Job description is unavailable'}
      //   slotButton={
      //     <ButtonSolid
      //       textButton='View'
      //       size={2}
      //       highContrast='true'
      //       onClickButton={{
      //         onClick: () => push(`/jobs/${job.id}/edit`),
      //       }}
      //     />
      //   }
      // />
    );
  if (status.jd_json_error)
    return (
      <BannerAlert
        textBanner={'No profile score criterias set.'}
        textButton={'Generate'}
        onClickButton={{
          onClick: () => handleRegenerateJd(job),
        }}
      />
    );
  if (status.description_changed && !status.scoring_criteria_changed)
    return (
      <GlobalBannerInline
        color={'warning'}
        textContent='Job description has changed. Regenerate to update scoring criteria.'
        slotButton={
          <>
            <ButtonSoft
              textButton='Ignore'
              size={1}
              color={'neutral'}
              onClickButton={{
                onClick: () => {}, //handleWarningUpdate({ job_description: true }),
              }}
            />
            <ButtonSolid
              textButton='Regenerate'
              size={1}
              onClickButton={{
                onClick: () => handleRegenerateJd(job),
              }}
            />
          </>
        }
      />
      // <BannerWarning
      //   textBanner={
      //     'Job description has changed. Regenerate for updated scoring criterias.'
      //   }
      //   slotButton={
      //     <>
      //       <ButtonSoft
      //         textButton='Ignore'
      //         size={2}
      //         highContrast='true'
      //         onClickButton={{
      //           onClick: () => {}, //handleWarningUpdate({ job_description: true }),
      //         }}
      //       />
      //       <ButtonSolid
      //         textButton='Regenerate'
      //         size={2}
      //         highContrast='true'
      //         onClickButton={{
      //           onClick: () => handleRegenerateJd(job),
      //         }}
      //       />
      //     </>
      //   }
      // />
    );
  return <></>;
};

const Section: FC<{ type: Sections }> = ({ type }) => {
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
  const handleDelete = (index: number) => {
    const newSection = jd_json[section].filter((e, i) => i !== index);
    handleJobUpdate({
      draft: { ...draft, jd_json: { ...jd_json, [section]: newSection } },
    });
  };
  const handleEdit = (
    index: number,
    item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number],
  ) => {
    if (
      (jd_json?.[section] ?? []).find(
        ({ field }, i) =>
          (field ?? '').trim().toLowerCase() ===
            (item?.field ?? '').trim().toLowerCase() && i !== index,
      )
    ) {
      toast.error('Entry already present');
      return;
    }
    const newSection = jd_json[section].reduce(
      (acc, curr, i) => {
        if (i === index) acc.push(item);
        else acc.push(curr);
        return acc;
      },
      [] as unknown as (typeof item)[],
    );
    handleJobUpdate({
      draft: {
        ...draft,
        jd_json: { ...jd_json, [section]: newSection },
      },
    });
  };
  const handleCreate = (
    item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number],
  ) => {
    if (
      (jd_json?.[section] ?? []).find(
        ({ field }) =>
          (field ?? '').trim().toLowerCase() ===
          (item?.field ?? '').trim().toLowerCase(),
      )
    ) {
      toast.error('Entry already present');
      return;
    }
    handleJobUpdate({
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
  item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number];
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number],
  ) => void;
  handleDelete: () => void;
}> = ({ type, item, handleSubmit, handleDelete }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.field);
  const [check, setCheck] = useState(item.isMustHave);
  const onSubmit = () => {
    if (value !== '') {
      handleSubmit({ ...item, field: value, isMustHave: check });
      setOpen(false);
    }
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
          '& .MuiPaper-root': {
            borderRadius: 'var(--radius-3)',
          },
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
                backgroundColor: 'transparent',
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
          slotButton={
            <ButtonGhost
              textButton='Delete'
              size={2}
              color={'error'}
              onClickButton={{ onClick: () => onDelete() }}
              isLeftIcon
              iconName='delete'
            />
          }
          slotButtonUpdate={
            <ButtonSolid
              size={'2'}
              isLeftIcon={false}
              isRightIcon={false}
              isDisabled={!value}
              onClickButton={{
                onClick: () => onSubmit(),
              }}
              textButton='Update'
            />
          }
        />
      </Popover>
    </Stack>
  );
};

const AddOption: FC<{
  type: Sections;
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    item: DatabaseTable['public_jobs']['jd_json']['rolesResponsibilities'][number],
  ) => void;
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
    if (value !== '') {
      handleSubmit({ id: nanoid(), field: value, isMustHave: check });
      handleClose();
    }
  };
  return (
    <Stack ref={ref}>
      <ButtonSoft
        textButton={`Add ${capitalize(type)}`}
        iconName='Add'
        isLeftIcon
        size={1}
        onClickButton={{
          onClick: () => setOpen(true),
        }}
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
          slotButton={
            <ButtonSoft
              textButton='Cancel'
              color={'neutral'}
              size={2}
              onClickButton={{ onClick: () => handleClose() }}
            />
          }
          slotButtonUpdate={
            <ButtonSolid
              size={'2'}
              isLeftIcon={false}
              isRightIcon={false}
              isDisabled={!value}
              onClickButton={{
                onClick: () => onSubmit(),
              }}
              textButton='Submit'
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
      <Stack
        bgcolor={'white'}
        borderRadius={'4px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'4px'}
        padding={'var(--space-3)'}
      >
        <Text
          content='How It Works'
          weight={'medium'}
          size={2}
          color={'info'}
        />
        <Text
          content='Adjust the weightage for Experience, Skills, and Education to customize the profile score. The total must equal 100%. Use the input fields to set percentages. Click "Reset" to restore default settings.'
          size={2}
          weight={'regular'}
          color='neutral'
        />
      </Stack>

      {firstVisit && (
        <Stack marginTop={'16px'}>
          <GlobalInfo
            color={'purple'}
            iconName='lightbulb'
            textTitle={'Pro Tip'}
            textDescription={
              'Tailor the evaluation criteria to match the specific needs of the role you are hiring for by adjusting the weightages.'
            }
            showCloseButton
            onClickClose={{ onClick: () => handleTip() }}
          />
        </Stack>
      )}
    </>
  );
};
