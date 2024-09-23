import { BasicInfo } from './BasicInfo';
import Departments from './Departments';
import { Location } from './Locations';

const CompanyInfoComp = () => {
  return (
    <div>
      <div className='flex flex-col'>
        <div className='mb-6'>
          <h2 className='mb-1 text-xl font-semibold'>Company Information</h2>
          <p className='text-gray-600'>
            Update the settings here changes will be saved automatically.
          </p>
        </div>
        <BasicInfo />
        <Location />
        <Departments />
      </div>
    </div>
  );
};

export default CompanyInfoComp;
