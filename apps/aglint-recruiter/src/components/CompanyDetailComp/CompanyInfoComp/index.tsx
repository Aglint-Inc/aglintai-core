import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { CompanyInfo } from '@devlink/CompanyInfo';
import { CompanyInfoDetails } from '@devlink/CompanyInfoDetails';
import { RolesPill } from '@devlink/RolesPill';
import { TextWithIcon } from '@devlink2/TextWithIcon';
import { DeletePopup } from '@devlink3/DeletePopup';
import { PencilIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import {
  manageDepartments,
  manageOfficeLocation,
} from '@/context/AuthContext/utils';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import MuiPopup from '../../Common/MuiPopup';
import { debouncedSave } from '../utils';
import AddLocationDialog from './AddLocationDialog';
import EditBasicInfoSheet from './EditBasicInfo';
import AddDepartmentsDialog from './ManageDepartmentsDialog/addDepartmentsDialog';
import DeleteDepartmentsDialog from './ManageDepartmentsDialog/deleteDepartmentDialog';

const CompanyInfoComp = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiter, setRecruiter } = useAuthDetails();
  const { data: locations, refetch: refetchLocations } =
    useAllOfficeLocations();
  const { data: departments, refetch: refetchDepartments } =
    useAllDepartments();
  const [dialog, setDialog] = useState(initialDialog());

  const [deleteDialog, setDeleteDialog] = useState<{
    type: 'departments';
    open: boolean;
    id: string | number | null;
  }>({
    type: 'departments',
    open: false,
    id: null,
  });
  const [editDrawer, setEditDrawer] = useState(false);
  const initialCompanyName = useRef(recruiter?.name);

  const handleChange = async (
    recruit: typeof recruiter,
    isEmptyName?: boolean,
  ) => {
    debouncedSave(
      {
        ...recruit,
        ...(isEmptyName ? { name: String(initialCompanyName.current) } : {}),
      },
      recruiter.id,
    );
    setRecruiter(recruit);
  };

  const handleClose = () => {
    setDialog(initialDialog());
  };

  const handleDeleteLocation = async (id: number) => {
    await manageOfficeLocation({ type: 'delete', data: id });
    refetchLocations();
  };

  const isFormDisabled = !checkPermissions(['manage_company']);

  return (
    <div className='w-full'>
      <AddDepartmentsDialog
        handleClose={handleClose}
        open={dialog.departments}
        handleChange={handleChange}
      />
      <AddLocationDialog
        key={Math.random()}
        handleClose={handleClose}
        open={dialog.location.open}
        edit={dialog.location.edit}
      />
      {deleteDialog.open && deleteDialog.type === 'departments' && (
        <DeleteDepartmentsDialog
          handleDelete={() =>
            deleteDialog.id &&
            manageDepartments({
              type: 'delete',
              data: [deleteDialog.id as number],
            }).then(() => {
              setDeleteDialog({ ...deleteDialog, open: false });
              refetchDepartments();
            })
          }
          handleClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
          open={deleteDialog.open}
          id={deleteDialog.id as number}
        />
      )}
      <>
        <EditBasicInfoSheet
          editDrawer={editDrawer}
          setEditDrawer={setEditDrawer}
        />
        <MuiPopup
          props={{
            open: dialog.deletelocation.open,
            onClose: () => {
              setDialog({
                ...dialog,
                deletelocation: { open: false, edit: -1 },
              });
            },
          }}
        >
          <DeletePopup
            textDescription={
              'Are you sure you want to delete this office location? This action is permanent.'
            }
            textTitle={'Delete Office Location'}
            isIcon={false}
            onClickCancel={{
              onClick: () => {
                setDialog({
                  ...dialog,
                  deletelocation: { open: false, edit: -1 },
                });
              },
            }}
            onClickDelete={{
              onClick: () => {
                handleDeleteLocation(dialog.deletelocation.edit);
                setDialog({
                  ...dialog,
                  deletelocation: { open: false, edit: -1 },
                });
              },
            }}
          />
        </MuiPopup>
        <div className='w-full h-[calc(100vh-48px)] bg-white overflow-auto'>
          <CompanyInfo
            isEditable={!isFormDisabled}
            slotCompanyInfoDetails={
              <CompanyInfoDetails
                slotDetails={
                  <>
                    <TextWithIcon
                      iconName='warehouse'
                      iconSize={4}
                      fontWeight={'regular'}
                      textContent={recruiter.industry}
                    />

                    <TextWithIcon
                      iconName='group'
                      iconSize={4}
                      textContent={`${recruiter.employee_size} People`}
                      fontWeight={'regular'}
                    />
                  </>
                }
                slotEditButton={
                  !isFormDisabled ? (
                    <ButtonSoft
                      textButton='Edit'
                      size={2}
                      color={'neutral'}
                      onClickButton={{
                        onClick: () => {
                          setEditDrawer(true);
                        },
                      }}
                    />
                  ) : (
                    <></>
                  )
                }
                slotImage={
                  <div className='flex justify-center items-center h-[50px] w-[50px]'>
                    <Image
                      src={recruiter.logo}
                      alt={recruiter.name}
                      width={50}
                      height={50}
                      className='rounded-md'
                    />
                  </div>
                }
                textCompanyName={recruiter.name}
                textCompanySites={recruiter.company_website}
                slotSocialLink={
                  <>
                    {Object.entries(recruiter.socials)
                      .filter((key) => key[0] !== 'custom')
                      .map(([key, val]) => {
                        return (
                          <TextWithIcon
                            key={key}
                            slotIcon={
                              <div className='flex justify-center items-center'>
                                <Image
                                  src={`/images/logo/${key}.svg`}
                                  height={14}
                                  width={14}
                                  alt=''
                                  style={{ filter: 'grayscale(100%)' }}
                                />
                              </div>
                            }
                            fontWeight={'regular'}
                            textContent={
                              <Link href={val as string} target='_blank'>
                                {
                                  // @ts-ignore
                                  val.replace('https://www.', '')
                                }
                              </Link>
                            }
                          />
                        );
                      })}
                  </>
                }
              />
            }
            slotLocation={
              <>
                {locations.map((loc) => {
                  const location = [loc.city, loc.region, loc.country]
                    .filter(Boolean)
                    .join(', ');
                  const [address] = [loc.line1];
                  const timeZone = [loc.timezone];
                  const isHeadQuaterVisible = Boolean(loc?.is_headquarter);

                  return (
                    <div key={loc.id} className='p-[var(--space-1)]'>

                      {/* Card change to shadcn */}
                      
                      <Card className="p-4 h-full">
                        <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">{location}</h4>
                        {isHeadQuaterVisible && (
                              <Badge variant="outline">Headquarters</Badge>
                            )}
                        </div>
                        <div>
                          <p>{address || '-'}</p>
                          <p>{timeZone}</p>
                        </div>
                       
                        {!isFormDisabled && (
                          <div className="flex justify-end space-x-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setDialog({
                                  ...dialog,
                                  location: { open: true, edit: loc.id },
                                });
                              }}
                            >
                              <PencilIcon className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-400 hover:bg-red-500"
                              onClick={() => {
                                setDialog({
                                  ...dialog,
                                  deletelocation: {
                                    open: true,
                                    edit: loc.id,
                                  },
                                });
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-white" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    </div>
                  );
                })}
              </>
            }
            slotRolesPills={<></>}
            slotDepartmentPills={departments?.map((dep) => {
              return (
                <RolesPill
                  key={dep.id}
                  textRoles={dep.name}
                  onClickRemoveRoles={{
                    onClick: () => {
                      setDeleteDialog({
                        ...deleteDialog,
                        open: true,
                        id: dep.id,
                      });
                    },
                  }}
                />
              );
            })}
            slotTechStackPills={<></>}
            onClickAddLocation={{
              onClick: () => {
                setDialog({ ...dialog, location: { open: true, edit: -1 } });
              },
            }}
            onClickAddAvailableRoles={{
              onClick: () => {
                setDialog({ ...dialog, roles: true });
              },
            }}
            onClickAddDepartments={{
              onClick: () => {
                setDialog((prev) => ({
                  ...prev,
                  departments: true,
                }));
              },
            }}
            onClickAddTechStacks={{
              onClick: () => {
                setDialog({ ...dialog, stacks: true });
              },
            }}
            isAvailableRolesVisible={true}
            isSpecialistVisible={true}
          />
        </div>
      </>
    </div>
  );
};

export default CompanyInfoComp;

const initialDialog = () => {
  return {
    deletelocation: { open: false, edit: -1 },
    location: { open: false, edit: -1 },
    roles: false,
    departments: false,
    stacks: false,
  };
};
