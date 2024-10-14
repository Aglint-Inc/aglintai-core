import { Pen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';
import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';

import EditBasicInfoDialog from './EditBasicInfoDialog';
import { BasicInfoUI } from './ui/BasicInfoUI';

export const BasicInfo = () => {
  const [editDrawer, setEditDrawer] = useState(false);
  const { recruiter } = useTenant();
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);

  const searchParams = useSearchParams();
  const { replace } = useRouterPro();
  useEffect(() => {
    const isEditOpen = searchParams?.get('edit') == 'true' ? true : false;
    if (isEditOpen) {
      setEditDrawer(true);
    }
  }, [searchParams]);

  const handleRemoveEditParam = () => {
    const params = new URLSearchParams(searchParams!);
    params.delete('edit');
    replace(`?${params.toString()}`);
  };

  return (
    <>
      <EditBasicInfoDialog
        editDialog={editDrawer}
        setEditDialog={setEditDrawer}
        handleRemoveEditParam={handleRemoveEditParam}
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
