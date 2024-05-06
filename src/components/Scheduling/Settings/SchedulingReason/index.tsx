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

import { ReasonList, ScheduleReason, ScheduleReasonSection } from '@/devlink3';
import Icon from '@/src/components/Common/Icons/Icon';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { DatabaseTable, DatabaseTableUpdate } from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const SchedulingRegions = () => {
  const { recruiter, setRecruiter: updateRecruiter } = useAuthDetails();
  const reason = {
    reschedule: [],
    cancel: [],
    decline: [],
    ...(recruiter.scheduling_reason ?? {}),
  } as typeof recruiter.scheduling_reason;
  const handelUpdateReasons = async (
    updatedReason: typeof recruiter.scheduling_reason,
  ) => {
    return setRecruiter({
      id: recruiter.id,
      scheduling_reason: { ...reason, ...updatedReason },
    }).then((data) => {
      updateRecruiter({ ...data, socials: recruiter.socials });
      return true;
    });
  };
  return (
    <ScheduleReason
      slotScheduleReasonSection={
        <>
          <ScheduleReasonSectionCard
            scheduleReason={'reschedule'}
            updateReasons={handelUpdateReasons}
            description='Add reasons for Rescheduling, and these options will be provided at the time of Rescheduling.'
            scheduleReasonItems={reason.reschedule}
          />
          <ScheduleReasonSectionCard
            scheduleReason={'cancel'}
            updateReasons={handelUpdateReasons}
            description='Add reasons for Cancelling the Scheduling, and these options will be provided at the time of Cancelling the Scheduling.'
            scheduleReasonItems={reason.cancel}
          />
          <ScheduleReasonSectionCard
            scheduleReason={'decline'}
            updateReasons={handelUpdateReasons}
            description='Add reasons for Declining the Scheduling, and these options will be provided at the time of Declining.'
            scheduleReasonItems={reason.decline}
          />
        </>
      }
    />
  );
};
export default SchedulingRegions;

const ScheduleReasonSectionCard = ({
  scheduleReason,
  description,
  updateReasons,
  scheduleReasonItems,
}: {
  scheduleReason: keyof DatabaseTable['recruiter']['scheduling_reason'];
  description: string;
  updateReasons: (
    // eslint-disable-next-line no-unused-vars
    x: Partial<DatabaseTable['recruiter']['scheduling_reason']>,
  ) => Promise<boolean>;
  scheduleReasonItems: string[];
}) => {
  const [edit, setEdit] = useState<{
    state: boolean;
    index: number;
  }>({ state: false, index: null });
  return (
    <ScheduleReasonSection
      textHeading={`${capitalize(scheduleReason)} Reason`}
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
                const temp = {
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
              title={`Add ${scheduleReason}`}
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
          <Typography>{title} </Typography>
          <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
            <Icon variant='CloseThinIcon' />
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
