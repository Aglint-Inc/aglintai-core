import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { RequestReschedule } from '@devlink2/RequestReschedule';
import { Dialog, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

const CancelRescheduleDialog = ({
  title,
  type,
  options,
  onClose,
  onClickTryRescheduling,
  onSubmit,
}: {
  title: string;
  type: 'reschedule' | 'cancel';
  options: string[];
  onClose: () => void;
  onClickTryRescheduling: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (x: {
    reason: string;
    other_details: DatabaseTable['interview_session_cancel']['other_details'];
    type: DatabaseTable['interview_session_cancel']['type'];
  }) => Promise<boolean>;
}) => {
  const [formData, setFormData] = useState<{
    type;
    dateRange: { start: string; end: string };
    reason: string;
    additionalNote: string;
  }>({
    type,
    reason: options[0],
    dateRange: {
      start: dayjsLocal().add(1, 'day').toISOString(),
      end: dayjsLocal().add(8, 'day').toISOString(),
    },
    additionalNote: null,
  });
  const [selectedDateRangeError, setSelectedDateRangeError] = useState(false);
  const handleSubmit = () => {
    if (type === 'reschedule') {
      const error = !formData.dateRange.start || !formData.dateRange.end;
      if (selectedDateRangeError || error) return;
      setSelectedDateRangeError(error);
    }
    onSubmit({
      reason: formData.reason,
      type: type === 'cancel' ? 'declined' : type,
      other_details: {
        dateRange: type === 'cancel' ? null : formData.dateRange,
        note: formData.additionalNote,
      },
    }).then(() => {
      toast.success(
        `${capitalizeFirstLetter(type)} request submitted successfully`,
      );
      onClose();
    });
  };

  useEffect(
    () =>
      setSelectedDateRangeError(
        !formData.dateRange.start || !formData.dateRange.end,
      ),
    [formData.dateRange.start, formData.dateRange.end],
  );

  useEffect(
    () => setFormData((pre) => ({ ...pre, reason: options[0] })),
    [options],
  );

  return (
    <Dialog open={true}>
      <RequestReschedule
        textHeader={title}
        isCancelWarningVisible={type === 'cancel'}
        isRangeVisible={type === 'reschedule'}
        slotCancelButton={
          <UIButton
            variant='secondary'
            onClick={() => onClose()}
          >
            Close
          </UIButton>
        }
        slotDateRangeInput={
          <Stack spacing={2} direction={'row'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjsLocal(formData.dateRange.start)}
                onChange={(newValue) => {
                  if (
                    dayjsLocal(newValue) < dayjsLocal(formData.dateRange.end)
                  ) {
                    setFormData((pre) => {
                      pre.dateRange.start = dayjsLocal(newValue).toISOString();
                      return pre;
                    });
                  } else {
                    setFormData((pre) => {
                      pre.dateRange.start = dayjsLocal(newValue).toISOString();
                      pre.dateRange.end = null;
                      return pre;
                    });
                  }
                }}
                minDate={dayjsLocal()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    margin: 'none',
                    placeholder: 'Start Date',
                  },
                }}
                slots={{
                  openPickerIcon: () => <Trash size={20} />,
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjsLocal(formData.dateRange.end)}
                minDate={dayjsLocal(formData.dateRange.start)}
                maxDate={dayjsLocal(formData.dateRange.start).add(1, 'month')}
                onChange={(newValue) => {
                  setFormData((pre) => {
                    pre.dateRange.end = dayjsLocal(newValue).toISOString();
                    return pre;
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    margin: 'none',
                    placeholder: 'End Date',
                  },
                }}
                slots={{
                  openPickerIcon: () => <Trash size={20} />,
                }}
              />
            </LocalizationProvider>
          </Stack>
        }
        slotRadioText={
          <RadioGroup
            name='radio-buttons-group'
            value={formData.reason}
            className='space-y-1'
          >
            {options.map((item) => (
              <div key={item} className='flex items-center space-x-2'>
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className='text-sm'>
                  {capitalizeFirstLetter(item)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        }
        slotPrimaryButton={
          <Stack>
            {type === 'reschedule' && (
              <UIButton variant='default' onClick={() => handleSubmit()}>
                Request Reschedule
              </UIButton>
            )}
            {type === 'cancel' && (
              <UIButton variant='destructive' onClick={() => handleSubmit()}>
                Cancel Interview
              </UIButton>
            )}
          </Stack>
        }
        slotInputAdditionalNotes={
          <TextField
            multiline
            placeholder='Add additional notes.'
            rows={6}
            value={formData.additionalNote}
            fullWidth
            onChange={(e) =>
              setFormData((pre) => ({
                ...pre,
                additionalNote: e.target.value,
              }))
            }
          />
        }
        onClickClose={{
          onClick: onClose,
        }}
        onClickTryReschedulingNow={{
          onClick: onClickTryRescheduling,
        }}
      />
    </Dialog>
  );
};

export default CancelRescheduleDialog;
