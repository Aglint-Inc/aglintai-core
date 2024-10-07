import { Pen } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';
import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import EditBasicInfoDialog from './EditBasicInfoDialog';
import { BasicInfoUI } from './ui/BasicInfoUI';

export const BasicInfo = () => {
  const [editDrawer, setEditDrawer] = useState(false);
  const { recruiter } = useTenant();
  const { checkPermissions } = useRolesAndPermissions();
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
              leftIcon={<Pen className='mr-2 h-3 w-3' />}
            >
              Edit
            </UIButton>
          )
        }
      >
        <BasicInfoUI recruiter={recruiter} />
      </UISectionCard>
    </>
  );
};
