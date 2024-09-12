import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';

import {
  IndividualIcon,
  PanelIcon,
} from '@/job/interview-plan/components/sessionForms';

import { setEditSession, useEditSessionDrawerStore } from '../store';

function SelectSessionType() {
  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  return (
    <>
      <Tabs
        value={
          editSession.interview_session.session_type === 'individual'
            ? 'individual'
            : 'panel'
        }
      >
        <TabsList>
          <TabsTrigger
            value='individual'
            onClick={() => {
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  session_type: 'individual',
                },
              });
            }}
          >
            <div className='flex flex-row gap-1 justify-center'>
              <IndividualIcon /> Individual
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='panel'
            onClick={() => {
              setEditSession({
                interview_session: {
                  ...editSession.interview_session,
                  session_type: 'panel',
                },
              });
            }}
          >
            <div className='flex flex-row gap-1 justify-center'>
              <PanelIcon /> Panel
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default SelectSessionType;
