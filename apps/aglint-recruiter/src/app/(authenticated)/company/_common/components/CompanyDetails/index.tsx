import {
  Page,
  // PageDescription,
  // PageHeader,
  // PageHeaderText,
  // PageTitle,
} from '@components/layouts/page-header';

import { BasicInfo } from './BasicInfo';
import Departments from './Departments';
import { Location } from './Locations';
import ThemeManager from './ThemeManager/ThemeManager';

const CompanyInfoComp = () => {
  return (
    <>
      <Page>
        {/* <PageHeader>
          <PageHeaderText>
            <PageTitle>Company Information</PageTitle>
            <PageDescription>
              {' '}
              Update the settings here changes will be saved automatically.
            </PageDescription>
          </PageHeaderText>
        </PageHeader> */}
        <div className='flex flex-col space-y-12'>
          <BasicInfo />
          <Location />
          <Departments />
          <ThemeManager />
        </div>
      </Page>
    </>
  );
};

export default CompanyInfoComp;
