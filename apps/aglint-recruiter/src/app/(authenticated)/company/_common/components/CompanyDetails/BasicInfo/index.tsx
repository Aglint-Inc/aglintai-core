import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import EditBasicInfoDialog from './EditBasicInfoDialog';
import { BasicInfoUI } from './ui/BasicInfoUI';

export const BasicInfo = () => {
  const [editDrawer, setEditDrawer] = useState(false);
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiter } = useAuthDetails();
  const isFormDisabled = !checkPermissions(['manage_company']);

  return (
    <>
      <EditBasicInfoDialog
        editDialog={editDrawer}
        setEditDialog={setEditDrawer}
      />

      <UISectionCard
        title='Basic company Details'
        description='Edit company name, Add and edit social links and more.'
        action={
          !isFormDisabled && (
            <UIButton
              variant='outline'
              size='sm'
              onClick={() => setEditDrawer(true)}
              icon={<PencilIcon className='mr-2 h-3 w-3' />}
            />
          )
        }
      >
        <BasicInfoUI recruiter={recruiter} />
      </UISectionCard>
    </>
  );
};
