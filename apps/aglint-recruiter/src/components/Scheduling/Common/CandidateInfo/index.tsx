
import { Application } from '@/context/ApplicationContext';
import { Body } from '@/job/components/CandidateDrawer/Body';
import { Details } from '@/job/components/CandidateDrawer/Details';
import { Meta } from '@/job/components/CandidateDrawer/Meta';
import { Info, TopBar } from '@/job/components/CandidateDrawer/TopBar';

function CandidateInfo({ application_id, job_id }) {
  return (
    <div className='flex flex-col space-y-4 p-4'>
      <Application application_id={application_id} job_id={job_id}>
        <Body
          topBar={
            <TopBar>
              <Info />
            </TopBar>
          }
          meta={<Meta />}
          details={<Details />}
        />
      </Application>
    </div>
  );
}

export default CandidateInfo;
