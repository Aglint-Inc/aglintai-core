import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Building2, Globe, PencilIcon, Plus,Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import LocationCard from './Componets/LocationCard';
import Departments from './Departments';
import EditBasicInfoDialog from './EditBasicInfoDialog';
import AddAndEditLocation from './Locations/AddAndEditLocation';
import DeleteLocation from './Locations/DeleteLocation';

export type DialogState = {
  deletelocation: { open: boolean; edit: number };
  location: { open: boolean; edit: number };
  roles: boolean;
  departments: boolean;
  stacks: boolean;
};

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
    <div className='w-full'>
      <AddAndEditLocation
        key={Math.random()}
        handleClose={handleClose}
        open={dialog.location.open}
        edit={dialog.location.edit}
      />
      <DeleteLocation dialog={dialog} setDialog={setDialog} />

      <EditBasicInfoDialog
        editDialog={editDrawer}
        setEditDialog={setEditDrawer}
      />

      <div className='w-full h-[calc(100vh-48px)] bg-white overflow-auto'>
        <div className='w-3/4'>


        {/* recruiter info section */}

        <Card className="m-4 p-4 relative group">
          <CardHeader className='p-0'>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-[50px] w-[50px] flex items-center justify-center border border-gray-200 rounded-md">
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <CardTitle className='text-lg font-semibold'>{recruiter.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <Link href={recruiter.company_website} target="_blank" className="text-gray-600 hover:underline">
                      {new URL(recruiter.company_website).hostname}
                    </Link>
                  </CardDescription>
                </div>
              </div>
              {!isFormDisabled && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-100 hover:bg-gray-200 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setEditDrawer(true)}
                >
                  <PencilIcon className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className='p-0 mt-3'>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span>{recruiter.industry}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users2 className="h-4 w-4 text-gray-500" />
                <span>{`${recruiter.employee_size} People`}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(recruiter.socials)
                  .filter(([key]) => key !== 'custom')
                  .map(([key, val]) => (
                    <Link
                      key={key}
                      href={val as string}
                      target="_blank"
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={`/images/logo/${key}.svg`}
                        height={14}
                        width={14}
                        alt=""
                        className="mr-2"
                        style={{ filter: 'grayscale(100%)' }}
                      />
                      <span className="text-sm">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* office location section */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-1">Office Locations</CardTitle>
            <CardDescription className="text-sm text-gray-500">Include office locations to organize data, schedule effectively, and identify correct time zones</CardDescription>
          </CardHeader>
          <CardContent >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  id={loc.id}
                  city={loc.city}
                  region={loc.region}
                  country={loc.country}
                  address={loc.line1}
                  timeZone={loc.timezone}
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
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 rounded-md"
              onClick={() => {
                setDialog({ ...dialog, location: { open: true, edit: -1 } });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none mt-4">
          <CardContent>
            <Departments />
          </CardContent>
        </Card>
        </div>
       

       

       
      </div>
    </div>
  );
};

export default CompanyInfoComp;
