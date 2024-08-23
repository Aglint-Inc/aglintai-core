import { DatabaseTableInsert } from "@aglint/shared-types";
import { dayjsLocal } from "@aglint/shared-utils/src/scheduling/dayjsLocal";
import { Dialog, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";

import { ButtonSoft } from "@/devlink/ButtonSoft";
import { ButtonSolid } from "@/devlink/ButtonSolid";
import { RequestReschedule } from "@/devlink2/RequestReschedule";
import { capitalizeFirstLetter } from "@/src/utils/text/textUtils";
import toast from "@/src/utils/toast";

import { DateIcon } from "../../CompanyDetailComp/SettingsSchedule/Components/DateSelector";

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
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    x: Omit<DatabaseTableInsert['interview_session_cancel'], 'session_id'>,
  ) => Promise<boolean>;
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
          <ButtonSoft
            textButton='Close'
            size={2}
            onClickButton={{ onClick: onClose }}
            color={'neutral'}
          />
        }
        slotDateRangeInput={
          <Stack spacing={2} direction={'row'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjsLocal(formData.dateRange.start)}
                onChange={(newValue) => {
                  if (dayjsLocal(newValue) < dayjsLocal(formData.dateRange.end)) {
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
                  openPickerIcon: DateIcon,
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
                  openPickerIcon: DateIcon,
                }}
              />
            </LocalizationProvider>
          </Stack>
        }
        slotRadioText={
          <FormControl>
            <RadioGroup
              name='radio-buttons-group'
              value={formData.reason}
              onChange={(e) => {
                setFormData((pre) => ({
                  ...pre,
                  reason: e.currentTarget.value,
                }));
              }}
              sx={{ gap: '4px' }}
            >
              {options.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={capitalizeFirstLetter(item)}
                  sx={{
                    ml: 0,
                    '& .MuiRadio-root': {
                      p: 0.5,
                    },
                    '& .MuiTypography-root': { fontSize: '14px' },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        }
        slotPrimaryButton={
          <Stack>
            {type === 'reschedule' && (
              <ButtonSolid
                textButton='Request Reschedule'
                size={2}
                onClickButton={{ onClick: handleSubmit }}
              />
            )}
            {type === 'cancel' && (
              <ButtonSolid
                textButton='Cancel Interview'
                size={2}
                color={'error'}
                onClickButton={{ onClick: handleSubmit }}
              />
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