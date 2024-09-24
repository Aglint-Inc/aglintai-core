import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Building2, Globe, PencilIcon, Plus, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import timeZone from '@/utils/timeZone';

import LocationCard from './Componets/LocationCard';
import Departments from './Departments';
import EditBasicInfoDialog from './EditBasicInfoDialog';
import AddAndEditLocation from './Locations/AddAndEditLocation';
import DeleteLocation from './Locations/DeleteLocation';
import type { DialogState } from './types';

export const initialDialog = (): DialogState => {
  return {
    deletelocation: { open: false, edit: -1 },
    location: { open: false, edit: -1 },
    roles: false,
    departments: false,
    stacks: false,
  };
};

const CompanyInfoComp = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiter } = useAuthDetails();
  const { data: locations } = useAllOfficeLocations();
  const [dialog, setDialog] = useState(initialDialog());
  const [editDrawer, setEditDrawer] = useState(false);

  const handleClose = () => {
    setDialog(initialDialog());
  };

  const isFormDisabled = !checkPermissions(['manage_company']);

  return (
    <div>
      <div className='flex flex-col gap-6'>
        <div>
          <h2 className='mb-1 text-xl font-semibold'>Company Information</h2>
          <p className='text-gray-600'>
            Update the settings here changes will be saved automatically.
          </p>
        </div>
        <Card>
          <CardHeader className='relative'>
            <CardTitle className='text-lg font-semibold'>
              Basic company Details
            </CardTitle>
            <CardDescription className='text-sm text-gray-500'>
              Edit company name, Add and edit social links and more.
            </CardDescription>
            {!isFormDisabled && (
              <Button
                variant='outline'
                size='sm'
                className='absolute right-4 top-4'
                onClick={() => setEditDrawer(true)}
              >
                <PencilIcon className='mr-2 h-3 w-3' />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='mb-2 flex items-center space-x-4'>
                <div className='flex h-[50px] w-[50px] items-center justify-center rounded-md border border-gray-200'>
                  {recruiter.logo && (
                    <Image
                      src={recruiter.logo}
                      alt={recruiter.name}
                      width={50}
                      height={50}
                      className='rounded-md'
                    />
                  )}
                </div>
                <div>
                  {recruiter.name}
                  <div className='flex flex-row gap-4'>
                    <div className='flex items-center space-x-2'>
                      <Globe className='h-4 w-4 text-gray-500' />
                      {recruiter.company_website && (
                        <Link
                          href={recruiter.company_website}
                          target='_blank'
                          className='text-gray-600 hover:underline'
                        >
                          {new URL(recruiter.company_website)?.hostname}
                        </Link>
                      )}
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Building2 className='h-4 w-4 text-gray-500' />
                      <span>{recruiter.industry}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Users2 className='h-4 w-4 text-gray-500' />
                      <span>{`${recruiter.employee_size} People`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex flex-wrap gap-2'>
                {Object.entries(recruiter.socials)
                  .filter(([key]) => key !== 'custom')
                  .map(([key, val]) => (
                    <Link
                      key={key}
                      href={val as string}
                      target='_blank'
                      className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 transition-colors hover:bg-gray-200'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={`/images/logo/${key}.svg`}
                        height={14}
                        width={14}
                        alt=''
                        className='mr-2'
                        style={{ filter: 'grayscale(100%)' }}
                      />
                      <span className='text-sm'>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='relative'>
            <CardTitle className='text-lg font-semibold'>
              Office Locations
            </CardTitle>
            <CardDescription className='text-sm text-gray-500'>
              Include office locations to organize data, schedule effectively,
              and identify correct time zones
            </CardDescription>
            <Button
              variant='outline'
              size='sm'
              className='absolute right-4 top-4 mt-4 rounded-md'
              onClick={() => {
                setDialog({ ...dialog, location: { open: true, edit: -1 } });
              }}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-4'>
              {locations.map((loc) => {
                const selectedTimeZone = timeZone.find(
                  (item) => item.tzCode === loc.timezone,
                );
                return (
                  <LocationCard
                    key={loc.id}
                    id={loc.id}
                    city={loc.city}
                    region={loc.region}
                    country={loc.country}
                    address={loc.line1}
                    timeZone={selectedTimeZone?.label}
                    isHeadquarter={loc.is_headquarter}
                    onEdit={() => {
                      setDialog({
                        ...dialog,
                        location: { open: true, edit: loc.id },
                      });
                    }}
                    onDelete={() => {
                      setDialog({
                        ...dialog,
                        deletelocation: { open: true, edit: loc.id },
                      });
                    }}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Departments</CardTitle>
            <CardDescription>
              Catalog your departments to sort and filter data efficiently,
              aiding in job posting and scheduling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Departments />
          </CardContent>
        </Card>
      </div>
      <AddAndEditLocation
        handleClose={handleClose}
        open={dialog.location.open}
        edit={dialog.location.edit}
      />
      <DeleteLocation dialog={dialog} setDialog={setDialog} />

      <EditBasicInfoDialog
        editDialog={editDrawer}
        setEditDialog={setEditDrawer}
      />
    </div>
  );
};

export default CompanyInfoComp;
