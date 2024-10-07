import UIDialog from '@/components/Common/UIDialog';
import toast from '@/utils/toast';

import { FeedbackForm } from './feedbackFrom';

export function EditFeedbackDialog({
  setSelectedInterviewer,
  selectedInterviewer,
  handelSubmit,
}: {
  selectedInterviewer: any;
  setSelectedInterviewer: any;
  handelSubmit: any;
}) {
  return (
    <>
      {selectedInterviewer?.interviewer && (
        <UIDialog
          title='My Feedback'
          size='xl'
          open={selectedInterviewer.interviewer !== null}
          onClose={() => setSelectedInterviewer(null)}
          slotButtons={<></>}
        >
          <FeedbackForm
            interviewerData={selectedInterviewer.interviewer}
            onSubmit={(feedback) =>
              handelSubmit(feedback).then(() => {
                toast.success('Feedback saved successfully.');
                setSelectedInterviewer({
                  index: null,
                  interviewer: null,
                });
              })
            }
            onCancel={() => {
              setSelectedInterviewer({
                index: null,
                interviewer: null,
              });
            }}
            onClose={() => {
              setSelectedInterviewer({
                index: null,
                interviewer: null,
              });
            }}
          />
        </UIDialog>
      )}
    </>
  );
}
