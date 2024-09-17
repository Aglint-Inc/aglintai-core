import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIDatePicker } from '@/components/Common/UIDatePicker';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
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
    <UIDialog
      open={true}
      onClose={onClose}
      title={title}
      slotButtons={
        <>
          <UIButton variant='secondary' onClick={onClose}>
            Close
          </UIButton>
          <div>
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
          </div>
        </>
      }
    >
      <RequestReschedule
        isCancelWarningVisible={type === 'cancel'}
        isRangeVisible={type === 'reschedule'}
        slotDateRangeInput={
          <div className='flex gap-2'>
            <UIDatePicker
              value={new Date(formData.dateRange.start)}
              onAccept={(value) => {
                if (dayjsLocal(value) < dayjsLocal(formData.dateRange.end)) {
                  setFormData((pre) => {
                    pre.dateRange.start = dayjsLocal(value).toISOString();
                    return { ...pre };
                  });
                } else {
                  setFormData((pre) => {
                    pre.dateRange.start = dayjsLocal(value).toISOString();
                    pre.dateRange.end = null;
                    return { ...pre };
                  });
                }
              }}
              closeOnSelect={true}
            />
            <UIDatePicker
              value={new Date(formData.dateRange.end)}
              onAccept={(value) => {
                setFormData((pre) => {
                  pre.dateRange.end = dayjsLocal(value).toISOString();
                  return { ...pre };
                });
              }}
              closeOnSelect={true}
            />
          </div>
        }
        slotRadioText={options.map((item, i) => (
          <div key={i} className='flex items-center space-x-2'>
            <RadioGroup>
              <RadioGroupItem
                checked={item === formData.reason}
                value={formData.reason}
                onClick={() => {
                  setFormData((pre) => ({ ...pre, reason: item }));
                }}
                id={`radio-${item + 1}`}
              />
            </RadioGroup>
            <Label htmlFor={item} className='text-sm'>
              {capitalizeFirstLetter(item)}
            </Label>
          </div>
        ))}
        slotInputAdditionalNotes={
          <UITextArea
            className='resize-none'
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
        onClickTryReschedulingNow={onClickTryRescheduling}
      />
    </UIDialog>
  );
};

export default CancelRescheduleDialog;

interface RequestRescheduleProps {
  isRangeVisible: boolean;
  isCancelWarningVisible: boolean;
  slotDateRangeInput: React.ReactNode;
  slotRadioText: React.ReactNode;
  slotInputAdditionalNotes: React.ReactNode;
  onClickTryReschedulingNow: () => void;
}

export function RequestReschedule({
  isRangeVisible,
  isCancelWarningVisible,
  slotDateRangeInput,
  slotRadioText,
  slotInputAdditionalNotes,
  onClickTryReschedulingNow,
}: RequestRescheduleProps) {
  return (
    <div className='space-y-4'>
      {isRangeVisible && (
        <div className='space-y-2'>
          <p className='text-sm text-neutral-600'>
            Please select new dates for your interview and provide a reason for
            the reschedule.
          </p>
          {slotDateRangeInput}
        </div>
      )}

      {isCancelWarningVisible && (
        <div className='flex items-start space-x-2 rounded-lg bg-red-50 p-3'>
          <TriangleAlert className='h-6 w-6' />
          <div className='flex flex-col space-y-1'>
            <p className='text-sm'>
              If you wish to keep this job opportunity open, consider opting for
              rescheduling rather than canceling.
            </p>
            <div>
              <UIButton
                variant='link'
                className='text-accent-600 h-auto p-0'
                onClick={onClickTryReschedulingNow}
              >
                Reschedule
              </UIButton>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <p className='text-sm text-neutral-600'>
          Please provide a reason to cancel.
        </p>
        {slotRadioText}
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-neutral-600'>Additional Notes</p>
        {slotInputAdditionalNotes}
      </div>
    </div>
  );
}
