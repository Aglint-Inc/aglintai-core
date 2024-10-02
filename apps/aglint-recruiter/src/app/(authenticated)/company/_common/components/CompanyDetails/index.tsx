import {
  Page,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';

import { BasicInfo } from './BasicInfo';
import Departments from './Departments';
import { Location } from './Locations';

const CompanyInfoComp = () => {
  return (
    <>
      <Page>
        <PageHeader>
          <PageHeaderText>
            <PageTitle>Company Information</PageTitle>
            <PageDescription>
              {' '}
              Update the settings here changes will be saved automatically.
            </PageDescription>
          </PageHeaderText>
        </PageHeader>
        <div className='flex flex-col gap-4'>
          <BasicInfo />
          <Location />
          <Departments />
        </div>
      </Page>
    </>
  );
};

export default CompanyInfoComp;
