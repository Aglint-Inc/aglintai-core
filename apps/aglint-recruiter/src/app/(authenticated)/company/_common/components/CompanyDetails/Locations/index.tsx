import { MapPin, Plus } from 'lucide-react';
import { useState } from 'react';

import { useTenantOfficeLocations } from '@/company/hooks';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
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
          locations?.length > 0 && (
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
          )
        }
      >
        <div className='grid grid-cols-1 gap-4'>
          {locations?.length > 0 ? (
            locations.map((loc) => {
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
            })
          ) : (
            <GlobalEmpty
              icon={
                <MapPin
                  strokeWidth={2}
                  className='h-6 w-6 text-muted-foreground'
                />
              }
              header='No Locations yet'
              description='Add the company locations'
              primaryAction={
                <UIButton
                  onClick={() => {
                    setAddEditDialog({ open: true, edit: -1 });
                  }}
                  className='mb-2 w-full'
                  leftIcon={<Plus />}
                >
                  Add Locations
                </UIButton>
              }
            />
          )}
        </div>
      </UISectionCard>
    </>
  );
};
