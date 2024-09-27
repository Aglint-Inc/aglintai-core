import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useTenantOfficeLocations } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';
import timeZone from '@/utils/timeZone';

import AddAndEditLocationDialog from './AddAndEditLocationDialog';
import DeleteLocationDialog from './DeleteLocationDialog';
import LocationCard from './ui/LocationCard';

export const Location = () => {
  const { data: locations } = useTenantOfficeLocations();
  const [AddEditDialog, setAddEditDialog] = useState({
    open: false,
    edit: -1,
  });
  const [DeleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
  });

  return (
    <>
      <AddAndEditLocationDialog
        open={AddEditDialog.open}
        edit={AddEditDialog.edit}
        handleClose={() => {
          setAddEditDialog({ open: false, edit: -1 });
        }}
      />
      <DeleteLocationDialog dialog={DeleteDialog} setDialog={setDeleteDialog} />
      <UISectionCard
        title=' Office Locations'
        description='Include office locations to organize data, schedule effectively,
      and identify correct time zones'
        action={
          <UIButton
            variant='outline'
            size='sm'
            onClick={() => {
              setAddEditDialog({ open: true, edit: -1 });
            }}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add
          </UIButton>
        }
      >
        <div className='grid grid-cols-1 gap-4'>
          {locations.map((loc) => {
            const selectedTimeZone = timeZone.find(
              (item) => item.tzCode === loc.timezone,
            );
            const location = [loc.city, loc.region, loc.country]
              .filter(Boolean)
              .join(', ');
            return (
              <LocationCard
                key={loc.id}
                id={loc.id}
                location={location}
                address={loc.line1}
                timeZone={selectedTimeZone?.label}
                isHeadquarter={loc.is_headquarter}
                onEdit={() => {
                  setAddEditDialog({ open: true, edit: loc.id });
                }}
                onDelete={() => {
                  setDeleteDialog({ open: true, id: loc.id });
                }}
              />
            );
          })}
        </div>
      </UISectionCard>
    </>
  );
};
