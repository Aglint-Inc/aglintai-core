import { Plus } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';

export const Header = ({ searchText, setSearchText }) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <div>
        <UITextField
          placeholder='Search by name'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-full'
        />
      </div>
      <div className='flex items-center gap-4'>
        filters
        <UIButton size='sm' leftIcon={<Plus className='h-4 w-4 mr-2' />}>
          New Interview Type
        </UIButton>
      </div>
    </div>
  );
};
