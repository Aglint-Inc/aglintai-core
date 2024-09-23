import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import EditBasicInfoDialog from './Dialog';
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

      <SectionCard
        title='Basic company Details'
        description='Edit company name, Add and edit social links and more.'
        topAction={
          !isFormDisabled && (
            <UIButton
              variant='outline'
              size='sm'
              onClick={() => setEditDrawer(true)}
            >
              <PencilIcon className='mr-2 h-3 w-3' />
              Edit
            </UIButton>
          )
        }
      >
        <BasicInfoUI recruiter={recruiter} />
      </SectionCard>
    </>
  );
};
