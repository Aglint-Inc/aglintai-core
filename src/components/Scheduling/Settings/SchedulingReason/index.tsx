/* eslint-disable security/detect-object-injection */
import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import { useState } from 'react';

import {
  NewTabPill,
  ReasonList,
  ScheduleReason,
  ScheduleReasonSection,
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { DatabaseTable, DatabaseTableUpdate } from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

const initialReasons: DatabaseTable['recruiter']['scheduling_reason'] = {
  candidate: {
    rescheduling: ['other'],
    cancelation: ['other'],
  },
  interviewer: {
    rescheduling: ['other'],
    cancelation: ['other'],
  },
};

const SchedulingRegions = () => {
  const { recruiter, setRecruiter: updateRecruiter } = useAuthDetails();
  const [tab, setTab] =
    useState<keyof DatabaseTable['recruiter']['scheduling_reason']>(
      'candidate',
    );
  const reason = {
    ...(recruiter.scheduling_reason ?? initialReasons),
  };
  const handelUpdateReasons = async <T extends typeof tab>(
    updatedReason: Partial<DatabaseTable['recruiter']['scheduling_reason'][T]>,
  ) => {
    const temp = {
      ...reason,
    };
    temp[tab] = { ...(temp[tab] || {}), ...updatedReason };
    return setRecruiter({
      id: recruiter.id,
      scheduling_reason: temp,
    }).then((data) => {
      updateRecruiter({ ...data, socials: recruiter.socials });
      return true;
    });
  };
  return (
    <>
      <ScheduleReason
        sloNewTabPill={
          <>
            {(
              Object.keys(
                recruiter.scheduling_reason || {},
              ) as unknown as (keyof DatabaseTable['recruiter']['scheduling_reason'])[]
            ).map((key) => (
              <NewTabPill
                key={key}
                textLabel={capitalizeFirstLetter(key)}
                isPillActive={key === tab}
                onClickPill={{
                  onClick: () => {
                    setTab(key);
                  },
                }}
              />
            ))}
          </>
        }
        slotScheduleReasonSection={
          <>
            {Object.keys(reason[tab]).map(<T extends typeof tab>(item) => {
              const typedItem =
                item as keyof DatabaseTable['recruiter']['scheduling_reason'][T] &
                  string;
              return (
                <ScheduleReasonSectionCard
                  key={item}
                  scheduleReason={typedItem}
                  updateReasons={handelUpdateReasons}
                  description={`Add reasons for ${capitalizeFirstLetter(item)}. These options will be available when the ${capitalizeFirstLetter(tab)} request Session ${capitalizeFirstLetter(item)}:`}
                  scheduleReasonItems={reason[tab][item] || []}
                />
              );
            })}
          </>
        }
      />
    </>
  );
};
export default SchedulingRegions;

const ScheduleReasonSectionCard = <
  T extends keyof DatabaseTable['recruiter']['scheduling_reason'],
>({
  scheduleReason,
  description,
  updateReasons,
  scheduleReasonItems,
}: {
  scheduleReason: keyof DatabaseTable['recruiter']['scheduling_reason'][T] &
    string;
  description: string;
  updateReasons: (
    // eslint-disable-next-line no-unused-vars
    updatedReason: DatabaseTable['recruiter']['scheduling_reason'][T],
  ) => Promise<boolean>;
  scheduleReasonItems: string[];
}) => {
  const [edit, setEdit] = useState<{
    state: boolean;
    index: number;
  }>({ state: false, index: null });
  return (
    <ScheduleReasonSection
      textHeading={`Session ${capitalize(scheduleReason)} Reason`}
      textDesc={description}
      onClickAdd={{
        onClick: () => {
          setEdit({ state: true, index: null });
        },
      }}
      slotReasonList={
        <>
          {scheduleReasonItems.map((item, index) => (
            <ReasonListItem
              key={item}
              text={item}
              onEdit={() => setEdit({ state: true, index })}
              onDelete={() => {
                const temp: DatabaseTable['recruiter']['scheduling_reason'][T] =
                  {
                    [scheduleReason]:
                      scheduleReasonItems?.filter((_, ind) => index !== ind) ||
                      [],
                  };
                updateReasons(temp).then(() => {
                  toast.success('Deleted Successfully.');
                });
              }}
            />
          ))}
          {edit.state && (
            <AddEditReasonsDialogs
              title={`${edit.index === null ? 'Add' : 'Update'} ${capitalize(scheduleReason)} Reasons`}
              item={
                edit.index !== null
                  ? {
                      text: scheduleReasonItems[Number(edit.index)],
                      index: edit.index,
                    }
                  : null
              }
              onSubmit={({ text, index }) => {
                const temp = { [scheduleReason]: scheduleReasonItems || [] };

                if (index !== null) {
                  temp[String(scheduleReason)][Number(index)] = text;
                } else {
                  temp[String(scheduleReason)].push(text);
                }
                updateReasons(temp).then(() => {
                  toast.success(
                    `${index === null ? 'Added' : 'Update'} Successfully.`,
                  );
                  setEdit({ state: false, index: null });
                });
              }}
              onClose={() => {
                setEdit({ state: false, index: null });
              }}
            />
          )}
        </>
      }
    />
  );
};

const ReasonListItem = ({
  text,
  onEdit,
  onDelete,
}: {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onEdit: (x: {
    type: keyof DatabaseTable['recruiter']['scheduling_reason'];
    index: number;
  }) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (x: { index: number }) => void;
}) => {
  return (
    <ReasonList
      textReason={text}
      onClickEdit={{ onClick: onEdit }}
      onClickDelete={{ onClick: onDelete }}
    />
  );
};

const AddEditReasonsDialogs = ({
  title,
  item,
  onSubmit,
  onClose,
}: {
  title: string;
  item: { text: string; index: number } | null;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (x: { text: string; index: number }) => void;
  onClose: () => void;
}) => {
  const [val, setVal] = useState<string>(item?.text || null);
  return (
    <Dialog
      open={true}
      onClose={onClose}
      sx={{ '& .MuiPaper-root': { borderRadius: '12px' } }}
    >
      <Stack p={3} gap={2} width={{ md: '500px' }}>
        <Stack
          direction={'row'}
          width={'100%'}
          justifyContent={'space-between'}
        >
          <Typography fontSize={'14px'} fontWeight={600}>
            {title}{' '}
          </Typography>
          <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
            <svg
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.28125 1.71875L8 7.4375L13.7188 1.71875C14.0729 1.42708 14.4271 1.42708 14.7812 1.71875C15.0729 2.07292 15.0729 2.42708 14.7812 2.78125L9.0625 8.5L14.7812 14.2188C15.0729 14.5729 15.0729 14.9271 14.7812 15.2812C14.4271 15.5729 14.0729 15.5729 13.7188 15.2812L8 9.5625L2.28125 15.2812C1.92708 15.5729 1.57292 15.5729 1.21875 15.2812C0.927083 14.9271 0.927083 14.5729 1.21875 14.2188L6.9375 8.5L1.21875 2.78125C0.927083 2.42708 0.927083 2.07292 1.21875 1.71875C1.57292 1.42708 1.92708 1.42708 2.28125 1.71875Z'
                fill='#68737D'
              />
            </svg>
          </Box>
        </Stack>
        <TextField
          value={val}
          onChange={(e) => {
            e.target.value?.trim().length && setVal(e.target.value);
          }}
          fullWidth
          multiline
          minRows={3}
        />
        <Button
          variant='contained'
          size='large'
          onClick={() => {
            val?.trim().length &&
              onSubmit({
                text: val.trim(),
                index: item?.index ?? null,
              });
          }}
        >
          Add
        </Button>
      </Stack>
    </Dialog>
  );
};

const setRecruiter = async (
  data: Omit<DatabaseTableUpdate['recruiter'], 'id'> & { id: string },
) => {
  return supabase
    .from('recruiter')
    .update(data)
    .eq('id', data.id)
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
