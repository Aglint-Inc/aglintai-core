import { Autocomplete, Avatar, Drawer, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { BasicInfo } from '@/devlink/BasicInfo';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CompanyInfo } from '@/devlink/CompanyInfo';
import { CompanyInfoDetails } from '@/devlink/CompanyInfoDetails';
import { CompanyLocation } from '@/devlink/CompanyLocation';
import { RolesPill } from '@/devlink/RolesPill';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import ImageUpload from '../../Common/ImageUpload';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import CompanyJdComp from '../CompanyJdComp';
import TeamManagement from '../TeamManagement';
import { debouncedSave } from '../utils';
import AddLocationDialog from './AddLocationDialog';
import AddDepartmentsDialog from './ManageDepartmentsDialog/addDepartmentsDialog';
import DeleteDepartmentsDialog from './ManageDepartmentsDialog/deleteDepartmentDialog';
import RolesAndPermissions from './RolesAndPermissions';
import SocialComp from './SocialComp';

const CompanyInfoComp = ({ setIsSaving }) => {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const {
    recruiter,
    setRecruiter,
    handleOfficeLocationsUpdate,
    handleDepartmentsUpdate,
  } = useAuthDetails();
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

  const handleDeleteLocation = (id: number) => {
    handleOfficeLocationsUpdate({ type: 'delete', data: id });
  };

  const isFormDisabled = !checkPermissions(['manage_company']);

  return (
    <Stack width={'100%'}>
      {/* <AddSpecialityDialog
        handleClose={handleClose}
        open={dialog.stacks}
        handleChange={handleChange}
      /> */}
      <AddDepartmentsDialog
        handleClose={handleClose}
        open={dialog.departments}
        handleChange={handleChange}
      />
      {/* <AddRolesDialog
        handleClose={handleClose}
        open={dialog.roles}
        handleChange={handleChange}
      /> */}
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
            handleDepartmentsUpdate({
              type: 'delete',
              data: [deleteDialog.id as number],
            }).then(() => setDeleteDialog({ ...deleteDialog, open: false }))
          }
          handleClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
          open={deleteDialog.open}
          id={deleteDialog.id as number}
        />
      )}
      {router.query?.tab === 'company-info' && (
        <>
          <EditBasicInfoSlider
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
                'Are u sure u want to delete this office location? This action cannot be undone.'
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
          <Stack
            width={'100%'}
            height={'calc(100vh - 48px)'}
            bgcolor={'white'}
            overflow={'auto'}
          >
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
                    <Stack
                      justifyContent={'center'}
                      alignItems='center'
                      height={'50px'}
                      width={'50px'}
                    >
                      <Avatar
                        src={recruiter.logo}
                        alt={recruiter.name}
                        variant='rounded'
                      />
                    </Stack>
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
                                <Stack
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                >
                                  <Image
                                    src={`/images/logo/${key}.svg`}
                                    height={14}
                                    width={14}
                                    alt=''
                                    style={{ filter: 'grayscale(100%)' }}
                                  />
                                </Stack>
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
                  {recruiter?.office_locations &&
                    recruiter?.office_locations.map((loc) => {
                      const location = [loc.city, loc.region, loc.country]
                        .filter(Boolean)
                        .join(', ');
                      const [address] = [loc.line1];
                      const timeZone = [loc.timezone];
                      const isHeadQuaterVisible = Boolean(loc?.is_headquarter);

                      return (
                        <>
                          <Stack p={'var(--space-1)'}>
                            <CompanyLocation
                              isHeadQuaterVisible={isHeadQuaterVisible}
                              isEditDeleteVisible={!isFormDisabled}
                              onClickEdit={{
                                onClick: () => {
                                  setDialog({
                                    ...dialog,
                                    location: { open: true, edit: loc.id },
                                  });
                                },
                              }}
                              textFullAddress={address || '-'}
                              textLocationHeader={location}
                              textTimeZone={timeZone}
                              onClickDelete={{
                                onClick: () => {
                                  setDialog({
                                    ...dialog,
                                    deletelocation: {
                                      open: true,
                                      edit: loc.id,
                                    },
                                  });
                                },
                              }}
                            />
                          </Stack>
                        </>
                      );
                    })}
                </>
              }
              slotRolesPills={<></>}
              slotDepartmentPills={recruiter?.departments?.map((dep) => {
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
              slotEmploymentType={<CompanyJdComp setIsSaving={setIsSaving} />}
            />
          </Stack>
        </>
      )}
      {router.query?.tab === 'team' && <TeamManagement />}
      {router.query?.tab === 'roles' && <RolesAndPermissions />}
    </Stack>
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

export const sizes = [
  '1 - 5',
  '5 - 50',
  '50 - 100',
  '100 - 500',
  '1000 - 5000',
  '5000+',
];

const EditBasicInfoSlider = ({ editDrawer, setEditDrawer }) => {
  const [logo, setLogo] = useState<string>();
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isError, setError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);

  const [recruiterLocal, setRecruiterLocal] = useState<typeof recruiter | null>(
    recruiter,
  );

  useEffect(() => {
    setLogo(recruiter?.logo);
  }, [recruiter]);

  const handleChange = async (recruit: typeof recruiter) => {
    setRecruiterLocal(recruit);
  };

  const handleClose = () => {
    setEditDrawer(false);
    //reset a form
    setTimeout(() => {
      setLogo(recruiter?.logo);
      setRecruiterLocal(() => recruiter);
    }, 800);
  };
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('recruiter')
        .update({
          ...recruiterLocal,
          name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
          departments: undefined,
          office_locations: undefined,
        })
        .eq('id', recruiter.id)
        .select()
        .throwOnError();

      if (!error) {
        setRecruiter({
          ...recruiterLocal,
          name: recruiterLocal.name ? recruiterLocal.name : recruiter?.name,
        });
        setEditDrawer(false);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={editDrawer} anchor='right' onClose={handleClose}>
      <SideDrawerLarge
        isHeaderIconVisible={false}
        textDrawertitle={'Edit Basic Info'}
        drawerSize={'small'}
        onClickCancel={{ onClick: handleClose }}
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              color={'neutral'}
              textButton='Close'
              onClickButton={{ onClick: handleClose }}
            />
            <ButtonSolid
              size={2}
              textButton='Update'
              isLoading={IsLoading}
              onClickButton={{ onClick: handleUpdate }}
            />
          </>
        }
        slotSideDrawerbody={
          <BasicInfo
            isWarningVisible={isError}
            slotWarning={
              <Typography variant='caption' color='error'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </Typography>
            }
            isChangeLogoVisible={!isFormDisabled}
            slotCompanyLogo={
              <>
                <ImageUpload
                  image={logo}
                  disabled={isFormDisabled}
                  setImage={(newLogo) => {
                    setLogo(newLogo);
                    if (recruiterLocal) {
                      handleChange({
                        ...recruiterLocal,
                        logo: newLogo,
                      });
                    }
                  }}
                  size={48}
                  table='company-logo'
                  error={(e) => {
                    if (e) {
                      setError(true);
                    } else {
                      setError(false);
                    }
                  }}
                />
              </>
            }
            onClickChangeLogo={{
              onClick: () => {
                document.getElementById('image-upload').click();
              },
            }}
            slotBasicForm={
              <Stack spacing={2} p={'var(--space-1)'} sx={{ width: '380px' }}>
                <UITextField
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Company Name'
                  disabled={isFormDisabled}
                  required
                  error={nameError}
                  onFocus={() => setNameError(false)}
                  helperText={`Company name can't be empty`}
                  placeholder='Ex. Acme Inc.'
                  value={recruiterLocal?.name}
                  onChange={(e) => {
                    e.target.value
                      ? (() => {
                          handleChange({
                            ...recruiterLocal,
                            name: e.target.value,
                          });
                          setNameError(false);
                        })()
                      : (() => {
                          handleChange({
                            ...recruiterLocal,
                            name: e.target.value,
                          });
                          setNameError(true);
                        })();
                  }}
                />
                <UITextField
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Industry'
                  disabled={isFormDisabled}
                  placeholder='Ex. Healthcare'
                  value={recruiterLocal?.industry}
                  onChange={(e) => {
                    handleChange({
                      ...recruiterLocal,
                      industry: e.target.value,
                    });
                  }}
                />
                <Autocomplete
                  disableClearable
                  freeSolo
                  fullWidth
                  disabled={isFormDisabled}
                  options={sizes}
                  onChange={(event, value) => {
                    if (value) {
                      handleChange({
                        ...recruiterLocal,
                        employee_size: value,
                      });
                    }
                  }}
                  value={recruiterLocal.employee_size}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <UITextField
                      labelBold='default'
                      rest={{ ...params }}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                      }}
                      label='Employee Size'
                      labelSize='small'
                      onChange={(event) => {
                        handleChange({
                          ...recruiterLocal,
                          employee_size: event.target.value,
                        });
                      }}
                    />
                  )}
                />

                <UITextField
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Company Website'
                  disabled={isFormDisabled}
                  placeholder='https://companydomain.com'
                  value={recruiterLocal?.company_website}
                  onChange={(e) => {
                    handleChange({
                      ...recruiterLocal,
                      company_website: e.target.value,
                    });
                  }}
                />

                <SocialComp
                  disabled={isFormDisabled}
                  handleChange={handleChange}
                  recruiterLocal={recruiterLocal}
                />
              </Stack>
            }
            textLogoUpdate={'Update Logo'}
          />
        }
      />
    </Drawer>
  );
};
