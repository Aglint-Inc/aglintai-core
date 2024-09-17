import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';

import {
  IndividualIcon,
  PanelIcon,
} from '@/job/interview-plan/components/sessionForms';

import { setEditSession, useEditSessionDrawerStore } from '../../../stores/editSessionDrawer';

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
            <div className='flex flex-row justify-center gap-1'>
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
            <div className='flex flex-row justify-center gap-1'>
              <PanelIcon /> Panel
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default SelectSessionType;
